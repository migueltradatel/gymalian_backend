import express from 'express';
import { register, login, generateCode } from '../controllers/authController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/generate-code', authenticate, authorizeRole([UserRole.COACH]), generateCode);

export default router;
