import React, { useState } from 'react';
import './RegistrationPopup.css'; // Existing styles
import SuccessPopup from './SuccessPopup'; // Import the SuccessPopup component

const RegistrationPopup = ({ onClose, cartCourses, totalAmount }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to control success popup visibility

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Registration Details:', { name, phone, email, cartCourses, totalAmount });
        // Simulate a successful registration
        setShowSuccessPopup(true);
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        onClose(); // Optionally close the registration popup
    };

    return (
        <div>
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Register for Courses</h2>
                    <form className="flex" onSubmit={handleSubmit}>
                        <label className='label'>
                            Name:
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </label>
                        <label className='label'>
                            Phone Number:
                            <input 
                                type="tel" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                required 
                            />
                        </label>
                        <label className='label'>
                            Email:
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </label>
                        <div className="popup-details">
                            <h3>Courses in Cart:</h3>
                            <ul>
                                {cartCourses.map(course => (
                                    <li key={course.id}>{course.name} - ₹{course.price}</li>
                                ))}
                            </ul>
                            <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
                        </div>
                        <button className='button' type="submit">Submit</button>
                        <button className='button' type="button" onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
            {showSuccessPopup && <SuccessPopup onClose={closeSuccessPopup} />} {/* Render success popup */}
        </div>
    );
};

export default RegistrationPopup;
