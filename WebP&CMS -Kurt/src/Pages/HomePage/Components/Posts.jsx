import React from 'react';
import './PostsStyles.css';


// Import images
import bkImage from '../../../assets/bk.jpg';
import jollibeeImage from '../../../assets/jollibee.jpg'
import mcdoImage from '../../../assets/mcdo.jpg'

const Posts = () => {
  return (
    <section className="posts">
      <h2>Posts</h2>
      <p>Read our interesting topics.</p>
      <div className="posts-container">
        <div className="post">
        <img src={bkImage} alt="Product 1" />
        <span>June 1, 2024</span>
          <h3>Post Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus non nisl.</p>

        </div>
        <div className="post">
        <img src={mcdoImage} alt="Product 2" />
        <span>June 2, 2024</span>
          <h3>Post Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus non nisl.</p>

        </div>

      </div>
    </section>
  );
};

export default Posts;
