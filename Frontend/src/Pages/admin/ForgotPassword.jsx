import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, {
  authInputClass,
  authButtonClass,
  authErrorClass,
  authLinkClass,
} from "../../Components/admin/AuthLayout";
import { forgotPassword } from "../../utils/authApi";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(normalizedEmail);
      navigate("/admin/verify-otp", { state: { email: normalizedEmail } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        <>
          Forgot Your
          <span className="text-[#c084fc]"> Password?</span>
        </>
      }
      subtitle="No worries. Enter the email linked to your admin account and we'll send you a one-time verification code to reset it."
    >
      <h2 className="text-3xl text-white font-bold mb-2">Forgot Password</h2>
      <p className="text-gray-400 mb-7">Enter your admin email to receive an OTP</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className={authErrorClass}>{error}</div>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={authInputClass}
          autoFocus
          required
        />

        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6" style={{ textAlign: "center" }}>
        Remember your password?{" "}
        <Link to="/login" className={authLinkClass}>
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
