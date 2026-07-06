import bcrypt from "bcryptjs";
import Admin from "../Model/Admin.js";
import { generateOtp, hashOtp, compareOtp } from "../utils/generateOtp.js";
import { generateAuthToken, generateResetToken, hashResetToken } from "../utils/token.js";
import { sendEmail } from "../services/emailService.js";
import { otpEmailTemplate } from "../templates/otpEmailTemplate.js";
import { passwordChangedTemplate } from "../templates/passwordChangedTemplate.js";

const OTP_EXPIRE_MIN = Number(process.env.OTP_EXPIRE_MIN) || 10;
const RESET_TOKEN_EXPIRE_MIN = Number(process.env.RESET_TOKEN_EXPIRE_MIN) || 15;
const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS) || 5;
const OTP_RESEND_COOLDOWN_SEC = Number(process.env.OTP_RESEND_COOLDOWN_SEC) || 60;

// Fixed dummy hash so a login against a non-existent email still pays the bcrypt
// cost, keeping response time consistent with a real account (timing-based enumeration).
const DUMMY_HASH = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8yGkH0/tvL9WjF3vC91h4t5LFOfy1O";

const GENERIC_OTP_SENT_MESSAGE =
  "If this email is registered, a verification code has been sent to it.";
const GENERIC_INVALID_OTP_MESSAGE = "Invalid or expired OTP.";
const GENERIC_INVALID_RESET_MESSAGE = "Invalid or expired reset request. Please start again.";

// Shared by forgotPassword + resendOtp: generates a fresh OTP for an existing
// admin, respecting a per-account cooldown, and emails it. Silent no-op if the
// admin is on cooldown or doesn't exist — callers always send the same generic response.
async function issueOtp(admin) {
  if (!admin) return;

  if (admin.lastOtpSentAt) {
    const secondsSinceLastSend = (Date.now() - admin.lastOtpSentAt.getTime()) / 1000;
    if (secondsSinceLastSend < OTP_RESEND_COOLDOWN_SEC) return;
  }

  const otp = generateOtp();
  admin.otpHash = await hashOtp(otp);
  admin.otpExpiry = new Date(Date.now() + OTP_EXPIRE_MIN * 60 * 1000);
  admin.otpAttempts = 0;
  admin.lastOtpSentAt = new Date();
  // Any in-flight reset token from a previous OTP is now invalid.
  admin.resetTokenHash = undefined;
  admin.resetTokenExpiry = undefined;
  await admin.save();

  try {
    await sendEmail({
      to: admin.email,
      subject: "Your Admin Panel password reset OTP",
      html: otpEmailTemplate({ name: admin.name, otp, expiryMinutes: OTP_EXPIRE_MIN }),
    });
  } catch (err) {
    console.error("Failed to send OTP email:", err.message);
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password +passwordChangedAt");

    const isMatch = admin
      ? await admin.comparePassword(password)
      : await bcrypt.compare(password, DUMMY_HASH);

    if (!admin || !isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = generateAuthToken(admin);

    res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}

// POST /api/auth/forgot-password
export async function forgotPassword(req, res) {
  try {
    const email = req.body.email.trim().toLowerCase();

    const admin = await Admin.findOne({ email }).select(
      "+otpHash +otpExpiry +otpAttempts +lastOtpSentAt +resetTokenHash +resetTokenExpiry"
    );

    await issueOtp(admin);

    // Same response whether or not the email exists, to prevent account enumeration.
    res.json({ success: true, message: GENERIC_OTP_SENT_MESSAGE });
  } catch (error) {
    console.error("forgotPassword error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}

// POST /api/auth/resend-otp
export async function resendOtp(req, res) {
  try {
    const email = req.body.email.trim().toLowerCase();

    const admin = await Admin.findOne({ email }).select(
      "+otpHash +otpExpiry +otpAttempts +lastOtpSentAt +resetTokenHash +resetTokenExpiry"
    );

    await issueOtp(admin);

    res.json({ success: true, message: GENERIC_OTP_SENT_MESSAGE });
  } catch (error) {
    console.error("resendOtp error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}

// POST /api/auth/verify-otp
export async function verifyOtp(req, res) {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { otp } = req.body;

    const admin = await Admin.findOne({ email }).select("+otpHash +otpExpiry +otpAttempts");

    if (!admin || !admin.otpHash || !admin.otpExpiry) {
      return res.status(400).json({ success: false, message: GENERIC_INVALID_OTP_MESSAGE });
    }

    if (admin.otpExpiry.getTime() < Date.now()) {
      admin.otpHash = undefined;
      admin.otpExpiry = undefined;
      admin.otpAttempts = 0;
      await admin.save();
      return res.status(400).json({ success: false, message: GENERIC_INVALID_OTP_MESSAGE });
    }

    if (admin.otpAttempts >= OTP_MAX_ATTEMPTS) {
      admin.otpHash = undefined;
      admin.otpExpiry = undefined;
      await admin.save();
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    const isMatch = await compareOtp(otp, admin.otpHash);
    if (!isMatch) {
      admin.otpAttempts += 1;
      await admin.save();
      return res.status(400).json({ success: false, message: GENERIC_INVALID_OTP_MESSAGE });
    }

    // OTP is single-use: clear it and issue a short-lived reset token for the next step.
    const resetToken = generateResetToken();
    admin.resetTokenHash = hashResetToken(resetToken);
    admin.resetTokenExpiry = new Date(Date.now() + RESET_TOKEN_EXPIRE_MIN * 60 * 1000);
    admin.otpHash = undefined;
    admin.otpExpiry = undefined;
    admin.otpAttempts = 0;
    await admin.save();

    res.json({
      success: true,
      message: "OTP verified successfully.",
      resetToken,
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}

// POST /api/auth/reset-password
export async function resetPassword(req, res) {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { resetToken, newPassword } = req.body;

    const admin = await Admin.findOne({ email }).select(
      "+resetTokenHash +resetTokenExpiry +password"
    );

    if (!admin || !admin.resetTokenHash || !admin.resetTokenExpiry) {
      return res.status(400).json({ success: false, message: GENERIC_INVALID_RESET_MESSAGE });
    }

    if (admin.resetTokenExpiry.getTime() < Date.now()) {
      admin.resetTokenHash = undefined;
      admin.resetTokenExpiry = undefined;
      await admin.save();
      return res.status(400).json({ success: false, message: GENERIC_INVALID_RESET_MESSAGE });
    }

    if (hashResetToken(resetToken) !== admin.resetTokenHash) {
      return res.status(400).json({ success: false, message: GENERIC_INVALID_RESET_MESSAGE });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.passwordChangedAt = new Date();

    // Fully clear the reset flow so the OTP/token can never be replayed.
    admin.resetTokenHash = undefined;
    admin.resetTokenExpiry = undefined;
    admin.otpHash = undefined;
    admin.otpExpiry = undefined;
    admin.otpAttempts = 0;
    admin.lastOtpSentAt = undefined;
    await admin.save();

    try {
      await sendEmail({
        to: admin.email,
        subject: "Your Admin Panel password was changed",
        html: passwordChangedTemplate({ name: admin.name }),
      });
    } catch (err) {
      console.error("Failed to send password-changed confirmation email:", err.message);
    }

    res.json({
      success: true,
      message: "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("resetPassword error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
