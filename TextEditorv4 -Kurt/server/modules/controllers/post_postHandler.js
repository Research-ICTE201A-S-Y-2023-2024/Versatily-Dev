import Post from '../models/postsModel.js';

export const saveContent = async (req, res) => {
  const { content } = req.body;

  try {
    await Post.create({
      post_title: 'Sample Title', // Use an appropriate title
      post_content: content,
      createdBy: 'admin', // Adjust this based on your needs
    });
    res.status(200).send('Content saved successfully');
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).send('Failed to save content');
  }
};

export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Failed to fetch posts');
  }
};
