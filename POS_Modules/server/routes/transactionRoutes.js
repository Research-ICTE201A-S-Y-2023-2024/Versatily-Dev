import express from 'express';
import {getAllTransaction, getTableTransactionsItems} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getAllTransaction);
router.get('/:transactionId', getTableTransactionsItems);

export default router;