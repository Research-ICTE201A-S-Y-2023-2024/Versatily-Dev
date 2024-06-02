import Post from '../models/postsModel.js';

export const fetchPostById = async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Failed to fetch post');
    }
  };

  export default fetchPostById;