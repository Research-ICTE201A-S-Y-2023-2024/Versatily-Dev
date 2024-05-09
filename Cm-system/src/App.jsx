import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Topbar and Footer
import TopBar from './Pages/Navigation/TopbarNav/TopBar';
import FooterBar from './Pages/Navigation/Footer/FooterBar';

// Landing Page
import HomePage from './Pages/HomePage/HomePage';

// Main Content Pages
import Feed from './Pages/PostManagement/Feed';
import Write from './Pages/PostManagement/Write';

// User Registration and Login Page
import RegisterPage from './Pages/UserRegister/Register';
import LoginPage from './Pages/UserLogin/Login';

// Documentation Page
import SupportPage from './Pages/SupportPage/SupportPage';

// Routing
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Support" element={<SupportPage />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Write" element={<Write />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
