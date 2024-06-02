import React, { useEffect, useState } from 'react';
import './PostsPageStyles.css';

// Example image (Placeholder)
import bliss from '../../assets/bliss.jpg';

function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/fetch-posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postTitle) => {
    alert(`You clicked on ${postTitle}`);
  };

  const extractContent = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelector('h1')?.remove();
    return tmp.innerHTML;
  };

  return (
    <div className="posts-page">
      <header className="posts-header">
        <h1>Posts</h1>
      </header>
      <section className="all-posts">
        <h2>All Posts</h2>
        <div className="posts-container">
          {/* Render posts dynamically */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="list-item-post"
              onClick={() => handlePostClick(post.post_title)}
            >
              <div className="list-image-container">
                <img src={bliss} alt={post.post_title} />
              </div>
              <div className="post-details">
                <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                <h2>{post.post_title}</h2>
                {/* Render post content safely */}
                <p className="post-description"
                   dangerouslySetInnerHTML={{
                     __html: extractContent(post.post_content).split(' ').slice(0, 17).join(' ') + '...'
                   }}>
                </p>
                <div className="post-footer">
                  <a title={post.post_tag} href="" className="categoryFood">
                    {post.post_tag}
                  </a>
                  <p className="post-author">by {post.createdBy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostsPage;
