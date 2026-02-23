import mongoose, { Schema, Document } from 'mongoose';
import { IWorkoutLog } from '../types';

/**
 * Esquema secundario para registrar los datos de un ejercicio dentro de una sesión completada.
 */
const ExerciseLogSchema: Schema = new Schema({
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: [{
        setNumber: { type: Number, required: true },
        weight: { type: Number, required: true },
        reps: { type: Number, required: true },
        rpe: { type: Number },
        rir: { type: Number },
    }]
});

/**
 * Esquema de Mongoose para el modelo de Registro de Entrenamiento (Workout Log).
 * Almacena los resultados reales de una sesión realizada por un atleta.
 */
const WorkoutLogSchema: Schema = new Schema({
    athleteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    workoutPlanId: { type: Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    exercises: [ExerciseLogSchema],
    totalVolume: { type: Number, default: 0 },
    notes: { type: String }, // Optimized for LLM processing
    feedbackColor: { type: String, enum: ['GREEN', 'YELLOW', 'RED'], default: 'YELLOW' },
}, { timestamps: true });

// Pre-save hook to calculate total volume could go here, or in service layer.

export default mongoose.model<IWorkoutLog & Document>('WorkoutLog', WorkoutLogSchema);
