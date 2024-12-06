import { useState } from "react";
import "../assets/css/Setting.css";

const Settings = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="settings-popup-overlay">
      <div className="settings-popup">
        <button className="settings-close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Settings</h2>
        <div className="settings-section">
          <h3>Profile Settings</h3>
          <button>Edit Profile</button>
        </div>
        <div className="settings-section">
          <h3>Theme</h3>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleToggleDarkMode}
            />
            Dark Mode
          </label>
        </div>
        <div className="settings-section">
          <h3>Notifications</h3>
          <label>
            <input type="checkbox" /> Task Reminders
          </label>
        </div>
        <div className="settings-section">
          <h3>Account</h3>
          <button>Reset Password</button>
          <button>Logout</button>
        </div>
        <div className="settings-section">
          <h3>General</h3>
          <button>Clear All Tasks</button>
          <button>Change Language</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
