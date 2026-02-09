import express from 'express';
import { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/exerciseController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

// Publicly readable or Authenticated? authenticated seems better.
router.get('/', authenticate, getExercises);
router.get('/:id', authenticate, getExerciseById);

// Only Coach can manage content
router.post('/', authenticate, authorizeRole([UserRole.COACH]), createExercise);
router.put('/:id', authenticate, authorizeRole([UserRole.COACH]), updateExercise);
router.delete('/:id', authenticate, authorizeRole([UserRole.COACH]), deleteExercise);

export default router;
