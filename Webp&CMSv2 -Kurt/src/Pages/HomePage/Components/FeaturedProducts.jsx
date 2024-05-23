import React from 'react';
import './FeaturedProductsStyles.css';

// Import images
import bkImage from '../../../assets/bk.jpg';
import mcdoImage from '../../../assets/mcdo.jpg'
import jolebeImage from '../../../assets/jollibee.jpg'

const FeaturedProducts = () => {
  const handleProductClick = (productName) => {
    alert(`You clicked on ${productName}`);
  };

  return (
    <section className="heading-products">
      <h2>Featured Products</h2>
      <p>Cucina De Marquina's popular products.</p>
      <div className="heading-products-container">
        <section className="section-featured-products">
          <div className="products-container">
            <div className="heading-product" onClick={() => handleProductClick('Product 1')}>
              <img src={bkImage} alt="Product 1" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FeaturedProducts;
