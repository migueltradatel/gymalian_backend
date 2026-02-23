import { Request, Response } from 'express';
import WorkoutPlan from '../models/WorkoutPlan';
import { UserRole } from '../types';

/**
 * Crea un nuevo plan de entrenamiento para un atleta.
 * Diseñado para ser llamado por un entrenador.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene nombre, athleteId y sesiones en el cuerpo.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const createWorkoutPlan = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const coachId = req.user.userId;
        const { name, athleteId, sessions } = req.body;

        const workoutPlan = new WorkoutPlan({
            coachId,
            athleteId,
            name,
            sessions
        });

        await workoutPlan.save();
        res.status(201).json(workoutPlan);
    } catch (error) {
        res.status(400).json({ message: 'Error creating workout plan', error });
    }
};

/**
 * Obtiene todos los planes de entrenamiento asociados con el usuario autenticado.
 * Si el usuario es un entrenador, devuelve los planes que creó.
 * Si el usuario es un atleta, devuelve los planes asignados a él.
 * 
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getWorkoutPlans = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const { userId, role } = req.user;
        let query = {};

        if (role === UserRole.COACH) {
            query = { coachId: userId };
        } else {
            query = { athleteId: userId };
        }

        const plans = await WorkoutPlan.find(query).populate('athleteId', 'email').populate('sessions.exercises.exerciseId');
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workout plans', error });
    }
};

import WorkoutLog from '../models/WorkoutLog';

/**
 * Obtiene un solo plan de entrenamiento por su ID único.
 * Enriquece los ejercicios del plan con los datos del último rendimiento (peso, repeticiones, rpe)
 * registrados por el atleta para esos ejercicios específicos.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID del plan en los parámetros.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getWorkoutPlanById = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const currentUserId = (req as any).user.userId;
        const plan = await WorkoutPlan.findById(req.params.id).populate('sessions.exercises.exerciseId');
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        const planObj = plan.toObject();
        // Use the athlete associated with the plan if it's an athlete's plan, otherwise the current user
        const targetAthleteId = plan.athleteId || currentUserId;

        for (const session of planObj.sessions) {
            for (const ex of session.exercises) {
                if (!ex.exerciseId) continue;

                // ex.exerciseId could be populated (object) or not (ID)
                const exerciseId = (ex.exerciseId as any)._id || ex.exerciseId;

                const lastLog = await WorkoutLog.findOne({
                    athleteId: targetAthleteId,
                    exercises: {
                        $elemMatch: {
                            exerciseId: exerciseId,
                            sets: { $not: { $size: 0 } }
                        }
                    }
                }).sort({ date: -1 });

                if (lastLog) {
                    const exLog = lastLog.exercises.find((e: any) => e.exerciseId.toString() === exerciseId.toString());
                    if (exLog) {
                        const volume = exLog.sets.reduce((sum: number, s: any) => sum + (Number(s.weight || 0) * Number(s.reps || 0)), 0);
                        ex.lastPerformance = {
                            weight: exLog.sets.map((s: any) => s.weight).join('-'),
                            reps: exLog.sets.map((s: any) => s.reps).join('-'),
                            rpe: exLog.sets.map((s: any) => s.rpe || '-').join('-'),
                            setsCount: exLog.sets.length,
                            volume: volume
                        };
                    }
                }
            }
        }

        res.json(planObj);
    } catch (error) {
        console.error('Error fetching plan with history:', error);
        res.status(500).json({ message: 'Error fetching plan', error });
    }
};

/**
 * Actualiza un plan de entrenamiento existente por su ID único.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID del plan en los parámetros y las actualizaciones en el cuerpo.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const updateWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const plan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(400).json({ message: 'Error updating plan', error });
    }
};

/**
 * Elimina un plan de entrenamiento de la base de datos por su ID único.
 * 
 * @param {Request} req - Objeto de solicitud de Express que contiene el ID del plan en los parámetros.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const deleteWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const plan = await WorkoutPlan.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plan', error });
    }
};
