import express from 'express';
import { createWorkoutLog, getWorkoutLogs, getWorkoutLogById } from '../controllers/workoutLogController';
import { authenticate } from '../middleware/authMiddleware';

/**
 * Definición de las rutas para el registro de entrenamientos completados.
 * Permite a los atletas registrar sus sesiones y consultar sus históricos.
 */
const router = express.Router();

router.post('/', authenticate, createWorkoutLog);
router.get('/', authenticate, getWorkoutLogs);
router.get('/:id', authenticate, getWorkoutLogById);

export default router;
