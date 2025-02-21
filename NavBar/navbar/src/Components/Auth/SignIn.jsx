import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MockLeaveRequests from "../../Data/MockLeaveRequests"; // Ensure correct path
import "./Auth.css";

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
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

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
