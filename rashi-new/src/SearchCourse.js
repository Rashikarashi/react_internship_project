import React, { useState, useEffect } from 'react';
import Product from './Product';

const SearchCourse = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost/api/new.php');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Filter courses based on search query
    useEffect(() => {
        const results = courses.filter(course =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(results);
    }, [searchQuery, courses]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Mock handleAddCart function
    const handleAddCart = (courseId) => {
        console.log('Course added to cart:', courseId);
    };

    return (
        <div>
            <form className="d-flex ms-auto" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success" type="button">
                    Search
                </button>
            </form>
            <Product data={filteredCourses} handleAddCart={handleAddCart} />
        </div>
    );
};

export default SearchCourse;
