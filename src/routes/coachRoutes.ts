import express from 'express';
import { getDashboardStats, getAthleteDetails, getCoachPlans } from '../controllers/coachController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

router.get('/stats', authenticate, authorizeRole([UserRole.COACH]), getDashboardStats);
router.get('/athlete/:athleteId/details', authenticate, authorizeRole([UserRole.COACH]), getAthleteDetails);
router.get('/plans', authenticate, authorizeRole([UserRole.COACH]), getCoachPlans);

export default router;
