import { Request, Response } from 'express';
import User from '../models/User';
import WorkoutPlan from '../models/WorkoutPlan';
import WorkoutLog from '../models/WorkoutLog';
import { UserRole } from '../types';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;

        const coach = await User.findById(userId);
        if (!coach || coach.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can view dashboard stats' });
        }

        // Get athlete codes
        const codes = coach.generatedCodes?.map(c => c.code) || [];

        // Count athletes
        const athleteCount = await User.countDocuments({
            role: UserRole.ATHLETE,
            redeemedCode: { $in: codes }
        });

        // Count active plans
        const planCount = await WorkoutPlan.countDocuments({
            coachId: userId
        });

        // Count today's completed workouts
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const completedTodayCount = await WorkoutLog.countDocuments({
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        // Get Recent Activity (limited to athlete belonging to this coach)
        const recentLogs = await WorkoutLog.find({
            // Filter by athletes of this coach
            athleteId: {
                $in: await User.find({ role: UserRole.ATHLETE, redeemedCode: { $in: codes } }).distinct('_id')
            }
        })
            .populate('athleteId', 'email')
            .populate('workoutPlanId', 'name')
            .sort({ date: -1 })
            .limit(5);

        res.json({
            athleteCount,
            planCount,
            completedTodayCount,
            recentActivity: recentLogs
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
};

export const getAthleteDetails = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const { athleteId } = req.params;

        const coach = await User.findById(userId);
        if (!coach || coach.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can view athlete details' });
        }

        // Verify athlete belongs to this coach
        const codes = coach.generatedCodes?.map(c => c.code) || [];
        const athlete = await User.findOne({
            _id: athleteId,
            role: UserRole.ATHLETE,
            redeemedCode: { $in: codes }
        });

        if (!athlete) {
            return res.status(404).json({ message: 'Athlete not found or not assigned to this coach' });
        }

        // Get plans assigned to this athlete
        const plans = await WorkoutPlan.find({
            athleteId: athleteId
        }).populate('sessions.exercises.exerciseId');

        // Get workout logs for this athlete
        const logs = await WorkoutLog.find({
            athleteId: athleteId
        }).populate('exercises.exerciseId').sort({ date: -1 });

        res.json({
            athlete: {
                _id: athlete._id,
                email: athlete.email
            },
            plans,
            logs
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching athlete details', error });
    }
};

export const getCoachPlans = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;

        const coach = await User.findById(userId);
        if (!coach || coach.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can view plans' });
        }

        const plans = await WorkoutPlan.find({
            coachId: userId
        }).populate('athleteId', 'email').populate('sessions.exercises.exerciseId');

        res.json(plans);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching plans', error });
    }
};

export const getVolumeHistory = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const coach = await User.findById(userId);
        if (!coach || coach.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can view analytics' });
        }

        const codes = coach.generatedCodes?.map(c => c.code) || [];
        const athleteIds = await User.find({ role: UserRole.ATHLETE, redeemedCode: { $in: codes } }).distinct('_id');

        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        fourteenDaysAgo.setHours(0, 0, 0, 0);

        const volumeHistory = await WorkoutLog.aggregate([
            {
                $match: {
                    athleteId: { $in: athleteIds },
                    date: { $gte: fourteenDaysAgo }
                }
            },
            // Fallback for older logs that might be missing totalVolume
            {
                $addFields: {
                    computedVolume: {
                        $reduce: {
                            input: "$exercises",
                            initialValue: 0,
                            in: {
                                $add: [
                                    "$$value",
                                    {
                                        $reduce: {
                                            input: "$$this.sets",
                                            initialValue: 0,
                                            in: { $add: ["$$value", { $multiply: [{ $ifNull: ["$$this.weight", 0] }, { $ifNull: ["$$this.reps", 0] }] }] }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalVolume: { $sum: { $cond: [{ $gt: ["$totalVolume", 0] }, "$totalVolume", "$computedVolume"] } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        console.log('Volume History Aggregated:', volumeHistory);
        res.json(volumeHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching volume history', error });
    }
};

export const getCompletionRate = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const coach = await User.findById(userId);
        if (!coach || coach.role !== UserRole.COACH) {
            return res.status(403).json({ message: 'Only coaches can view analytics' });
        }

        const codes = coach.generatedCodes?.map(c => c.code) || [];
        const athleteIds = await User.find({ role: UserRole.ATHLETE, redeemedCode: { $in: codes } }).distinct('_id');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const loggedToday = await WorkoutLog.find({
            athleteId: { $in: athleteIds },
            date: { $gte: today }
        }).distinct('athleteId');

        const rate = athleteIds.length > 0 ? (loggedToday.length / athleteIds.length) * 100 : 0;

        res.json({ rate });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching completion rate', error });
    }
};
