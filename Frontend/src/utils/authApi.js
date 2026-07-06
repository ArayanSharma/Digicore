const getApiBase = () => import.meta.env.VITE_API_URL || "http://localhost:5000";

async function postJson(path, body) {
  const res = await fetch(`${getApiBase()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

export const login = (email, password) => postJson("/api/auth/login", { email, password });

export const forgotPassword = (email) => postJson("/api/auth/forgot-password", { email });

export const resendOtp = (email) => postJson("/api/auth/resend-otp", { email });

export const verifyOtp = (email, otp) => postJson("/api/auth/verify-otp", { email, otp });

export const resetPassword = (email, resetToken, newPassword) =>
  postJson("/api/auth/reset-password", { email, resetToken, newPassword });
