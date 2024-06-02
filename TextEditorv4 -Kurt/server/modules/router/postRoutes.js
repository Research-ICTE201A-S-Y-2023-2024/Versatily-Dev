import express from 'express';
import { saveContent, fetchPosts} from '../controllers/post_postHandler.js';

const router = express.Router();

// Define the route for saving content
router.post('/save-content', saveContent);

// Define the route for fetching posts
router.get('/fetch-posts', fetchPosts);

export default router;
