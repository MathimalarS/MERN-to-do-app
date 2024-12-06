import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import "../assets/css/Sidebar.css";
import Settings from "./Setting";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleMenuClick = () => {
    setExtended(!extended); // Toggle the extended state
  };

  const openSettingsPopup = () => {
    setShowSettings(true); // Show the settings popup
  };

  const closeSettingsPopup = () => {
    setShowSettings(false); // Hide the settings popup
  };

  return (
    <>
      {/* Sidebar Layout */}
      <div className={`sidebar ${extended ? "extended" : ""}`}>
        {/* Top Section: Menu and Search */}
        <div className="top">
          <img
            onClick={handleMenuClick}
            className="menu"
            src={assets.menuicon}
            alt=""
          />
        </div>

        <div className={`search-bar-container ${extended ? "" : "collapsed"}`}>
          <img src={assets.searchicon} className="search-icon" />
          {extended && (
            <input
              type="text"
              placeholder="Search tasks..."
              className="search-bar"
            />
          )}
        </div>

        {/* Center Section: Task Items */}
        <div className="center">
          <div className="center-item">
            <Link to="/todo">
              <img src={assets.checkicon} alt="" />
              {extended && <p>To-do list</p>}
            </Link>
          </div>
          <div className="center-item">
            <Link to="/calendar">
              <img src={assets.calendaricon} alt="" />
              {extended && <p>Calendar</p>}
            </Link>
          </div>
          <div className="center-item">
            <Link to="/deleted">
              <img src={assets.deleteicon} alt="" />
              {extended && <p>Deleted tasks</p>}
            </Link>
          </div>
        </div>

        {/* Bottom Section: Settings */}
        <div className="bottom">
          <div className="bottom-item" onClick={openSettingsPopup}>
            <img src={assets.settingicon} alt="" />
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>

      {/* Render the Settings Popup if showSettings is true */}
      {showSettings && <Settings onClose={closeSettingsPopup} />}
    </>
  );
};

export default Sidebar;
