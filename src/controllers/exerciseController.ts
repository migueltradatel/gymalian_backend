import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exercise = new Exercise(req.body);
        await exercise.save();
        res.status(201).json(exercise);
    } catch (error) {
        res.status(400).json({ message: 'Error creating exercise', error });
    }
};

export const getExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exercises', error });
    }
};

export const getExerciseById = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exercise', error });
    }
};

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        res.status(400).json({ message: 'Error updating exercise', error });
    }
};

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json({ message: 'Exercise deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exercise', error });
    }
};
