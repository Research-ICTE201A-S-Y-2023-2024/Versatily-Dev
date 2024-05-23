import React from 'react';
import './ProductPageStyles.css';

// Import images
import bkImage from '../../assets/bk.jpg'
import jollibeeImage from '../../assets/jollibee.jpg'
import mcdoImage from '../../assets/mcdo.jpg'

const ProductsPage = () => {
  const handleProductClick = (productName) => {
    alert(`You clicked on ${productName}`);
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Products</h1>
      </header>
      <div className="featured-heading">
        <h2>Featured Products</h2>
      </div>
      <section className="featured-products">
        <div className="products-container">
          <div className="product" onClick={() => handleProductClick('Product 1')}>
            <img src={bkImage} alt="Product 1" />
            <h3>Product 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="product" onClick={() => handleProductClick('Product 2')}>
            <img src={jollibeeImage} alt="Product 2" />
            <h3>Product 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="product" onClick={() => handleProductClick('Product 3')}>
            <img src={mcdoImage} alt="Product 3" />
            <h3>Product 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>

      <section className="more-products">
        <h2>More Products</h2>
        <div className="products-container">
          <div className="product" onClick={() => handleProductClick('Product 4')}>
          <img src={bkImage} alt="Product 1" />
            <h3>Product name</h3>
            <span></span>
          </div>
          <div className="product" onClick={() => handleProductClick('Product 5')}>
          <img src={jollibeeImage} alt="Product 1" />
            <h3>Product name</h3>
          </div>
          <div className="product" onClick={() => handleProductClick('Product 6')}>
          <img src={mcdoImage} alt="Product 1" />
            <h3>Product name</h3>
            <span></span>
          </div>
          <div className="product" onClick={() => handleProductClick('Product 7')}>
          <img src={bkImage} alt="Product 1" />
            <h3>Product name</h3>
            <span></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
