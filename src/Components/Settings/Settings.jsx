import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import "./Settings.css";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState(
    localStorage.getItem("recoveryEmail") || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") || ""
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") === "true"
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSaveChanges = () => {
    setShowConfirmation(true);
  };

  const confirmSaveChanges = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("recoveryEmail", recoveryEmail);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", notifications);
    // Handle password change logic here
    setShowConfirmation(false);
    console.log("Changes saved");
  };

  const handlePasswordChange = () => {
    // Handle password change logic here
    setShowPasswordModal(false);
    console.log("Password changed");
  };

  const handleChangeEmail = () => {
    // Handle email change logic here
    setShowChangeEmailModal(false);
    console.log("Email changed");
  };

  const handleChangeUsername = () => {
    // Handle username change logic here
    setShowChangeUsernameModal(false);
    console.log("Username changed");
  };

  return (
    <div className="main-settings-container">
      <div className={`settings-container ${theme}`}>
        <h2>Settings</h2>

        <section className="notifications">
          <label>
            Enable Notifications:
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </label>
        </section>

        <section className="account-settings">
          <h3>Account Info</h3>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
            <button onClick={() => setShowChangeEmailModal(true)}>
              Change Email
            </button>{" "}
          </label>

          <p></p>
          <label>
            Recovery Email:
            <input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </section>

        <section className="security-settings">
          <h3>Security</h3>
          <button onClick={() => setShowPasswordModal(true)}>
            Change Password
          </button>
        </section>

        <section className="preferences-section">
          <h3>Preferences</h3>
          <label>
            Theme:
            <select
              className="preference"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </label>
        </section>

        <button onClick={handleSaveChanges} className="save-changes-btn">
          Save Changes
        </button>

        {showConfirmation && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirm Changes</h3>
              <label>Do you want to save these changes?</label>
              <button onClick={confirmSaveChanges}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        )}

        {showPasswordModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Change Password</h3>
              <label>
                Current Password:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <button onClick={handlePasswordChange}>Save</button>
              <button onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {showChangeEmailModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Change Email</h3>
              <label>
                New Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button onClick={handleChangeEmail}>Save</button>
              <button onClick={() => setShowChangeEmailModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* {showChangeUsernameModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Change Username</h3>
              <label>
                New Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <button onClick={handleChangeUsername}>Save</button>
              <button onClick={() => setShowChangeUsernameModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Settings;
