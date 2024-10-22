import { Link } from 'react-router-dom';
import '../assets/css/Tasks.css';

const Tasks = () => {
  return (
    <div className="tasks-container">
      <div className="sidebar">
        <h3>Menu</h3>
        <input type="text" placeholder="Search" className="search-bar" />
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
