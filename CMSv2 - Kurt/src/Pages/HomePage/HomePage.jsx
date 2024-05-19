import React from 'react';
import './HomePageStyles.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="featured-products-section">
        <h2>Featured Products</h2>
        <div className="featured-products">
          <div className="product large">Product 1</div>
          <div className="product">Product 2</div>
          <div className="product">Product 3</div>
        </div>
        <div className="browse-articles">
          <h3>Browse Articles</h3>
          <div className="article">
            <h4>Article 1</h4>
            <p>Some description about Article 1.</p>
            <span>20 mins ago</span>
          </div>
          <div className="article">
            <h4>Article 2</h4>
            <p>Some description about Article 2.</p>
            <span>1 hr ago</span>
          </div>
          <div className="article">
            <h4>Article 3</h4>
            <p>Some description about Article 3.</p>
            <span>2 hrs ago</span>
          </div>
          <button className="see-all">See all</button>
        </div>
      </section>
      <section className="blogs-section">
        <h2>Blogs</h2>
        <div className="blogs">
          <div className="blog">
            <h4>Blog Title</h4>
            <p>Some description about the blog.</p>
            <button>Read</button>
          </div>
          <div className="blog">
            <h4>Blog Title</h4>
            <p>Some description about the blog.</p>
            <button>Read</button>
          </div>
          <div className="blog">
            <h4>Blog Title</h4>
            <p>Some description about the blog.</p>
            <button>Read</button>
          </div>
        </div>
      </section>
      <section className="testimonial-section">
        <h2>Testimonial</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>John Doe</p>
            <p>Some testimonial text.</p>
          </div>
          <div className="testimonial">
            <p>Jane Doe</p>
            <p>Some testimonial text.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
