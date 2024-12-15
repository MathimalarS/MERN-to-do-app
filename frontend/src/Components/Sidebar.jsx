import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import "../assets/css/Sidebar.css";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const handleMenuClick = () => {
    setExtended(!extended);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={handleMenuClick}
          className="menu"
          src={assets.menuicon}
          alt="Menu"
        />
      </div>

      <div className="center">
        <div className="center-item">
          <Link to="/todo">
            <img src={assets.checkicon} alt="To-do List" />
            {extended && <p>To-do List</p>}
          </Link>
        </div>
        <div className="center-item">
          <Link to="/calendar">
            <img src={assets.calendaricon} alt="Calendar" />
            {extended && <p>Calendar</p>}
          </Link>
        </div>
        <div className="center-item">
          <Link to="/deleted">
            <img src={assets.deleteicon} alt="Deleted Tasks" />
            {extended && <p>Deleted Tasks</p>}
          </Link>
        </div>
      </div>

      <div className="bottom">
        <Link to="/settings" className="bottom-item">
          <img src={assets.settingicon} alt="Settings" />
          {extended && <p>Settings</p>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
