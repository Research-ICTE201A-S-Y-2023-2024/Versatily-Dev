import React from "react";

import images from "../../../assets/ImagesExamples";

import SliderFunction from '../ImageSlider/SliderFunction';

import "./ImageSliderStyles.css";

export default function App() {
  return (
    <>
    <SliderFunction>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
    </SliderFunction>
   <div className="header-content">
        <h1>STI College Marikina</h1>
        <p>Student Exposition 2024</p>
      </div>
    </>
  );
}