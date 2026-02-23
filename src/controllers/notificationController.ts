import { Request, Response } from 'express';
import Notification from '../models/Notification';

/**
 * Obtiene las últimas notificaciones para el usuario autenticado.
 * Devuelve hasta 20 notificaciones ordenadas por fecha de creación (las más nuevas primero).
 * 
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getNotifications = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(20);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

/**
 * Marca una notificación específica como leída por su ID único.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID de la notificación en los parámetros.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const markAsRead = async (req: Request, res: Response) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};

/**
 * Marca todas las notificaciones no leídas para el usuario autenticado como leídas.
 * 
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const markAllAsRead = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        await Notification.updateMany({ userId, read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notifications', error });
    }
};
