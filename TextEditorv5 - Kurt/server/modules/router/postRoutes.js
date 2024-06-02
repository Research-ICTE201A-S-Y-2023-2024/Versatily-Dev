import express from 'express';
import { saveContent, fetchPosts} from '../controllers/post_postHandler.js';
import fetchPostById from '../controllers/post_postFetch.js';

const router = express.Router();

// Define the route for saving content
router.post('/save-content', saveContent);

// Define the route for fetching posts
router.get('/fetch-posts', fetchPosts);

// Define the route for fetching posts to view
router.post('/fetch-post/:id', fetchPostById);

export default router;
