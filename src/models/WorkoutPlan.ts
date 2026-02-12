import mongoose, { Schema, Document } from 'mongoose';
import { IWorkoutPlan } from '../types';

const SessionSchema: Schema = new Schema({
    dayName: { type: String, required: true },
    exercises: [{
        exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
        targetSets: { type: Number, required: true },
        targetReps: { type: String, required: true },
        targetRPE: { type: Number },
        targetRIR: { type: Number },
        notes: { type: String },
    }]
});

const WorkoutPlanSchema: Schema = new Schema({
    coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    athleteId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    sessions: [SessionSchema],
}, { timestamps: true });

export default mongoose.model<IWorkoutPlan & Document>('WorkoutPlan', WorkoutPlanSchema);
