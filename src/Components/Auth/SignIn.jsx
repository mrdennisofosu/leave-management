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
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user in mock data
    const user = MockLeaveRequests.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store session data
      localStorage.setItem("Token", "dummyToken");
      localStorage.setItem("userEmail", email); // Ensure email is stored
      setIsAuthenticated(true);
      navigate("/request-leave"); // Redirect to request leave page
    } else {
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    if (resetMethod === "email") {
      console.log(`Password reset instructions sent to email: ${resetContact}`);
    } else {
      console.log(
        `Password reset instructions sent to phone number: ${resetContact}`
      );
    }
    setMessage("Password reset instructions have been sent.");
    setCodeSent(true);
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // Handle code verification logic here
    console.log(`Verification code entered: ${verificationCode}`);
    setMessage("Code verified. You can now reset your password.");
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    // Handle password reset logic here
    console.log(`Password reset to: ${newPassword}`);
    setMessage("Password has been reset successfully.");
    setTimeout(() => {
      setShowForgotPasswordModal(false);
      setMessage("");
      setCodeSent(false);
      setVerificationCode("");
      setNewPassword("");
      setConfirmPassword("");
      setStep(1);
    }, 3000); // Close modal after 3 seconds
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
            {step === 1 && (
              <form onSubmit={handleForgotPassword} className="auth-form">
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
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={resetContact}
                      onChange={(e) => setResetContact(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={resetContact}
                      onChange={(e) => setResetContact(e.target.value)}
                      required
                    />
                  </div>
                )}
                <button type="submit" className="auth-btn">
                  Send Reset Instructions
                </button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerifyCode} className="auth-form">
                <div className="input-group">
                  <label>Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter the code sent to you"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-btn">
                  Verify Code
                </button>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="auth-form">
                <div className="input-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-btn">
                  Reset Password
                </button>
              </form>
            )}
            {message && <p className="success-message">{message}</p>}
            <button
              onClick={() => {
                setShowForgotPasswordModal(false);
                setCodeSent(false);
                setMessage("");
                setVerificationCode("");
                setNewPassword("");
                setConfirmPassword("");
                setStep(1);
              }}
              className="auth-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
