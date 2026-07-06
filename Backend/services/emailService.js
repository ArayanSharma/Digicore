import nodemailer from "nodemailer";

let transporter;

// Built lazily (not at import time) so it always reads the current process.env,
// and so a missing/misconfigured env var only breaks the request that sends an
// email instead of crashing the whole server on boot.
function getTransporter() {
  if (transporter) return transporter;

  const provider = (process.env.EMAIL_PROVIDER || "gmail").toLowerCase();

  if (provider === "gmail") {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error(
        "EMAIL_PROVIDER=gmail requires GMAIL_USER and GMAIL_APP_PASSWORD to be set."
      );
    }
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    return transporter;
  }

  // Custom company SMTP (Hostinger, Zoho, Outlook, GoDaddy, cPanel, etc.)
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error(
      "EMAIL_PROVIDER=smtp requires SMTP_HOST, SMTP_USER and SMTP_PASS to be set."
    );
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587/25
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  const fromName = process.env.EMAIL_FROM_NAME || "Admin Panel";
  const fromAddress =
    process.env.EMAIL_FROM_ADDRESS ||
    process.env.GMAIL_USER ||
    process.env.SMTP_USER;

  await getTransporter().sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    html,
  });
}
