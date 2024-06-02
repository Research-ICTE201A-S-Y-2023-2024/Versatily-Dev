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
      <section className="most-viewed-heading">
        <h2>What's Trending</h2>
        <div className="trending-posts-container">
          <div className="large-post" onClick={() => handleProductClick('Post 1')} tabIndex="0" role="button" aria-label="Post 1">
            <div className="image-container">
              <img src={bliss} alt='Post 1' />
            </div>
            <div className="post-details">
              {/* Date of creation of the post */}
              <p className="post-date">June 1, 2024</p>
              {/* Short some description of the text */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut velit vulputate, porta erat ac, porta dolor...</p>
              {/* Fetch the author of the post */}
              <p className="post-author">by Jane Doe</p>
            </div>
            <div className="tags">
              {/* Tag of the post */}
            <a title="" href="" className="categoryFood">Food</a>
            </div>
          </div>
          {/* small posts containers accomodate other posts (in our case it only 1 at the moment so this is useless since there are only ) */}
          <div className="small-posts">
            <div className="small-post" onClick={() => handleProductClick('Post 2')} tabIndex="0" role="button" aria-label="Post 2">
              <div className="image-container">
                <img src={bliss} alt='Post 2' />
              </div>
              <div className="post-details">
                <p className="post-date">June 1, 2024</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut velit vulputate, porta erat ac, porta dolor...</p>
                <p className="post-author">by Jane Doe</p>
              </div>
              <div className="tags">
              <a title="" href="" className="categoryDrink">Drink</a>
              </div>
            </div>
            <div className="small-post" onClick={() => handleProductClick('Post 3')} tabIndex="0" role="button" aria-label="Post 3">
              <div className="image-container">
                <img src={bliss} alt='Post 3' />
              </div>
              <div className="post-details">
                <p className="post-date">June 1, 2024</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut velit vulputate, porta erat ac, porta dolor...</p>
                <p className="post-author">by Jane Doe</p>
              </div>
              <div className="tags">
              <a title="" href="" className="categoryFood">Food</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="all-posts">
        <h2>All Posts</h2>
        <div className="posts-container">
          <div className="list-item-post" onClick={() => handleProductClick('Post 1')}>
            <div className="list-image-container">
              <img src={bliss} alt='Post 1' />
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