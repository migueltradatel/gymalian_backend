import mongoose, { Schema, Document } from 'mongoose';
import { IWorkoutPlan } from '../types';

/**
 * Esquema secundario que define una sesión de entrenamiento dentro de un plan.
 */
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

/**
 * Esquema de Mongoose para el modelo de Plan de Entrenamiento.
 * Define la programación de sesiones y ejercicios creada por un entrenador para un atleta.
 */
const WorkoutPlanSchema: Schema = new Schema({
    coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    athleteId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    sessions: [SessionSchema],
}, { timestamps: true });

export default mongoose.model<IWorkoutPlan & Document>('WorkoutPlan', WorkoutPlanSchema);
