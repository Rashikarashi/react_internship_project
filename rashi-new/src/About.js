import React from 'react';
import './About.css'; 

const About = () => {
  return (
  <>
    <div className="about-container">
      <h1>About Us</h1>
      <p>Welcome to <strong>Codezz Academy</strong>!</p>
      <p>
        At Codezz Academy, we believe that anyone can learn to code and transform their career. Whether you're a complete beginner or looking to advance your skills, our comprehensive courses are designed to help you achieve your goals.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to make high-quality programming education accessible to everyone. We aim to empower individuals with the skills they need to succeed in the tech industry, regardless of their background or experience level.
      </p>
      <h2>What We Offer</h2>
      <ul>
        <li><strong>Expert-Led Courses:</strong> Learn from industry professionals with years of experience.</li>
        <li><strong>Hands-On Projects:</strong> Apply your knowledge with real-world projects and challenges.</li>
        <li><strong>Flexible Learning:</strong> Study at your own pace with our self-paced courses.</li>
        <li><strong>Community Support:</strong> Join a vibrant community of learners and get support from peers and mentors.</li>
      </ul>
      <h2>Our Story</h2>
      <p>
        Founded in 2020, CodeMaster Academy started with a simple idea: to bridge the gap between traditional education and the demands of the modern tech industry. Since then, we've helped thousands of students from around the world learn to code and land their dream jobs.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>Comprehensive Curriculum:</strong> Our courses cover a wide range of programming languages and technologies, including HTML, CSS, JavaScript, Python, and more.</li>
        <li><strong>Career Services:</strong> Get access to resume reviews, interview prep, and job placement assistance.</li>
        <li><strong>Affordable Pricing:</strong> We offer competitive pricing and financial aid options to make learning accessible to everyone.</li>
      </ul>
      <h2>Join Us</h2>
      <p>
        Ready to start your coding journey? Enroll in one of our courses today and take the first step towards a brighter future.
      </p>
    </div>
    <div>
       <footer className="footer">
        <p>© 2024 Codezz. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default About;

