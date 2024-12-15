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
  const [error, setError] = useState(""); // To capture and show errors
  const navigate = useNavigate();

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token consistently
      if (!token) {
        alert("Please log in.");
        navigate("/login"); // Redirect to login if no token is present
        return;
      }

      // Make the API request with the token
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User details fetched:", response.data); // Debug log for response

      if (response.data && response.data.email) {
        setEmail(response.data.email); // Set the email from the response
        setPassword(""); // Don't display the password
        setLoading(false); // Stop loading
      } else {
        setError("Failed to load user details.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
      setError("Failed to load user details.");
    }
  };

  // Function to handle saving the updated profile
  const handleSave = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const updatedProfileData = { email, newPassword: password };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        updatedProfileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Profile updated:", response.data);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error(
        "Error saving profile:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.message ||
          "Error saving profile. Please try again."
      );
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when the component mounts
  }, []); // Empty array ensures the effect runs only once after the initial render

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2 className="settings-header centered-header">Account Settings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}

            {!isEditing ? (
              <div className="profile-view">
                <p className="profile-email">Email: {email}</p>
                {/* Don't display password in the profile view */}
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit Profile"
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
                    placeholder="Enter new email"
                    name="email"
                  />
                </label>
                <label className="input-label">
                  Password
                  <input
                    type="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    name="password"
                  />
                </label>
                <button
                  className="save-button"
                  onClick={handleSave}
                  aria-label="Save profile changes"
                >
                  Save
                </button>
              </div>
            )}
            <button
              className="logout-button right-align"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout <FaSignOutAlt />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
