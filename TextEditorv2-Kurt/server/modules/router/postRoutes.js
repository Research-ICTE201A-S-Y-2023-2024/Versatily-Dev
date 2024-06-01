import express from 'express';
import { saveContent } from '../controllers/post_postHandler.js';

const router = express.Router();

// Define the route for saving content
router.post('/save-content', saveContent);

export default router;