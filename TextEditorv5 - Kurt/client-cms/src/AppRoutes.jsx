import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Topbar and Footer
import TopBar from './Pages/TopBar/TopBar';
import Footer from './Pages/Footer/Footer';

// Web Portal
import AccountRedirect from './Pages/WebPortal/account-redirect';

// Pages
import HomePage from './Pages/HomePage/Homepage';
import ProductPage from './Pages/ProductPage/ProductPage';
import PostsPage from './Pages/PostsPage/PostsPage';

// Editor Page
import TextEditor from './Pages/TextEditor/TextEditorComponent';

const AppRoutes = () => {
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);
    const location = useLocation();

    const excludeHeaderAndFooter = ['/Admin/PostEditor', '/account-redirect'];

    return (
        <div>
            {/* Only render TopBar if not in excluded paths */}
            {!excludeHeaderAndFooter.includes(location.pathname) && (
                <TopBar setIsDropdownHovered={setIsDropdownHovered} />
            )}
            <div className={`content-container ${isDropdownHovered ? 'blurred' : ''}`}>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path='/account-redirect' element={<AccountRedirect />} />
                    <Route exact path='/Products' element={<ProductPage />} />
                    <Route exact path='/Posts' element={<PostsPage />} />
                    <Route exact path='/Admin/PostEditor' element={<TextEditor />} />
                </Routes>
            </div>
            {/* Only render Footer if not in excluded paths */}
            {!excludeHeaderAndFooter.includes(location.pathname) && <Footer />}
        </div>
    );
};

const App = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default App;
