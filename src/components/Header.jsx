import React, { useState } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';
import SearchModal from './SearchModal';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Navbar variant="dark" expand="lg" className="headermain">
        <Container fluid className="d-flex justify-content-between align-items-center headermain2">

          {/* Logo */}
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" height="28" className="me-2" />
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            <i
              className="bi bi-search text-white"
              role="button"
              onClick={() => setShowSearch(true)}
            ></i>

            <Dropdown align="end">
              <Dropdown.Toggle
                as="span"
                className="dropdownlist"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <i className="bi bi-list text-white"></i>
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

      {/* Search Modal */}
      <SearchModal show={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

export default Header;
