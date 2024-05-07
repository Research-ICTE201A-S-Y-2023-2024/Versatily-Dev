import './Order.css';
import profileImage from '../assets/img/profile.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import CartSidebar from '../components/CartSideBar/CartSideBar.jsx';

const Order = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const workbenchID = queryParams.get('workbenchID');
    const [workbench, setWorkbench] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState(products);

    const filterProducts = (category) => {
        const filtered = products.filter(product => product.category === category);
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, [])

    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products");
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories");
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

    // Function to remove a product from the cart
    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const updateQuantity = (index, quantity) => {
        setIsCartOpen(true);
        if (quantity >= 0 && index >= 0 && index < cartItems.length) {
            const updatedCartItems = cartItems.map((item, idx) => {
                if (idx === index) {
                    return { ...item, quantity: quantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    };
    
    const addToCart = (product) => {
        if (product.outOfStock) {
            toast.error('This product is currently disabled and cannot be added to the cart.', toastConfig);
            return;
        }
    
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems(prevCartItems => [...prevCartItems, { ...product, quantity: 1 }]);
        }
    
        setIsCartOpen(true);
    };
    
    const incrementQuantity = (productID) => {
        setIsCartOpen(true);
        // Find the product index in cartItems array
        const productIndex = cartItems.findIndex(item => item.id === productID);
        if (productIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[productIndex].quantity += 1;
            setCartItems(updatedCartItems);
        }
    };
    
    // Modify decrementQuantity function to accept productID
    const decrementQuantity = (productID) => {
        setIsCartOpen(true);
        // Find the product index in cartItems array
        const productIndex = cartItems.findIndex(item => item.id === productID);
        if (productIndex !== -1 && cartItems[productIndex].quantity > 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[productIndex].quantity -= 1;
            setCartItems(updatedCartItems);
        }
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
                <Link to="/kiosk">
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                    <a href="#" onClick={() => handleMenuItemClick(0)}>
                        <i className='bx bx-grid-alt'></i>
                        <span className="text">Kiosk</span>
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
                                {/* <h2>Workbench Details</h2>
                                <p>ID: {workbench.id}</p>
                                <p>Workbench ID: {workbench.workbenchID}</p>
                                <p>Status: {workbench.status ? 'Occupied' : 'Vacant'}</p> */}
                                <div className="header-order-category">
                                    <h1 className='category-menu'>Menu</h1>
                                    <i id='category-cart-icon' className='bx bx-cart' onClick={() => setIsCartOpen(true)}></i>
                                </div>
                                <div className="category-order-container">
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <div key={index} className="category-order-row" onClick={() => filterProducts(category.name)}>
                                                <img src={category.url} alt={category.name} width={25} height={25} />
                                                <p className='category-text-name'>{category.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="category-order-row">
                                            No category found
                                        </div>
                                    )}
                                </div>

                                <div className="order-container">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product, index) => (
                                            <div key={index} className='product-row'>
                                                <div className="product-info">
                                                    <img src={product.url} alt="product" width={100} height={100} />
                                                    <div className="info">
                                                        <h2 className='product-text-name'>{product.name}</h2>
                                                        <h3 className='product-text-price'>₱{product.price}</h3>
                                                        <div className="order-quantity-controls">
                                                            <button onClick={() => decrementQuantity(product.id)}> - </button>
                                                                <span className="quantity">{cartItems.find(item => item.id === product.id)?.quantity ?? 0}</span>
                                                            <button onClick={() => { incrementQuantity(product.id); addToCart(product); }}> + </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='add-cart-container' onClick={() => addToCart(product)}>
                                                    <button className='add-cart-btn'>
                                                        <i className='bx bx-cart'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="product-row">
                                            <span>No products found.</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-order-container">
                                <div className="text-message-order">
                                    To order a product, please click on the workbench table first.
                                    <br />
                                    <br />
                                    <Link to={'http://localhost:3000/workbench'} >
                                        <div className="button-next-page">
                                            Click me to navigate on Workbench <i className='bx bx-right-arrow-alt'></i>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                </main>
                {/* MAIN */}
            </section>
            {/* CONTENT */}
            {isCartOpen && (
                <CartSidebar
                    workbenchUnique={workbench.workbenchID}
                    workbenchNo={workbench.id}
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    isOpen={isCartOpen}
                    setIsOpen={setIsCartOpen}
                />
            )}
            <ToastContainer/>
        </>
    );
}

export default Order