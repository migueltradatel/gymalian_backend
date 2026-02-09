import mongoose, { Schema, Document } from 'mongoose';
import { IExercise } from '../types';

const ExerciseSchema: Schema = new Schema({
    name: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    videoUrl: { type: String },
    techniqueDescription: { type: String },
    parameters: {
        rir: { type: Boolean, default: false },
        tempo: { type: Boolean, default: false },
        rest: { type: Boolean, default: false },
    },
}, { timestamps: true });

export default mongoose.model<IExercise & Document>('Exercise', ExerciseSchema);
