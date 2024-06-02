import React from 'react';
import './PostsPageStyles.css';

// Example image (Placeholder)
import bliss from '../../assets/bliss.jpg';

function PostsPage() {
  const handleProductClick = (productName) => {
    alert(`You clicked on ${productName}`);
  };

  return (
    <div className="posts-page">
      <header className="posts-header">
        <h1>Posts</h1>
      </header>
      <section className="all-posts">
        <h2>All Posts</h2>
        <div className="posts-container">
          <div className="list-item-post" onClick={() => handleProductClick('Post 1')}>
            <div className="list-image-container">
              <img src={bliss} alt='Post 1' />
            </div>
            <div className="post-details">
              {/* Fetch createdBy of post_id */}
              <p className="post-date">June 1, 2024</p>
              
              <p className="post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut velit vulputate, porta erat ac, porta dolor...</p>
              <div className="post-footer">
                <a title="" href="" className="categoryFood">Food</a>
                <p className="post-author">by Jane Doe</p>
              </div>
            </div>
          </div>
          <div className="list-item-post" onClick={() => handleProductClick('Post 2')}>
            <div className="list-image-container">
              <img src={bliss} alt='Post 2' />
            </div>
            <div className="post-details">
              <p className="post-date">June 1, 2024</p>
              <p className="post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut velit vulputate, porta erat ac, porta dolor...</p>
              <div className="post-footer">
                <a title="" href="" className="categoryDrink">Drink</a>
                <p className="post-author">by Jane Doe</p>
              </div>
            </div>
          </div>
          <div className="list-item-post" onClick={() => handleProductClick('Post 3')}>
            <div className="list-image-container">
              <img src={bliss} alt='Post 3' />
            </div>
            <div className="post-details">
              <p className="post-date">June 1, 2024</p>
              <p className="post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut velit vulputate, porta erat ac, porta dolor...</p>
              <div className="post-footer">
                <a title="" href="" className="categoryFood">Food</a>
                <p className="post-author">by Jane Doe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostsPage;