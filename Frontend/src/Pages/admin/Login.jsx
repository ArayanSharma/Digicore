import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Login.css";
import { login } from "../../utils/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    setLoading(true);
    try {
      const data = await login(normalizedEmail, normalizedPassword);
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="overlay"></div>

        <div className="left-content">
          <div className="brand">
            <div className="logo">D</div>

            <div>
              <h1>Digicore</h1>
              <p>Digital Marketing Agency</p>
            </div>
          </div>

          <h2>
            Grow Brands With
            <span> Smart Marketing</span>
          </h2>

          <p>
            Manage SEO campaigns, social media,
            analytics, leads and clients from
            one powerful dashboard.
          </p>

          
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Admin Login</h2>

          <p>
            Welcome back to Digicore Dashboard
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <p style={{ color: "#f87171", fontSize: "14px", marginBottom: "-6px" }}>
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <div style={{ textAlign: "right" }}>
              <Link
                to="/admin/forgot-password"
                style={{ color: "#c084fc", fontSize: "14px", textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}