import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserRole } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

/**
 * Registra un nuevo usuario en el sistema.
 * 
 * Gestiona el registro de atletas y entrenadores, validando códigos de acceso
 * para los atletas y cifrando las contraseñas.
 * 
 * @param req - Objeto de solicitud de Express que contiene email, password, role y código opcional.
 * @param res - Objeto de respuesta de Express.
 */
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role, code } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        let newUser;

        if (role === UserRole.ATHLETE) {
            if (!code) {
                return res.status(400).json({ message: 'Access code required for Athletes' });
            }

            // Find coach with this code
            const coach = await User.findOne({
                'generatedCodes': {
                    $elemMatch: {
                        code: code,
                        validUntil: { $gte: new Date() }
                    }
                }
            });

            if (!coach) {
                return res.status(400).json({ message: 'Invalid or expired access code' });
            }

            const matchedCode = coach.generatedCodes?.find(c => c.code === code);
            // Logic to calculate subscription expiry based on matchedCode.duration...
            // For MVP assuming duration is just a string description, or we enforce logic.
            // Let's assume duration is days for simplicity if we parse it, otherwise default 30 days.

            const now = new Date();
            const expiry = new Date(now.setDate(now.getDate() + 30)); // Default 30 days for now

            newUser = new User({
                email,
                passwordHash,
                role,
                redeemedCode: code,
                subscriptionExpiry: expiry
            });

        } else {
            // Coach
            newUser = new User({
                email,
                passwordHash,
                role
            });
        }

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, role: newUser.role, userId: newUser._id });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

/**
 * Inicia sesión de un usuario existente.
 * 
 * Valida las credenciales (email y contraseña) y devuelve un token JWT
 * si la autenticación es exitosa.
 * 
 * @param req - Objeto de solicitud de Express con las credenciales.
 * @param res - Objeto de respuesta de Express.
 */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role, userId: user._id });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Only for coaches
/**
 * Genera un nuevo código de acceso para atletas.
 * 
 * Esta acción solo puede ser realizada por usuarios con rol de ENTRENADOR.
 * 
 * @param req - Objeto de solicitud de Express con el código y su duración.
 * @param res - Objeto de respuesta de Express.
 */
export const generateCode = async (req: Request, res: Response) => {
    // Expects req.user from middleware
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { code, duration } = req.body; // duration in days

        const user = await User.findById(userId);
        if (!user || user.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can generate codes' });
        }

        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + (parseInt(duration) || 30));

        user.generatedCodes = user.generatedCodes || [];
        user.generatedCodes.push({ code, duration: duration.toString(), validUntil });

        await user.save();
        res.json({ message: 'Code generated', codeObject: { code, duration, validUntil } });

    } catch (error) {
        res.status(500).json({ message: 'Error generating code', error });
    }
}

/**
 * Obtiene la lista de atletas asociados a un entrenador.
 * 
 * Devuelve los atletas que han canjeado códigos generados por el entrenador solicitante.
 * 
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 */
export const getAthletes = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;

        const coach = await User.findById(userId);
        if (!coach || coach.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can view athletes' });
        }

        const codes = coach.generatedCodes?.map(c => c.code) || [];

        const athletes = await User.find({
            role: UserRole.ATHLETE,
            redeemedCode: { $in: codes }
        }).select('email role redeemedCode subscriptionExpiry');

        res.json(athletes);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching athletes', error });
    }
};
