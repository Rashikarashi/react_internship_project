import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './Home.css'; 
import codingImage from './fr.webp'; 

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 

  const handleGetStartedClick = () => {
    navigate('/login');
  };
  
  return (
    <div className="home-container">
      <main className="main-content">
        <div className="intro">
          <h1>Welcome to Codezz</h1>
          <p>Your journey to becoming a coding expert starts here.</p>
          {!isAuthenticated && (
            <button onClick={handleGetStartedClick}>Get Started</button>
          )}
        </div>
        <div className="image-container">
          <img src={codingImage} alt="Coding" />
        </div>
        <div className="features">
          <div className="feature">
            <h2>Expert Instructors</h2>
            <p>Learn from industry professionals with years of experience.</p>
          </div>
          <div className="feature">
            <h2>Hands-On Learning</h2>
            <p>Engage in real-world projects and challenges.</p>
          </div>
          <div className="feature">
            <h2>Flexible Schedule</h2>
            <p>Study at your own pace with our self-paced courses.</p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 Codezz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
