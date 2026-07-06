import { useNavigate } from "react-router-dom";
import AuthLayout, { authButtonClass } from "../../Components/admin/AuthLayout";

export default function ResetPasswordSuccess() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title={
        <>
          All
          <span className="text-[#c084fc]"> Set!</span>
        </>
      }
      subtitle="Your admin password has been updated. You can now sign back in to manage your dashboard."
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl text-white font-bold mb-2">Password Reset</h2>
        <p className="text-gray-400 mb-8">
          Your password has been changed successfully. Please log in with your new password.
        </p>

        <button onClick={() => navigate("/login")} className={authButtonClass}>
          Back to Login
        </button>
      </div>
    </AuthLayout>
  );
}
