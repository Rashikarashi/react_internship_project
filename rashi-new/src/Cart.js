import React, { useEffect, useState } from 'react';
import './Contact.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import RegistrationPopup from './RegistrationPopup'; // Import the popup component

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);

        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost/php1/api/new.php');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const courseData = await response.json();
                setCourses(courseData);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleRemoveFromCart = (courseId) => {
        const updatedCart = cart.filter(id => id !== courseId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    };

    const handleCheckout = async () => {
        const cartCourses = courses.filter(course => cart.includes(course.id));
        const totalAmount = cartCourses.reduce((total, course) => total + Number(course.price), 0);
        const totalQuantity = cartCourses.length;

        try {
            const response = await fetch('http://localhost/php1/api/storeCart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    userId: 1, 
                    totalQuantity: totalQuantity,
                    totalAmount: totalAmount.toFixed(2)
                })
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const result = await response.text();
            alert(result); 
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    const handlePopupToggle = () => {
        setShowPopup(!showPopup);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const cartCourses = courses.filter(course => cart.includes(course.id));
    const totalAmount = cartCourses.reduce((total, course) => total + Number(course.price), 0);
    const totalQuantity = cartCourses.length;

    return (
        <div className='cart-container'>
            <div className='cart-content'>
                <div className='cart-items'>
                    <h1 className='text-center'>Your Cart</h1>
                    {cartCourses.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ul>
                                {cartCourses.map(course => (
                                    <li key={course.id} className="cart-item">
                                        <img
                                            src={`http://localhost/php1/${course.logo}`}
                                            alt={course.name}
                                            className="cart-item-image"
                                        />
                                        <span className="cart-item-details">{course.name} - ₹{course.price}</span>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleRemoveFromCart(course.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="cart-summary-container">
                                <div className="cart-summary">
                                    <p>Total Quantity: {totalQuantity}</p>
                                    <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="clear-cart-button">
                                    <button className="clear-button" onClick={clearCart}>Clear Cart</button>
                                    <button className="register-button" onClick={handlePopupToggle}>Register</button>
                                    <button className="check-button" onClick={handleCheckout}>Checkout</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {showPopup && (
                <RegistrationPopup 
                    onClose={handlePopupToggle} 
                    cartCourses={cartCourses} 
                    totalAmount={totalAmount} 
                />
            )}
        </div>
    );
};

export default Cart;
