import express from 'express';
import { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/exerciseController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

/**
 * Definición de las rutas para la gestión de ejercicios.
 * Permite a los usuarios autenticados consultar ejercicios y a los entrenadores gestionarlos (CRUD).
 */
const router = express.Router();

// Publicly readable or Authenticated? authenticated seems better.
router.get('/', authenticate, getExercises);
router.get('/:id', authenticate, getExerciseById);

// Only Coach can manage content
router.post('/', authenticate, authorizeRole([UserRole.COACH]), createExercise);
router.put('/:id', authenticate, authorizeRole([UserRole.COACH]), updateExercise);
router.delete('/:id', authenticate, authorizeRole([UserRole.COACH]), deleteExercise);

export default router;
