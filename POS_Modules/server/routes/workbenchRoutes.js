import express from 'express';
import {
    getAllWorkbench,
    getWorkbenchById,
    saveWorkbench,
    updateWorkbench,
    deleteWorkbench
} from '../controllers/WorkbenchControllers.js';

const router = express.Router();

router.get('/', getAllWorkbench);
router.get('/:id', getWorkbenchById);
router.post('/', saveWorkbench);
router.patch('/:id', updateWorkbench);
router.delete('/:id', deleteWorkbench);


export default router;