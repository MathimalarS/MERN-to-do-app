import { Link } from 'react-router-dom';
import '../assets/css/Tasks.css';

const Tasks = () => {
  return (
    <div className="tasks-container">
      <div className="sidebar">
        <h3>Menu</h3>
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="tasks">
          <h4>Tasks</h4>
          <ul>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/stickynotes">Sticky Notes</Link></li>
            <li><Link to="/upcoming">Upcoming Tasks</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/todo">To-do List</Link></li>
            <li><Link to="/deleted">Deleted</Link></li>
          </ul>
        </div>
      </div>

      <div className="sticky-notes">
        <div className="note yellow">Social Media</div>
        <div className="note blue">Content Strategy</div>
        <div className="note red">Email A/B Tests</div>
        <div className="note orange">Banner Ads</div>
        <div className="note empty">+</div>
      </div>
    </div>
  );
};

export default Tasks;
