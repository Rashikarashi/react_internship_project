
import React from 'react';
import './Popup.css'; 

const Modal = ({ message, onClose, onNavigate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onNavigate}>Go to Login</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
