import { Request, Response } from 'express';
import WorkoutLog from '../models/WorkoutLog';
import User from '../models/User';
import Notification from '../models/Notification';
import { UserRole } from '../types';

export const createWorkoutLog = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const athleteId = req.user.userId;
        const { date, workoutPlanId, exercises, notes } = req.body;

        const athlete = await User.findById(athleteId);
        if (!athlete) return res.status(404).json({ message: 'Athlete not found' });

        let totalVolume = 0;
        exercises.forEach((ex: any) => {
            ex.sets.forEach((set: any) => {
                totalVolume += (Number(set.weight) * Number(set.reps));
            });
        });

        // Comparison logic
        let feedbackColor = 'YELLOW';
        const previousLog = await WorkoutLog.findOne({
            athleteId,
            workoutPlanId
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

        // Trigger Notification for Coach
        if (athlete.redeemedCode) {
            const coach = await User.findOne({
                role: UserRole.COACH,
                'generatedCodes.code': athlete.redeemedCode
            });

            if (coach) {
                await Notification.create({
                    userId: (coach as any)._id,
                    type: 'WORKOUT_COMPLETE',
                    message: `Athlete ${athlete.email} completed a workout! Volume: ${totalVolume}kg.`,
                });
            }
        }

        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ message: 'Error creating workout log', error });
    }
};

export const getWorkoutLogs = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const athleteId = req.user.userId;
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
