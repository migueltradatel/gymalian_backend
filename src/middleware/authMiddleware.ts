import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

/**
 * Middleware para autenticar usuarios mediante un token JWT.
 * Verifica si el token es válido y adjunta la información del usuario a la solicitud.
 * 
 * @param {AuthRequest} req - Objeto de solicitud de Express, extendido para incluir datos del usuario.
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void}
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key') as { userId: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

/**
 * Middleware para autorizar el acceso basado en el rol del usuario.
 * Permite el acceso solo si el rol del usuario autenticado está incluido en la lista permitida.
 * 
 * @param {string[]} roles - Lista de roles permitidos para acceder a la ruta.
 * @returns {Function} Middleware de Express para validar el rol.
 */
export const authorizeRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};
