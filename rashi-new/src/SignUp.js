import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Popup from './Popup';
import { validatePassword } from './utils'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost/php1/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setShowModal(true);
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while signing up.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
    setShowModal(false); 
  };

  return (
    <div className="signup-page">
      <h1 className="signup-page__title">Sign Up</h1>
      <div className="signup-page__form-container">
        <form onSubmit={handleSubmit}>
          <label className="signup-page__label" htmlFor="email">Email:</label>
          <input
            className="signup-page__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="signup-page__label" htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              className="signup-page__input"
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <label className="signup-page__label" htmlFor="confirm-password">Confirm Password:</label>
          <div className="password-container">
            <input
              className="signup-page__input"
              type={passwordVisible ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>

          <button className="signup-page__button" type="submit">Sign Up</button>
        </form>
        {error && <p className="signup-page__error">{error}</p>}
        <button className="signup-page__back-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
      {showModal && (
        <Popup
          message="Signup completed successfully. Now login to continue."
          onClose={handleCloseModal}
          onNavigate={handleNavigateToLogin}
        />
      )}
    </div>
  );
};

export default Signup;
