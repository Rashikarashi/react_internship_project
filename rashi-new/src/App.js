import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Navbar';
import Product from './Product';
import Contact from './Contact';
import About from './About';
import Home from './Home';
import Cart from './Cart';
import SignUp from './SignUp'
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

function App() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/php1/api/new.php'); 
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  const handleAddCart = (id) => {
    const course = data.find(course => course.id === id);

    if (!course) {
      alert('Course not found');
      return;
    }

    setCart(prevCart => {
      const isAlreadyInCart = prevCart.includes(id);

      if (isAlreadyInCart) {
        alert(`${course.name} is already in your cart.`);
        return prevCart;
      }

      const updatedCart = [...prevCart, id];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${course.name} has been added to your cart!`);
      return updatedCart;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <AuthProvider>
          <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product data={data} handleAddCart={handleAddCart} />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>

  );
}

export default App;
