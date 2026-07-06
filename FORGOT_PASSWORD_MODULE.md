# Forgot Password Module

Adds real DB-backed Admin login (there was none before — it was a hardcoded
client-side check) plus a full OTP-based Forgot Password flow, integrated into
the existing Vite + React admin panel and Express + MongoDB backend.

## What was added

### Backend (`Backend/`)
| File | Purpose |
|---|---|
| `Model/Admin.js` | Mongoose schema: credentials + OTP/reset-token fields (all sensitive fields use `select: false`) |
| `Controller/authController.js` | `login`, `forgotPassword`, `resendOtp`, `verifyOtp`, `resetPassword` |
| `routes/authRoutes.js` | Mounts the 5 endpoints under `/api/auth`, with validation + rate limiting per route |
| `middleware/validate.js` | Runs `express-validator` chains, returns 400 with field errors |
| `middleware/rateLimiter.js` | `loginLimiter`, `forgotPasswordLimiter`, `otpLimiter` |
| `middleware/authMiddleware.js` | `protect` — JWT guard, available for future protected routes (not yet applied to existing content routes, to avoid breaking them) |
| `utils/generateOtp.js` | Crypto-secure 6-digit OTP + bcrypt hash/compare |
| `utils/token.js` | JWT session token + random reset-token generation/hashing |
| `services/emailService.js` | Nodemailer transport, switches between Gmail and custom SMTP via env |
| `templates/otpEmailTemplate.js` | Responsive HTML email with OTP |
| `templates/passwordChangedTemplate.js` | Confirmation email sent after a successful reset |
| `scripts/seedAdmin.js` | One-time script to create the first Admin account |
| `server.js` | Mounts `app.use("/api/auth", authRoutes)` |

### Frontend (`Frontend/src/`)
| File | Purpose |
|---|---|
| `utils/authApi.js` | `login`, `forgotPassword`, `resendOtp`, `verifyOtp`, `resetPassword` fetch helpers |
| `Components/admin/AuthLayout.jsx` | Shared two-column layout matching the existing Login page's dark/purple theme |
| `Pages/admin/ForgotPassword.jsx` | Email entry |
| `Pages/admin/VerifyOtp.jsx` | 6-digit OTP entry, with resend + cooldown |
| `Pages/admin/ResetPassword.jsx` | New password + live strength checklist |
| `Pages/admin/ResetPasswordSuccess.jsx` | Confirmation screen |
| `Pages/admin/Login.jsx` | Now calls the real login API (was hardcoded); adds "Forgot Password?" link |
| `App.jsx` | New routes: `/admin/forgot-password`, `/admin/verify-otp`, `/admin/reset-password`, `/admin/reset-success` |

## npm packages added (Backend)

Install with:
```bash
npm install bcryptjs jsonwebtoken nodemailer express-rate-limit express-validator
```

| Package | Why |
|---|---|
| `bcryptjs` | Hashes admin passwords and OTPs before storing them. Pure-JS (no native build step, unlike `bcrypt`), which matters since the rest of this project has no native deps. |
| `jsonwebtoken` | Issues/verifies the admin session JWT returned by `/login`. |
| `nodemailer` | Sends the OTP and password-changed emails via Gmail or any SMTP provider. |
| `express-rate-limit` | Throttles login/forgot-password/OTP endpoints to blunt brute-force and spam. |
| `express-validator` | Declarative request validation (email format, password strength, OTP shape) before it reaches the controller. |

No new frontend packages were needed — the new pages reuse the project's existing `react-router-dom`, Tailwind, and native `fetch`.

## Environment variables

All added to `Backend/.env` (real values) and `Backend/.env.example` (placeholders, safe to commit):

```env
# Auth / JWT
JWT_SECRET=                     # random 64+ char string
JWT_EXPIRES_IN=1d

# OTP / reset flow
OTP_EXPIRE_MIN=10               # OTP validity window
OTP_MAX_ATTEMPTS=5              # wrong-OTP attempts before it's invalidated
OTP_RESEND_COOLDOWN_SEC=60      # per-account cooldown between OTP sends
RESET_TOKEN_EXPIRE_MIN=15       # validity of the token issued after OTP verification

# Email provider: "gmail" or "smtp"
EMAIL_PROVIDER=gmail

# Gmail App Password (EMAIL_PROVIDER=gmail)
GMAIL_USER=
GMAIL_APP_PASSWORD=             # https://myaccount.google.com/apppasswords (needs 2FA on)

# Custom SMTP (EMAIL_PROVIDER=smtp) — Hostinger/Zoho/Outlook/GoDaddy/cPanel etc.
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false               # true only for port 465
SMTP_USER=
SMTP_PASS=

EMAIL_FROM_NAME=
EMAIL_FROM_ADDRESS=
COMPANY_NAME=
COMPANY_LOGO_URL=

# Seed script (npm run seed:admin)
ADMIN_SEED_NAME=
ADMIN_SEED_EMAIL=
ADMIN_SEED_PASSWORD=
```

