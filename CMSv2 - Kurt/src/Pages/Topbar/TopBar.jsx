import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './TopBarStyles.css';
import logo from '../../assets/Logo-Beige.png';

const TopBar = ({ setIsDropdownHovered }) => {
  const location = useLocation();

  return (
    <nav className="topbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Home
          </NavLink>
        </li>
        <li 
          className="nav-item dropdown" 
          onMouseEnter={() => setIsDropdownHovered(true)}
          onMouseLeave={() => setIsDropdownHovered(false)}
        >
          <span className="dropdown-toggle">
            Sections
          </span>
          <ul className="dropdown-menu">
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => isActive ? 'active-link' : ''}
              >
                Products
              </NavLink>
            </li>
            <hr/>
            <li>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => isActive ? 'active-link' : ''}
              >
                Articles
              </NavLink>
            </li>
            <hr/>
            <li>
              <NavLink 
                to="/blogs" 
                className={({ isActive }) => isActive ? 'active-link' : ''}
              >
                Blogs
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/support" 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Support
          </NavLink>
        </li>
      </ul>
      <div className="auth-buttons">
        <button className="login-button">Login</button>
        <button className="signup-button">Sign up</button>
      </div>
    </nav>
  );
};

export default TopBar;
