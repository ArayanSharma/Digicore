import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    // ── Forgot Password / OTP flow ──
    otpHash: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    otpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lastOtpSentAt: {
      type: Date,
      select: false,
    },

    // Short-lived token issued only after OTP verification, consumed by reset-password
    resetTokenHash: {
      type: String,
      select: false,
    },
    resetTokenExpiry: {
      type: Date,
      select: false,
    },

    // Invalidates JWTs issued before a password change
    passwordChangedAt: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

adminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
