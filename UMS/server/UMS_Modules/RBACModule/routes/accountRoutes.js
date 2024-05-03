import express from 'express';
import { registerAccount } from '../../AuthModule/controllers/authRegisController.js';
import { loginAccount } from '../../AuthModule/controllers/authLoginController.js';

const router = express.Router();

// Route to register a new account
router.post('/register', registerAccount);
router.post('/login', loginAccount);

export default router;