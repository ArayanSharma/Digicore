import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout, {
  authButtonClass,
  authErrorClass,
  authSuccessClass,
  authLinkClass,
} from "../../Components/admin/AuthLayout";
import { verifyOtp, resendOtp } from "../../utils/authApi";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SEC = 60;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SEC);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!email) {
    return <Navigate to="/admin/forgot-password" replace />;
  }

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index, value) => {
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < OTP_LENGTH; i++) next[i] = pasted[i] || next[i];
      return next;
    });
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyOtp(email, otp);
      navigate("/admin/reset-password", { state: { email, resetToken: data.resetToken } });
    } catch (err) {
      setError(err.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError("");
    setInfo("");
    try {
      await resendOtp(email);
      setInfo("A new OTP has been sent to your email.");
      setDigits(Array(OTP_LENGTH).fill(""));
      setCooldown(RESEND_COOLDOWN_SEC);
      focusInput(0);
    } catch (err) {
      setError(err.message || "Could not resend OTP. Please try again.");
    }
  };

  return (
    <AuthLayout
      title={
        <>
          Verify Your
          <span className="text-[#c084fc]"> Identity</span>
        </>
      }
      subtitle={`We've sent a 6-digit verification code to ${email}. Enter it below to continue resetting your password.`}
    >
      <h2 className="text-3xl text-white font-bold mb-2">Verify OTP</h2>
      <p className="text-gray-400 mb-7">Code expires in a few minutes</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <div className={authErrorClass}>{error}</div>}
        {info && <div className={authSuccessClass}>{info}</div>}

        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-full h-14 text-center text-xl font-semibold bg-white/[0.03] border-[1.5px] border-[#7c3aed]/25 rounded-xl text-white outline-none transition duration-300 focus:border-[#a855f7] focus:ring-4 focus:ring-[#a855f7]/20"
            />
          ))}
        </div>

        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0}
          className="text-sm text-gray-400 disabled:cursor-not-allowed hover:text-[#c084fc] transition-colors"
        >
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6" style={{ textAlign: "center" }}>
        Wrong email?{" "}
        <Link to="/admin/forgot-password" className={authLinkClass}>
          Go back
        </Link>
      </p>
    </AuthLayout>
  );
}
