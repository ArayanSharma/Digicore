import { verifyAuthToken } from "../utils/token.js";
import Admin from "../Model/Admin.js";

// Verifies the admin's JWT and attaches req.admin.
// Available for any route that should require a logged-in admin;
// not yet applied to existing content routes to avoid breaking them.
export async function protect(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please log in." });
  }

  try {
    const decoded = verifyAuthToken(token);
    const admin = await Admin.findById(decoded.id).select("+passwordChangedAt");

    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin account no longer exists." });
    }

    if (admin.passwordChangedAt && decoded.iat * 1000 < admin.passwordChangedAt.getTime()) {
      return res.status(401).json({ success: false, message: "Session expired due to password change. Please log in again." });
    }

    req.admin = { id: admin._id, email: admin.email };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired session. Please log in again." });
  }
}
