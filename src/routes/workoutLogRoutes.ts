import express from 'express';
import { createWorkoutLog, getWorkoutLogs, getWorkoutLogById } from '../controllers/workoutLogController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, createWorkoutLog);
router.get('/', authenticate, getWorkoutLogs);
router.get('/:id', authenticate, getWorkoutLogById);

export default router;
