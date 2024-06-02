// src/Pages/Footer/Footer.js
import React from 'react';
import './FooterStyles.css';
import logo from '../../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <span className="name">Versatily</span>
        </div>
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="#">About Page</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Support Page 2</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
