import express from 'express';
import {
    getDashboardStats,
    getAthleteDetails,
    getCoachPlans,
    getVolumeHistory,
    getCompletionRate
} from '../controllers/coachController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';
import { UserRole } from '../types';

const router = express.Router();

router.get('/stats', authenticate, authorizeRole([UserRole.COACH]), getDashboardStats);
router.get('/athlete/:athleteId/details', authenticate, authorizeRole([UserRole.COACH]), getAthleteDetails);
router.get('/plans', authenticate, authorizeRole([UserRole.COACH]), getCoachPlans);
router.get('/analytics/volume-history', authenticate, authorizeRole([UserRole.COACH]), getVolumeHistory);
router.get('/analytics/completion-rate', authenticate, authorizeRole([UserRole.COACH]), getCompletionRate);

export default router;
