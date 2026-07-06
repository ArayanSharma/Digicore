import rateLimit from "express-rate-limit";

const jsonRateLimitHandler = (message) => (req, res) => {
  res.status(429).json({ success: false, message });
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonRateLimitHandler("Too many login attempts. Please try again in a few minutes."),
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonRateLimitHandler("Too many password reset requests. Please try again later."),
});

export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonRateLimitHandler("Too many attempts. Please try again later."),
});
