const brand = () => ({
  name: process.env.COMPANY_NAME || "Digicore",
  logoUrl: process.env.COMPANY_LOGO_URL || "",
});

// Table-based layout + inline styles: required for consistent rendering across
// Gmail, Outlook, and other email clients that strip <style> blocks or flexbox/grid.
export function otpEmailTemplate({ name, otp, expiryMinutes }) {
  const { name: companyName, logoUrl } = brand();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Password Reset OTP</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#a855f7); padding:32px 32px 28px 32px; text-align:center;">
              ${
                logoUrl
                  ? `<img src="${logoUrl}" alt="${companyName}" height="40" style="display:inline-block; margin-bottom:12px;" />`
                  : ""
              }
              <div style="color:#ffffff; font-size:22px; font-weight:700;">${companyName}</div>
              <div style="color:#e9d5ff; font-size:13px; margin-top:4px;">Admin Panel Security</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">
              <p style="margin:0 0 8px 0; font-size:16px; color:#18181b;">Hi${name ? ` ${name}` : ""},</p>
              <p style="margin:0 0 24px 0; font-size:14px; line-height:1.6; color:#52525b;">
                We received a request to reset the password for your admin account.
                Use the one-time password (OTP) below to continue. If you didn't request this, you can safely ignore this email.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px 0;">
                    <div style="display:inline-block; background:#f4f0fe; border:1.5px dashed #a855f7; border-radius:12px; padding:18px 36px;">
                      <span style="font-size:34px; font-weight:700; letter-spacing:10px; color:#7c3aed;">${otp}</span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px 0; font-size:13px; color:#71717a; text-align:center;">
                This OTP expires in <strong>${expiryMinutes} minutes</strong>.
              </p>
              <p style="margin:24px 0 0 0; font-size:13px; line-height:1.6; color:#a1a1aa;">
                For your security, never share this OTP with anyone, including ${companyName} staff.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa; padding:20px 32px; text-align:center; border-top:1px solid #f0f0f0;">
              <p style="margin:0; font-size:12px; color:#a1a1aa;">
                &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
              </p>
              <p style="margin:6px 0 0 0; font-size:12px; color:#a1a1aa;">
                This is an automated message, please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
