import "./Order.css";
import profileImage from "../../assets/img/profile.jpg";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CartSidebar from "../../components/CartSideBar/CartSideBar.jsx";

const Order = () => {
  useEffect(() => {
    document.title = "Ordering";
  }, []);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterProducts = (category) => {
    const filtered = products.filter(
      (product) =>
        product.category === category &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products");
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories");
    }
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
      toast.error(
        "This product is currently disabled and cannot be added to the cart.",
        toastConfig
      );
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [
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
    const productIndex = cartItems.findIndex((item) => item.id === productID);
    if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[productIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    }
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
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src={profileImage} />
          </a>
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
                          {" "}
                          -{" "}
                        </button>
                        <span className="quantity">
                          {cartItems.find((item) => item.id === product.id)
                            ?.quantity ?? 0}
                        </span>
                        <button
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          {" "}
                          +{" "}
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
