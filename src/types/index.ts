export enum UserRole {
    COACH = 'COACH',
    ATHLETE = 'ATHLETE'
}

export interface IUser {
    _id?: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    accessCode?: string; // Deprecated in favor of specific fields below
    generatedCodes?: { code: string; duration: string; validUntil: Date }[]; // For Coach
    redeemedCode?: string; // For Athlete
    subscriptionExpiry?: Date; // For Athlete
    subscriptionStatus?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IExercise {
    _id?: string;
    name: string;
    muscleGroup: string;
    videoUrl?: string;
    techniqueDescription?: string;
    parameters: {
        rir: boolean;
        tempo: boolean;
        rest: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface ISet {
    weight: number;
    reps: number;
    rir?: number;
    tempo?: string;
    rest?: number;
    completed: boolean;
}

export interface IWorkoutSession {
    dayName: string; // e.g., "Monday" or "Push Day"
    exercises: {
        exerciseId: string | IExercise; // Populated or ID
        targetSets: number;
        targetReps: string; // e.g. "8-12"
        targetRPE?: number;
        notes?: string;
    }[];
}

export interface IWorkoutPlan {
    _id?: string;
    coachId: string | IUser;
    athleteId?: string | IUser;
    name: string;
    sessions: IWorkoutSession[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ISetLog {
    setNumber: number;
    weight: number;
    reps: number;
    rpe?: number;
}

export interface IExerciseLog {
    exerciseId: string | IExercise;
    sets: ISetLog[];
}

export interface IWorkoutLog {
    _id?: string;
    athleteId: string | IUser;
    date: Date;
    workoutPlanId?: string | IWorkoutPlan; // Optional link to the plan
    exercises: IExerciseLog[];
    totalVolume: number; // Tonnage
    notes?: string; // Optimizad for LLM
    feedbackColor: 'GREEN' | 'YELLOW' | 'RED';
    createdAt: Date;
    updatedAt: Date;
}
