import './Category.css';
import { useState } from 'react';
import profileImage from '../assets/img/profile.jpg';
import {Link} from 'react-router-dom';

const Category = () => {

    const [activeMenuItem, setActiveMenuItem] = useState(0);

    const handleMenuItemClick = (index) => {
      setActiveMenuItem(index); // Set active menu item index
    };
    const handleToggleSidebar = () => {
      // Toggle sidebar
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hide');
    };

    
    return(
        <>
            {/* SIDEBAR */}
            <section id="sidebar">
                <Link to="/">
                    <a href="#" className="brand">
                        <i className='bx bxl-venmo'></i>
                        <span className="text">Versatily</span>
                    </a>
                </Link>
                <ul className="side-menu top">
                <span className='side-text-category'>Main</span>
                <Link to="/workbench">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                    <a href="#" onClick={() => handleMenuItemClick(0)}>
                        <i className='bx bx-grid-alt'></i>
                        <span className="text">Workbench</span>
                    </a>
                    </li>
                </Link>
                <Link to="/order">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-cart'></i>
                            <span className="text">Order</span>
                        </a>
                    </li>
                </Link>
                <Link to="/dashboard">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-signal-4'></i>
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
                </Link>
                <Link to="/overview">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-search'></i>
                            <span className="text">Overview</span>
                        </a>
                    </li>
                </Link>
                <Link to="/product">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-package'></i>
                            <span className="text">Product</span>
                        </a>
                    </li>
                </Link>
                <Link to="/categories">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-category'></i>
                            <span className="text">Category</span>
                        </a>
                    </li>
                </Link>
                
                <span className='side-text-category'>Transaction</span>
                <Link to="/void-transaction">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-notepad'></i>
                            <span className="text">Void Tranasaction</span>
                        </a>
                    </li>
                </Link>

                <Link to="/history-transaction">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-history'></i>
                            <span className="text">History</span>
                        </a>
                    </li>
                </Link>

                <Link to="/invoice-transaction">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className='bx bx-receipt'></i>
                            <span className="text">Invoice</span>
                        </a>
                    </li>
                </Link>
                </ul>
            </section>
            {/* SIDEBAR */}




            <section id="content">
                {/* NAVBAR */}
                <nav>
                <i className='bx bx-menu' onClick={handleToggleSidebar}></i>
                <form action="#">
                    <div className="form-input">
                        <input type="search" placeholder="Search..."/>
                        <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                    </div>
                </form>
                <input type="checkbox" id="switch-mode" hidden/>
                <label htmlFor="switch-mode" className="switch-mode"></label>
                <a href="#" className="notification">
                    <i className='bx bxs-bell' ></i>
                    <span className="num">8</span>
                </a>
                <a href="#" className="profile">
                    <img src={profileImage}/>
                </a>
                </nav>
                {/* NAVBAR */}

                {/* MAIN */}
                <main>
                    <div className='container'>
                        
                        <div className='food-Option'>
                            <i className='bx bx-bowl-rice'></i>
                            <h1>Food</h1>
                        </div>

                        <div className='drinks-Option'>
                            <i className='bx bx-drink'></i>
                            <h1>Drinks</h1>
                        </div>
                        
                        <div className='ingridients-Option'>
                            <i className='bx bx-baguette' ></i>
                            <h1>Ingredients</h1>
                        </div>

                        <div className='add-Option'>
                            <i className='bx bx-plus'></i>
                        </div>
                    </div>
                </main>
                {/* MAIN */}
            </section>
            {/* CONTENT */}
        </>
    );
}

export default Category