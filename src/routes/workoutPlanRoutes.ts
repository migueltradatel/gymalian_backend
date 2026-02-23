import express from 'express';
import { createWorkoutPlan, getWorkoutPlans, getWorkoutPlanById, updateWorkoutPlan, deleteWorkoutPlan } from '../controllers/workoutPlanController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

/**
 * Definición de las rutas para la gestión de planes de entrenamiento.
 * Permite a los entrenadores crear y editar planes, y a los atletas consultarlos.
 */
const router = express.Router();

router.post('/', authenticate, authorizeRole([UserRole.COACH]), createWorkoutPlan);
router.get('/', authenticate, getWorkoutPlans);
router.get('/:id', authenticate, getWorkoutPlanById);
router.put('/:id', authenticate, authorizeRole([UserRole.COACH]), updateWorkoutPlan);
router.delete('/:id', authenticate, authorizeRole([UserRole.COACH]), deleteWorkoutPlan);

export default router;
