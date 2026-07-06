const brand = () => ({
  name: process.env.COMPANY_NAME || "Digicore",
  logoUrl: process.env.COMPANY_LOGO_URL || "",
});

export function passwordChangedTemplate({ name }) {
  const { name: companyName, logoUrl } = brand();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Password Was Changed</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

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

          <tr>
            <td style="padding:36px 32px;">
              <p style="margin:0 0 8px 0; font-size:16px; color:#18181b;">Hi${name ? ` ${name}` : ""},</p>
              <p style="margin:0 0 16px 0; font-size:14px; line-height:1.6; color:#52525b;">
                This is a confirmation that the password for your admin account was just changed successfully.
              </p>
              <p style="margin:0; font-size:13px; line-height:1.6; color:#a1a1aa;">
                If you made this change, no further action is needed. If you did <strong>not</strong> request this change,
                please contact your system administrator immediately to secure your account.
              </p>
            </td>
          </tr>

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
