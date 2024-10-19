import '../assets/css/Stickynotes.css';
import Sidebar from './Sidebar';

const StickyWall = () => {
  return (
    <div className="stickywall-container">
      <Sidebar/>
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

export default StickyWall;
