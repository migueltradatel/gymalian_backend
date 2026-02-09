import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserRole } from '../types';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    generatedCodes: [{
        code: { type: String },
        duration: { type: String },
        validUntil: { type: Date }
    }],
    redeemedCode: { type: String },
    subscriptionExpiry: { type: Date },
    subscriptionStatus: { type: String, default: 'active' },
}, { timestamps: true });

export default mongoose.model<IUser & Document>('User', UserSchema);
