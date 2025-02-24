import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MockLeaveRequests from "../../Data/MockLeaveRequests"; // Ensure correct path
import "./Auth.css";

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetMethod, setResetMethod] = useState("email");
  const [resetContact, setResetContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user in mock data
    const user = MockLeaveRequests.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store session data
      localStorage.setItem("userToken", "dummyToken");
      localStorage.setItem("userEmail", email); // Ensure email is stored
      setIsAuthenticated(true);
      navigate("/request-leave"); // Redirect to request leave page
    } else {
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    setShowForgotPasswordModal(false);
    console.log("Password reset instructions sent");
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Sign In
        </button>

        <div className="social-login">
          <button className="google-btn">Sign in with Google</button>
          <button className="facebook-btn">Sign in with Facebook</button>
          <button className="apple-btn">Sign in with Apple</button>
        </div>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

      <button
        onClick={() => setShowForgotPasswordModal(true)}
        className="forgot-password-btn"
      >
        Forgot Password?
      </button>

      {showForgotPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Forgot Password</h3>
            <label>
              Reset via:
              <select
                value={resetMethod}
                onChange={(e) => setResetMethod(e.target.value)}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </label>
            {resetMethod === "email" ? (
              <label>
                Email:
                <input
                  type="email"
                  value={resetContact}
                  onChange={(e) => setResetContact(e.target.value)}
                />
              </label>
            ) : (
              <label>
                Phone Number:
                <input
                  type="tel"
                  value={resetContact}
                  onChange={(e) => setResetContact(e.target.value)}
                />
              </label>
            )}
            <button onClick={handleForgotPassword}>Save</button>
            <button onClick={() => setShowForgotPasswordModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
