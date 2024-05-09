import React from 'react';
import './HomePageStyles.css'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const Home = () => {
  return (
    <>
      <div className="image-container">
        <h1>STI College Marikina</h1>
        <h2>WELCOME TO THE STUDENTS' EXPO!</h2>
      </div>
      <div className="product-container">
        {/* Parent Container for left side of layout */}
        <div className="container-left">
          {/* Child elements of left container */}
          <h1 className="mainheading">Featured Products</h1>
          <div className="cont product-row"></div>
          <div className="cont bottomproducts-row">
            <div className="cont-left left"></div>
            <div className="cont-left mid"></div>
          </div>
        </div>
        {/* Container for right side of layout */}
        <div className="container-right">
          {/* Parent elements of left container */}
          <div className="cont cont-top"></div>
        </div>
      </div>
    </>
  );
}

export default Home;

