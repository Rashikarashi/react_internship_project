import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';

const Product = ({ data, handleAddCart }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('search') || '';
        setSearchQuery(query);
    }, [location.search]);

    const handleCardClick = (course) => {
        setSelectedCourse(course);
    };

    const handleClosePopup = () => {
        setSelectedCourse(null);
    };

    const filteredCourses = data.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <div className='product-container'>
            {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                    <div 
                        key={course.id} 
                        className="card"
                        onClick={() => handleCardClick(course)}
                    >
                        <img 
                            src={`http://localhost/php1/${course.logo}`} 
                            alt={course.name} 
                            className="card-img"
                        />
                        <div className="card-content">
                            <h5 className="card-title">{course.name}</h5>
                            <p className="card-description">{course.description}</p>
                            <div className="card-footer">
                                <b>Price: ₹{course.price}</b>
                                <button 
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleAddCart(course.id);
                                    }}
                                >
                                    Join Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No courses found.</p>
            )}

            {selectedCourse && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="popup-close" onClick={handleClosePopup}>X</button>
                        <h2>{selectedCourse.name}</h2>
                        <img 
                            src={`http://localhost/php1/${selectedCourse.logo}`} 
                            alt={selectedCourse.name} 
                            className="popup-img"
                        />
                        <p>{selectedCourse.description}</p>
                        <b>Price: ₹{selectedCourse.price}</b>
                    </div>
                </div>
            )}
        </div>
      </>
    );
};

export default Product;