import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
    userId: Schema.Types.ObjectId;
    type: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

/**
 * Esquema de Mongoose para el modelo de Notificación.
 * Almacena las notificaciones dirigidas a los usuarios (entrenadores o atletas).
 */
const NotificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

export default model<INotification>('Notification', NotificationSchema);
