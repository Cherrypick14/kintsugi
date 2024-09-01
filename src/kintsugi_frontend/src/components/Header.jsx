// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/styles.css";
import "../styles/header.css";
import kintsugi from '/kintsugi.png';

const Header = () => {
  const location = useLocation();

  return (
    <nav id="mainNav">
      <div className="container">
        <div className="nav-container">
          <Link to="/" className={`logo ${location.pathname === '/' ? 'active' : ''}`}>
          <div className="logo-image-container">
              <img src={kintsugi} alt="Kintsugi Logo" />
            </div>
            {/* <img src={kintsugi} alt="Kintsugi Logo" width="100" height="300" /> */}
            Kintsugi
          </Link>
          <div className="nav-menu">
            <ul>
              <li>
                <Link 
                  to="/home" 
                  className={location.pathname === '/home' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/statistics" 
                  className={location.pathname === '/statistics' ? 'active' : ''}
                >
                  Statistics
                </Link>
              </li>
              
                <li>
                  <Link 
                    to="/login" 
                    className={location.pathname === '/login' ? 'active' : ''}
                  >
                    Admin Login
                  </Link>
                </li>
            
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
