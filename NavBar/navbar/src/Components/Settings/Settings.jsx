import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [showActiveSessions, setShowActiveSessions] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showReportProblem, setShowReportProblem] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDownloadConfirmation, setShowDownloadConfirmation] =
    useState(false);

  const handleSaveChanges = () => {
    setShowConfirmation(true);
  };

  const confirmSaveChanges = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    // Save other settings as needed
    setShowConfirmation(false);
    console.log("Changes saved");
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = () => {
    // Logic to delete account
    console.log("Account deleted");
    setShowDeleteConfirmation(false);
  };

  const handleDownloadData = () => {
    setShowDownloadConfirmation(true);
  };

  const confirmDownloadData = () => {
    // Logic to download personal data
    console.log("Personal data downloaded");
    setShowDownloadConfirmation(false);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <section className="account-settings">
        <h3>Account Settings</h3>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <label>
          Profile Picture:
          <input type="file" />
        </label>
      </section>

      <section className="security-settings">
        <h3>Security Settings</h3>
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
        <label>
          Two-Factor Authentication:
          <input type="checkbox" />
        </label>
        <button onClick={() => setShowActiveSessions(true)}>
          Manage Active Sessions
        </button>
      </section>

      <section className="preferences">
        <h3>Preferences</h3>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </label>
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
            <option value="ar">Arabic</option>
            <option value="pt">Portuguese</option>
            <option value="hi">Hindi</option>
            {/* Add more languages as needed */}
          </select>
        </label>
        <label>
          Email Notifications:
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={(e) =>
              setNotifications({ ...notifications, email: e.target.checked })
            }
          />
        </label>
        <label>
          SMS Notifications:
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={(e) =>
              setNotifications({ ...notifications, sms: e.target.checked })
            }
          />
        </label>
        <label>
          Push Notifications:
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={(e) =>
              setNotifications({ ...notifications, push: e.target.checked })
            }
          />
        </label>
      </section>

      <section className="privacy-data">
        <h3>Privacy & Data</h3>
        <button onClick={() => setShowPrivacySettings(true)}>
          Manage Privacy Settings
        </button>
        <button onClick={handleDownloadData}>Download Personal Data</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </section>

      <section className="support-help">
        <h3>Support & Help</h3>
        <button onClick={() => setShowFAQs(true)}>FAQs & Help Center</button>
        <button onClick={() => setShowSupport(true)}>Contact Support</button>
        <button onClick={() => setShowReportProblem(true)}>
          Report a Problem
        </button>
      </section>

      <button onClick={handleSaveChanges} className="save-changes-btn">
        Save Changes
      </button>

      {showActiveSessions && (
        <div className="modal">
          <div className="modal-content">
            <h3>Manage Active Sessions</h3>
            <p>Here you can log out from other devices.</p>
            <button onClick={() => setShowActiveSessions(false)}>Close</button>
          </div>
        </div>
      )}

      {showPrivacySettings && (
        <div className="modal">
          <div className="modal-content">
            <h3>Privacy Settings</h3>
            <p>Here you can manage your privacy settings.</p>
            <button onClick={() => setShowPrivacySettings(false)}>Close</button>
          </div>
        </div>
      )}

      {showFAQs && (
        <div className="modal">
          <div className="modal-content">
            <h3>FAQs & Help Center</h3>
            <p>Here you can find answers to frequently asked questions.</p>
            <button onClick={() => setShowFAQs(false)}>Close</button>
          </div>
        </div>
      )}

      {showSupport && (
        <div className="modal">
          <div className="modal-content">
            <h3>Contact Support</h3>
            <p>Here you can contact support via email or phone.</p>
            <button onClick={() => setShowSupport(false)}>Close</button>
          </div>
        </div>
      )}

      {showReportProblem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Report a Problem</h3>
            <p>Here you can report any issues you are facing.</p>
            <button onClick={() => setShowReportProblem(false)}>Close</button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Changes</h3>
            <p>Do you want to make these changes?</p>
            <button onClick={confirmSaveChanges}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Account Deletion</h3>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={confirmDeleteAccount}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}

      {showDownloadConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Data Download</h3>
            <p>Do you want to download your personal data?</p>
            <button onClick={confirmDownloadData}>Yes</button>
            <button onClick={() => setShowDownloadConfirmation(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
