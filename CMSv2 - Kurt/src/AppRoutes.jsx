import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Topbar and Footer
import TopBar from './Pages/Topbar/TopBar';
import Footer from './Pages/Footer/Footer';

// Landing Page
import HomePage from './Pages/HomePage/HomePage';

// Import Pages here
//Product Page
import ProductsPage from './Pages/ProductsPage/ProductPage';

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
            <Route exact path="/Products" element={<ProductsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
