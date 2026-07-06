import crypto from "crypto";
import bcrypt from "bcryptjs";

const OTP_SALT_ROUNDS = 10;

// Cryptographically secure 6-digit OTP, always 6 digits (100000-999999)
export const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

export const hashOtp = (otp) => bcrypt.hash(otp, OTP_SALT_ROUNDS);

export const compareOtp = (candidateOtp, otpHash) => bcrypt.compare(candidateOtp, otpHash);
