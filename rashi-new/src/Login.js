import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './Login.css'; 
import Modal from './Modal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost/php1/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        login(); 
        setShowModal(true); 
      } else {
        setError(result.error || 'An unexpected error occurred');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while logging in.');
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); 
  };

  const handleSignUpClick = () => {
    navigate('/signup'); 
  };

  return (
    <div className="login-page">
      <h1 className="login-page__title">Login</h1>
      <div className="login-page__form-container">
        <form onSubmit={handleSubmit}>
          <label className="login-page__label" htmlFor="email">Email:</label>
          <input
            className="login-page__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="login-page__label" htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              className="login-page__input"
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
          <button className="login-page__button" type="submit">Login</button>
        </form>
        {error && <p className="login-page__error">{error}</p>}
        <div className="login-page__actions">
          <p>Don't have an account? <button className="login-page__signup-button" onClick={handleSignUpClick}>Sign Up</button></p>
        </div>
      </div>
      {showModal && (
        <Modal
          message="Login successful. You are now logged in. Click close to return to the home page."
          onClose={handleCloseModal}
          onNavigate={() => navigate('/')} 
        />
      )}
    </div>
  );
};

export default Login;
