import express from 'express';
import {
    getAllWorkbench,
    saveWorkbench,
    updateWorkbench,
    deleteWorkbench
} from '../controllers/WorkbenchControllers.js';

const router = express.Router();

router.get('/', getAllWorkbench);
router.post('/', saveWorkbench);
router.patch('/:id', updateWorkbench);
router.delete('/:id', deleteWorkbench);


export default router;