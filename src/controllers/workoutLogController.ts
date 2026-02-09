import { Request, Response } from 'express';
import WorkoutLog from '../models/WorkoutLog';

export const createWorkoutLog = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const athleteId = req.user.userId;
        const { date, workoutPlanId, exercises, notes } = req.body;

        let totalVolume = 0;
        exercises.forEach((ex: any) => {
            ex.sets.forEach((set: any) => {
                totalVolume += (set.weight * set.reps);
            });
        });

        // Comparison logic
        let feedbackColor = 'YELLOW';
        const previousLog = await WorkoutLog.findOne({
            athleteId,
            workoutPlanId // Compare against same plan execution if possible
        }).sort({ date: -1 });

        if (previousLog) {
            if (totalVolume > previousLog.totalVolume) {
                feedbackColor = 'GREEN';
            } else if (totalVolume < previousLog.totalVolume) {
                feedbackColor = 'RED';
            }
        }

        const log = new WorkoutLog({
            athleteId,
            date,
            workoutPlanId,
            exercises,
            totalVolume,
            notes,
            feedbackColor
        });

        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ message: 'Error creating workout log', error });
    }
};

export const getWorkoutLogs = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const athleteId = req.user.userId;
        // can add filtering by date range
        const logs = await WorkoutLog.find({ athleteId }).sort({ date: -1 }).populate('exercises.exerciseId');
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};

export const getWorkoutLogById = async (req: Request, res: Response) => {
    try {
        const log = await WorkoutLog.findById(req.params.id).populate('exercises.exerciseId');
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.json(log);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching log', error });
    }
};
