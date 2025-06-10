import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();

  // Close search when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showSearch]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="headermain">
      <Container fluid className="d-flex justify-content-between align-items-center">

        {/* Logo */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" height="45" className="me-2" />
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">

          {/* Search Icon */}
          <i
            className="bi bi-search text-white fs-5"
            role="button"
            onClick={() => setShowSearch(true)}
          ></i>

          {/* Fullscreen Search Overlay */}
          {showSearch && (
            <div className="search-overlay">
              <div className="search-box" ref={searchRef}>
                <Form className="d-flex align-items-center w-100">
                  <FormControl
                    type="text"
                    placeholder="Search..."
                    className="me-2"
                    autoFocus
                  />
                  <i className="bi bi-search"></i>
                  
                  
                </Form>
              </div>
            </div>
          )}

          {/* Custom Toggle Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="dark"
              id="dropdown-menu"
              className="dropdownlist"
              style={{ background: 'transparent', border: 'none' }}
            >
              <i className="bi bi-list fs-3 text-white"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
            <Dropdown.Item href="#language">Language</Dropdown.Item>
            <Dropdown.Item href="#timezone">Timezone</Dropdown.Item>
            <Dropdown.Item href="#odds">Odds</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
      
  );
};



export default Header;
