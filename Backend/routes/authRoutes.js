import express from "express";
import { body } from "express-validator";
import {
  login,
  forgotPassword,
  resendOtp,
  verifyOtp,
  resetPassword,
} from "../Controller/authController.js";
import { validate } from "../middleware/validate.js";
import { loginLimiter, forgotPasswordLimiter, otpLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

const emailValidator = body("email").trim().isEmail().withMessage("A valid email is required.");

const strongPasswordValidator = body("newPassword")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter.")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter.")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number.");

// POST /api/auth/login
router.post(
  "/login",
  loginLimiter,
  [
    emailValidator,
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validate,
  login
);

// POST /api/auth/forgot-password
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  [emailValidator],
  validate,
  forgotPassword
);

// POST /api/auth/resend-otp
router.post("/resend-otp", otpLimiter, [emailValidator], validate, resendOtp);

// POST /api/auth/verify-otp
router.post(
  "/verify-otp",
  otpLimiter,
  [
    emailValidator,
    body("otp")
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be 6 digits.")
      .isNumeric()
      .withMessage("OTP must be 6 digits."),
  ],
  validate,
  verifyOtp
);

// POST /api/auth/reset-password
router.post(
  "/reset-password",
  otpLimiter,
  [
    emailValidator,
    body("resetToken").notEmpty().withMessage("Reset token is required."),
    strongPasswordValidator,
  ],
  validate,
  resetPassword
);

export default router;
