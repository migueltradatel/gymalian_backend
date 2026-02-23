import express from 'express';
import { register, login, generateCode, getAthletes } from '../controllers/authController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

/**
 * Definición de las rutas de autenticación.
 * Gestiona el registro, inicio de sesión, generación de códigos y obtención de atletas.
 */
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/generate-code', authenticate, authorizeRole([UserRole.COACH]), generateCode);
router.get('/athletes', authenticate, authorizeRole([UserRole.COACH]), getAthletes);

export default router;
