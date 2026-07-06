import crypto from "crypto";
import jwt from "jsonwebtoken";

// ── Admin session JWT (issued on successful login) ──
export const generateAuthToken = (admin) =>
  jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

export const verifyAuthToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// ── Password-reset token (issued only after OTP verification) ──
// Raw token is emailed/returned to the client once; only its SHA-256 hash is persisted,
// so a stolen DB dump can't be replayed as a valid reset token.
export const generateResetToken = () => crypto.randomBytes(32).toString("hex");

export const hashResetToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");
