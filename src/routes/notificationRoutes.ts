import express from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController';
import { authenticate } from '../middleware/authMiddleware';

/**
 * Definición de las rutas para la gestión de notificaciones del usuario.
 * Permite consultar notificaciones y marcarlas como leídas.
 */
const router = express.Router();

router.get('/', authenticate, getNotifications);
router.put('/:id/read', authenticate, markAsRead);
router.put('/read-all', authenticate, markAllAsRead);

export default router;
