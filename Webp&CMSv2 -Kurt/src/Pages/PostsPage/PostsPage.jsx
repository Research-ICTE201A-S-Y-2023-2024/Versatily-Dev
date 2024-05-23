import React from 'react';
import './PostsPageStyles.css';

// Import images
import bkImage from '../../assets/bk.jpg';
import jollibeeImage from '../../assets/jollibee.jpg';
import mcdoImage from '../../assets/mcdo.jpg';

const ProductsPage = () => {
  const handleProductClick = (productName) => {
    alert(`You clicked on ${productName}`);
  };

  return (
    <div className="products-page">
      <header className="posts-header">
        <h1>Posts</h1>
      </header>
      <div className="featured-heading">
        <h2>Trending Posts</h2>
      </div>
      <section className="trending-posts">
        <div className="posts-container">
          <div className="post" onClick={() => handleProductClick('Product 1')}>
            <div className="image-container">
              <img src={bkImage} alt="Post 1" />
            </div>
            <h3>Post 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="post" onClick={() => handleProductClick('Product 2')}>
            <div className="image-container">
              <img src={jollibeeImage} alt="Post 2" />
            </div>
            <h3>Post 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="post" onClick={() => handleProductClick('Product 3')}>
            <div className="image-container">
              <img src={mcdoImage} alt="Post 3" />
            </div>
            <h3>Post 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>

      <section className="more-posts">
        <h2>More Posts</h2>
        <div className="posts-container">
          <div className="post" onClick={() => handleProductClick('Product 4')}>
            <div className="image-container">
              <img src={bkImage} alt="Post 4" />
            </div>
            <h3>Post 4</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="post" onClick={() => handleProductClick('Product 5')}>
            <div className="image-container">
              <img src={jollibeeImage} alt="Post 5" />
            </div>
            <h3>Post 5</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="post" onClick={() => handleProductClick('Product 6')}>
            <div className="image-container">
              <img src={mcdoImage} alt="Post 6" />
            </div>
            <h3>Post 6</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="post" onClick={() => handleProductClick('Product 7')}>
            <div className="image-container">
              <img src={bkImage} alt="Post 7" />
            </div>
            <h3>Post 7</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
