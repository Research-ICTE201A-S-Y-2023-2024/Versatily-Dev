import './Order.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as jose from 'jose';
import CartSidebar from '../../components/CartSideBar/CartSideBar.jsx';

const Order = () => {
  useEffect(() => {
    document.title = 'Ordering';
  }, []);

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile-name')) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filterProducts = (category) => {
    const filtered = products.filter(
      product =>
        product.category === category &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // setFilteredProducts(
    //   products.filter((product) =>
    //     product.name.toLowerCase().includes(event.target.value.toLowerCase())
    //   )
    // );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  };

  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [, setToken] = useState('');

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decode = jose.decodeJwt(storedToken);
      console.log('Token ' + storedToken);
      console.log({ decode });

      setToken(storedToken);
      setLoggedInAccount(decode);

      const username = decode.username;

      if (username) {
        getLoggedInAccount(storedToken, username); // Call API with token and username
      } else {
        console.error('Username not found in token');
      }
    } else {
      console.error('Token not found in localStorage');
    }
  }, []);

  const getLoggedInAccount = async (token, username) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/account/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLoggedInAccount(response.data); // Update state with logged-in account data
      console.log(response.data);
      console.log(token);
    } catch (error) {
      console.error('Error fetching logged-in account:', error);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products');
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories');
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const toastConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const updateQuantity = (index, quantity) => {
    setIsCartOpen(true);
    if (quantity >= 0 && index >= 0 && index < cartItems.length) {
      const updatedCartItems = cartItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
  };

  const addToCart = (product) => {
    if (product.outOfStock) {
      toast.error(
        'This product is currently disabled and cannot be added to the cart.',
        toastConfig,
      );
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id,
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevCartItems => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
    }

    setIsCartOpen(true);
  };

  // Modify decrementQuantity function to accept productID
  const decrementQuantity = (productID) => {
    setIsCartOpen(true);
    // Find the product index in cartItems array
    const productIndex = cartItems.findIndex(item => item.id === productID);
    if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[productIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <section id="order-content">
        {/* NAVBAR */}
        <nav>
          <form action="#" onSubmit={handleSearchSubmit}>
            <div className="form-input">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <div className="container-logut-drop-down" onClick={toggleDropdown}>
            <div className="profile-name">
              <div className="profile-content-icon">
                <i className="bx bx-user"></i>{' '}
              </div>
              <div className="profile-content-name">
                {loggedInAccount ? loggedInAccount.account_username : ''}{' '}
              </div>
              <div className="profile-content-drop-down-menu">
                <i
                  className={`bx bx-chevron-down ${
                    isDropdownOpen ? 'rotate' : ''
                  }`}
                ></i>{' '}
              </div>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to={'/account'}>
                  <i className="bx bx-user"></i>Profile
                </Link>
                <Link to={'/login'} onClick={handleLogout}>
                  <i className="bx bx-log-out"></i>Logout
                </Link>
              </div>
            )}
          </div>
        </nav>
        {/* NAVBAR */}

        {/* MAIN */}
        <main>
          <div className="header-order-category">
            <h1 className="category-menu">Menu</h1>
            <i
              id="category-cart-icon"
              className="bx bx-cart"
              onClick={() => setIsCartOpen(true)}
            ></i>
          </div>
          <div className="header-hero">
            <h1>
              Welcome {loggedInAccount ? loggedInAccount.account_username : ''},
              to Cucina De Marquina!
            </h1>
            <h3>Please feel free to place your orders conveniently online.</h3>
          </div>
          <div className="category-order-container">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={index}
                  className="category-order-row"
                  onClick={() => filterProducts(category.name)}
                >
                  <img
                    src={category.url}
                    alt={category.name}
                    width={25}
                    height={25}
                  />
                  <p className="category-text-name">{category.name}</p>
                </div>
              ))
            ) : (
              <div className="category-order-row">No category found</div>
            )}
          </div>

          <div className="order-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index} className="product-row">
                  <div className="product-info">
                    <img
                      src={product.url}
                      alt="product"
                      width={100}
                      height={100}
                    />
                    <div className="info">
                      <h2 className="product-text-name">{product.name}</h2>
                      <h3 className="product-text-price">₱{product.price}</h3>
                      <div className="order-quantity-controls">
                        <button onClick={() => decrementQuantity(product.id)}>
                          {' '}
                          -{' '}
                        </button>
                        <span className="quantity">
                          {cartItems.find(item => item.id === product.id)
                            ?.quantity ?? 0}
                        </span>
                        <button
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          {' '}
                          +{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="add-cart-container"
                    onClick={() => addToCart(product)}
                  >
                    <button className="add-cart-btn">
                      <i className="bx bx-cart"></i>
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
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
      {isCartOpen && (
        <CartSidebar
          accounts={{
            accountEmail: loggedInAccount.account_email,
            accountNo: loggedInAccount.account_id,
            fullName:
              loggedInAccount.account_firstName +
              ' ' +
              loggedInAccount.account_lastName,
          }}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default Order;
