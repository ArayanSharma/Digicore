import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout, { authInputClass, authButtonClass, authErrorClass } from "../../Components/admin/AuthLayout";
import { resetPassword } from "../../utils/authApi";

const PASSWORD_RULES = [
  { test: (pw) => pw.length >= 8, label: "At least 8 characters" },
  { test: (pw) => /[a-z]/.test(pw), label: "One lowercase letter" },
  { test: (pw) => /[A-Z]/.test(pw), label: "One uppercase letter" },
  { test: (pw) => /[0-9]/.test(pw), label: "One number" },
];

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetToken } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!email || !resetToken) {
    return <Navigate to="/admin/forgot-password" replace />;
  }

  const unmetRules = PASSWORD_RULES.filter((rule) => !rule.test(newPassword));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (unmetRules.length > 0) {
      setError("Please meet all password requirements below.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, resetToken, newPassword);
      navigate("/admin/reset-success");
    } catch (err) {
      setError(err.message || "Could not reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        <>
          Set A New
          <span className="text-[#c084fc]"> Password</span>
        </>
      }
      subtitle="Choose a strong new password for your admin account. Once reset, you can log in immediately."
    >
      <h2 className="text-3xl text-white font-bold mb-2">Reset Password</h2>
      <p className="text-gray-400 mb-7">Create a new password for {email}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className={authErrorClass}>{error}</div>}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={authInputClass}
          autoFocus
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={authInputClass}
          required
        />

        <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
          {PASSWORD_RULES.map((rule) => {
            const met = rule.test(newPassword);
            return (
              <li
                key={rule.label}
                className={met ? "text-emerald-400" : "text-gray-500"}
              >
                {met ? "✓" : "•"} {rule.label}
              </li>
            );
          })}
        </ul>

        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}
