import express from 'express';
import {getAllTransaction} from '../controllers/transactionController.js';
import {savePayment} from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', getAllTransaction);
router.patch('/:id', savePayment);

export default router;