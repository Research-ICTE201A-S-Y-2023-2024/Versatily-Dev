import {
    getAllCategory,
    saveCategory
} from '../controllers/CategoryController.js';
import express from 'express';

const router = express.Router();

router.get('/', getAllCategory);
router.post('/', saveCategory);

export default router;