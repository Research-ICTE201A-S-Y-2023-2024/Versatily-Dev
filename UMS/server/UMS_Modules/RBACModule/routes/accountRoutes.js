import express from 'express';
import { registerAccount } from '../controllers/authRegisController.js';

const router = express.Router();

// Route to register a new account
router.post('/register', registerAccount);

export default router;