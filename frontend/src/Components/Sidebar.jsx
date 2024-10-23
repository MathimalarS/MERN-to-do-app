import { FaCalendarAlt, FaStickyNote, FaTasks, FaCheckSquare, FaTrashAlt, FaBars, FaSearch } from 'react-icons/fa';
import '../assets/css/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu-header">
        <h3>Menu</h3>
        <FaBars className="menu-icon" />
      </div>
      <div className="search-bar-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search" className="search-bar" />
      </div>

      <div className="menu-items">
        <h4 className="tasks-title">Tasks</h4>
        <ul>
          <li>
            <Link to="/todo" className="link-with-icon">
              <FaCheckSquare className="icon-black" /> To-do List
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="link-with-icon">
              <FaCalendarAlt className="icon-black" /> Calendar
            </Link>
          </li>
          <li>
            <Link to="/stickynotes" className="link-with-icon">
              <FaStickyNote className="icon-black" /> Sticky Notes
            </Link>
          </li>
          <li>
            <Link to="/deleted" className="link-with-icon">
              <FaTrashAlt className="icon-black" />Deleted Tasks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
