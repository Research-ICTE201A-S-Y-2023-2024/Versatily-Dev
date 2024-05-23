import React from 'react';
import './TestimonialStyles.css';

// Placeholder image
import blduserIcon from '../../../assets/circle-user-bold.png';
import userIcon from '../../../assets/circle-user.png';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <p>What our customers say.</p>
      <div className="testimonials-container">
        <div className="testimonial">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          <div className="testimonial-content">
            <h3>John Doe</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus non nisl.</p>
          </div>
        </div>
        <div className="testimonial">
          <img src={blduserIcon} alt="User Icon" className="user-icon" />
          <div className="testimonial-content">
            <h3>John Doe</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus non nisl.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
