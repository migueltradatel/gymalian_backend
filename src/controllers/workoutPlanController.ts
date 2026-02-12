import { Request, Response } from 'express';
import WorkoutPlan from '../models/WorkoutPlan';
import { UserRole } from '../types';

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

export const getWorkoutPlanById = async (req: Request, res: Response) => {
    try {
        const plan = await WorkoutPlan.findById(req.params.id).populate('sessions.exercises.exerciseId');
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plan', error });
    }
};

export const updateWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const plan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(400).json({ message: 'Error updating plan', error });
    }
};

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const plan = await WorkoutPlan.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plan', error });
    }
};