## First-time setup

```bash
cd Backend
npm install
# fill in JWT_SECRET, email provider creds, and ADMIN_SEED_* in .env
npm run seed:admin     # creates the first Admin document (no-ops if the email already exists)
npm run dev
```

## API reference

Base URL: `/api/auth`. All responses are JSON with a `success` boolean.

### POST `/login`
```json
// Request
{ "email": "admin@digicore.com", "password": "ChangeMe123" }

// 200 OK
{
  "success": true,
  "message": "Login successful.",
  "token": "<jwt>",
  "admin": { "id": "...", "name": "Super Admin", "email": "admin@digicore.com" }
}

// 401 — wrong credentials (also returned for unknown email, to avoid enumeration)
{ "success": false, "message": "Invalid email or password." }
```

### POST `/forgot-password`
```json
// Request
{ "email": "admin@digicore.com" }

// 200 — always this generic message, whether or not the email exists
{ "success": true, "message": "If this email is registered, a verification code has been sent to it." }
```

### POST `/resend-otp`
Same request/response shape as `/forgot-password`. Internally rate-limited per account
(`OTP_RESEND_COOLDOWN_SEC`) in addition to the IP-based limiter.

### POST `/verify-otp`
```json
// Request
{ "email": "admin@digicore.com", "otp": "483920" }

// 200 — OTP correct; resetToken is single-use and expires in RESET_TOKEN_EXPIRE_MIN
{ "success": true, "message": "OTP verified successfully.", "resetToken": "<hex token>" }

// 400 — wrong/expired OTP or unknown email (same generic message either way)
{ "success": false, "message": "Invalid or expired OTP." }

// 429 — too many wrong attempts (OTP_MAX_ATTEMPTS exceeded)
{ "success": false, "message": "Too many incorrect attempts. Please request a new OTP." }
```

### POST `/reset-password`
```json
// Request
{
  "email": "admin@digicore.com",
  "resetToken": "<hex token from verify-otp>",
  "newPassword": "NewPass123"
}

// 200
{ "success": true, "message": "Password reset successful. You can now log in with your new password." }

// 400 — validation (min 8 chars, upper+lower+number)
{ "success": false, "message": "Password must contain at least one uppercase letter.", "errors": [...] }

// 400 — invalid/expired/already-used resetToken
{ "success": false, "message": "Invalid or expired reset request. Please start again." }
```

## Security decisions worth knowing about

- **No email enumeration**: `/forgot-password` and `/resend-otp` return the identical response
  whether the email exists or not; `/login` compares against a fixed dummy bcrypt hash when the
  email is unknown so the response time doesn't leak existence either.
- **OTP is single-use**: verifying it immediately clears `otpHash`/`otpExpiry` and issues a
  short-lived `resetToken` — the same OTP cannot be replayed against `/reset-password`.
- **Reset token is hashed at rest**: only its SHA-256 hash is stored in Mongo; the raw token
  exists only in the API response and the client's in-memory router state, never written to
  localStorage.
- **Old JWTs are invalidated on password change**: `passwordChangedAt` is compared against the
  JWT's `iat` in the `protect` middleware (available for future protected routes).
- **Rate limiting**: per-IP on all five endpoints, plus a per-account OTP resend cooldown.

## Notes / things you may want to follow up on

- **`Backend/.env` was previously committed to git with real secrets** (Mongo URI, Cloudinary
  key). As part of this change we added a root `.gitignore` and ran `git rm --cached Backend/.env`
  so it won't be tracked going forward — but the old secrets are still in git history. Rotating the
  MongoDB password and Cloudinary API secret is worth doing separately, on your own schedule.
- **`Backend/node_modules` is already tracked in git** (pre-existing, unrelated to this change) —
  left alone since untracking it is a large, separate cleanup outside this task's scope.
- The seeded test account is `admin@digicore.com` / whatever `ADMIN_SEED_PASSWORD` is set to in
  `Backend/.env` at the time you run `npm run seed:admin`.
