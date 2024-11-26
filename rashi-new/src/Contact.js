import React from 'react';
import './Contact1.css';
import ParticlesBackground from './ParticlesBackground';
import Navbar from './Navbar';

const Contact = () => {
  return (
  <>
    <section className="contact">
      <ParticlesBackground />
      <form className='form'>
        <h2>Contact Form</h2>
        <div className="input-box">
          <label className='label'>Full Name:</label>
          <input type="text" className="field" placeholder='Enter your name' required />
        </div>
        <div className="input-box">
          <label>Email Address:</label>
          <input type="email" className="field" placeholder='Enter your email' required />
        </div>
        <div className="input-box">
          <label>Your Message:</label>
          <textarea className="field-mes" placeholder='Enter your message' required></textarea>
        </div>
        <button type='submit'>Send Message</button>
      </form>
    </section>
    </>
  );
}

export default Contact;
