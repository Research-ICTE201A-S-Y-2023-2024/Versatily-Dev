import './Order.css';
import profileImage from '../assets/img/profile.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {

    const [products, setProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const workbenchID = queryParams.get('workbenchID');
    const [workbench, setWorkbench] = useState(null);

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products");
        }
    }

    useEffect(() => {
        if (workbenchID) {
            fetchWorkbenchDetails(workbenchID);
        } else {
            console.log("No workbench ID provided.");
        }
    }, [workbenchID]);

    const fetchWorkbenchDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/workbench/${id}`);
            
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Failed to fetch workbench details');
            }

            setWorkbench(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

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
                <Link to="/products">
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
                    {workbench ? (
                            <>
                                <h2>Workbench Details</h2>
                                <p>ID: {workbench.id}</p>
                                <p>Workbench ID: {workbench.workbenchID}</p>
                                <p>Status: {workbench.status ? 'Occupied' : 'Vacant'}</p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    <div className="container">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <div key={index} className='product-row'>
                                    <img src={product.url} alt="product" width={120} height={120} />
                                    <div className="info">
                                        <h2>{product.name}</h2>
                                        <h3>₱{product.price}</h3>
                                        <div className="quantity-controls">
                                            <button>-</button>
                                                <span className="quantity">0</span>
                                            <button>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="product-row">
                                <span>No products found.</span>
                            </div>
                        )}
                    </div>
                </main>
                {/* MAIN */}
            </section>
            {/* CONTENT */}
        </>
    );
}

export default Order;