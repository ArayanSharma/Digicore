import { validationResult } from "express-validator";

// Runs after an express-validator chain; short-circuits with 400 on the first bad request.
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}
