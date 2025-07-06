import express from 'express';
import { AddTask , getMyTasks, updateTask , deleteTask, getTaskById } from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, AddTask);
router.get('/me', protect, getMyTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id',protect,updateTask);
router.delete('/:id',protect,deleteTask);


export default router;