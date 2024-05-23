import React from 'react';

// Components
import ImageSliderContainer from './ImageSlider/ImageSliderContainer';
import FeaturedProducts from './Components/FeaturedProducts';
import Posts from './Components/Posts';
import Testimonials from './Components/Testimonials';

const HomePage = () => {
  return (
      <>
      {/* Function for Sliding Image */}
      <ImageSliderContainer />
      
    <div className="home-page">
      {/* Featured Products Component */}
      <FeaturedProducts />

      {/* Posts Component */}
      <Posts />

      {/* Testimonials Component */}
      <Testimonials />

    </div>
    </>
  );
};

export default HomePage;
