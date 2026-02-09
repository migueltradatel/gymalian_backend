import express from 'express';
import { createWorkoutPlan, getWorkoutPlans, getWorkoutPlanById } from '../controllers/workoutPlanController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

router.post('/', authenticate, authorizeRole([UserRole.COACH]), createWorkoutPlan);
router.get('/', authenticate, getWorkoutPlans);
router.get('/:id', authenticate, getWorkoutPlanById);

export default router;
