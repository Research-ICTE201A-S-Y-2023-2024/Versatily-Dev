import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Topbar and Footer
import TopBar from './Pages/TopBar/TopBar';
import Footer from './Pages/Footer/Footer';

// Pages
import HomePage from './Pages/HomePage/Homepage';
import ProductPage from './Pages/ProductPage/ProductPage';
import PostsPage from './Pages/PostsPage/PostsPage';

// Editor Page
import TextEditor from './Pages/TextEditor/TextEditorComponent';

const AppRoutes = () => {
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);

    return (
        <Router>
            <div>
                {/* Only render TopBar if not in /Admin/PostEditor */}
                {window.location.pathname !== '/Admin/PostEditor' && <TopBar setIsDropdownHovered={setIsDropdownHovered} />}
                <div className={`content-container ${isDropdownHovered ? 'blurred' : ''}`}>
                    <Routes>
                        <Route exact path='/' element={<HomePage />} />
                        <Route exact path='/Products' element={<ProductPage />} />
                        <Route exact path='/Posts' element={<PostsPage />} />
                        <Route exact path='/Admin/PostEditor' element={<TextEditor />} />
                    </Routes>
                </div>
                {/* Only render Footer if not in /Admin/PostEditor */}
                {window.location.pathname !== '/Admin/PostEditor' && <Footer />}
            </div>
        </Router>
    )
}

export default AppRoutes;
