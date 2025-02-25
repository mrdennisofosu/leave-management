import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [resetMethod, setResetMethod] = useState("email");
  const [resetContact, setResetContact] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    setTimeout(() => {
      navigate("/signin");
    }, 3000); // Redirect to sign-in page after 3 seconds
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
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
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
