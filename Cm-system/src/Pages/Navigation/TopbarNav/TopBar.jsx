import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopBarStyles.css';

const TopBar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="top-bar">
      <nav>
        <h2>Versatility</h2>
        <ul className="sections">
          <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li>
            <Link to="/sections" className={location.pathname.includes("/sections") ? "active" : ""}>
              Sections
            </Link>
            <ul className="dropdown">
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
            </ul>
          </li>
          <li><Link to="/support" className={location.pathname === "/support" ? "active" : ""}>Support</Link></li>
          <li><Link to="/account" className={location.pathname === "/account" ? "active" : ""}>Account</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default TopBar;
