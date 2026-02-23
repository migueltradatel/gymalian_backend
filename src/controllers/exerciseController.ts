import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

/**
 * Crea un nuevo ejercicio en la base de datos.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene los detalles del ejercicio en el cuerpo.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const createExercise = async (req: Request, res: Response) => {
    try {
        const exercise = new Exercise(req.body);
        await exercise.save();
        res.status(201).json(exercise);
    } catch (error) {
        res.status(400).json({ message: 'Error creating exercise', error });
    }
};

/**
 * Obtiene todos los ejercicios disponibles de la base de datos.
 * 
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exercises', error });
    }
};

/**
 * Obtiene un solo ejercicio por su ID único.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID del ejercicio en los parámetros.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getExerciseById = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exercise', error });
    }
};

/**
 * Actualiza un ejercicio existente por su ID único.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID del ejercicio en los parámetros y las actualizaciones en el cuerpo.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const updateExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        res.status(400).json({ message: 'Error updating exercise', error });
    }
};

/**
 * Elimina un ejercicio de la base de datos por su ID único.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID del ejercicio en los parámetros.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json({ message: 'Exercise deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exercise', error });
    }
};
