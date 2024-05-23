import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Topbar and Footer
import TopBar from './Pages/TopBar/TopBar';
import Footer from './Pages/Footer/Footer';

// Landing Page
import HomePage from './Pages/HomePage/HomePage';
import ProductPage from './Pages/ProductsPage/ProductPage';

// Import Pages here

const AppRoutes = () => {
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  return (
    <Router>
      <div>
        <TopBar setIsDropdownHovered={setIsDropdownHovered} />
        <div className={`content-container ${isDropdownHovered ? 'blurred' : ''}`}>
          <Routes>
            {/* Add Pages here */}
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/Products" element={<ProductPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
