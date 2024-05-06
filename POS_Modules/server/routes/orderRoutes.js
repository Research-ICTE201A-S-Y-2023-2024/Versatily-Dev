import express from 'express';
import {getAllOrders, saveTransactionAndItems} from '../controllers/orderController.js';
const router = express.Router();

// Route to get all orders
router.get('/', getAllOrders);

// Route to create new order with transaction and items
router.post('/', saveTransactionAndItems);

export default router;