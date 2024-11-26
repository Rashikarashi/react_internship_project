// SuccessPopup.js
import React from 'react';
import './SuccessPopup.css'; // Import the CSS for styling

const SuccessPopup = ({ onClose }) => {
    return (
        <div className="success-popup-overlay">
            <div className="success-popup-content">
                <h2>Registration Successful!</h2>
                <p>Your registration has been successfully completed.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessPopup;
