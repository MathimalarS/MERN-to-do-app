import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import "../assets/css/Setting.css";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in.");
        navigate("/login");
        return;
      }
      const decodedToken = jwt_decode(token); // If you use jwt-decode
      if (decodedToken.exp * 1000 < Date.now()) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmail(response.data.data.email);
      setPassword("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to load user details.");
    }
  };

  // Save profile changes
  const handleSave = async () => {
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/profile",
        { email, newPassword: password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Error saving profile.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2 className="settings-header centered-header">Account Settings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {!isEditing ? (
              <div className="profile-view">
                <p className="profile-email">Email: {email}</p>
                <p className="profile-email">Password: {password}</p>
                <button
                  className="edit-button"
                  onClick={() => {
                    setIsEditing(true);
                    setError("");
                  }}
                >
                  Edit Profile <FaEdit />
                </button>
              </div>
            ) : (
              <div className="edit-form">
                <label className="input-label">
                  Email
                  <input
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </label>
                <label className="input-label">
                  Password
                  <input
                    type="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </label>
                <button
                  className="save-button"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout <FaSignOutAlt />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
