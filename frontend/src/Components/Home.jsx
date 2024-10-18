import '../assets/css/Home.css';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const handleButtonClick = () => {
    
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1 className="home-title">

          <Typewriter
            words={["Turn your 'I should' into 'I did!"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
      </div>
      <button className="home-button" onClick={handleButtonClick}>
        Get in!
      </button>
    </div>
  );
};

export default Home;
