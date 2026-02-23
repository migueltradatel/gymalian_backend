/**
 * Configuración principal de la aplicación Express.
 * Define middlewares globales, rutas de la API y manejadores de errores básicos.
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import workoutPlanRoutes from './routes/workoutPlanRoutes';
import workoutLogRoutes from './routes/workoutLogRoutes';
import coachRoutes from './routes/coachRoutes';
import notificationRoutes from './routes/notificationRoutes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/workouts', workoutPlanRoutes);
app.use('/logs', workoutLogRoutes);
app.use('/coach', coachRoutes);
app.use('/notifications', notificationRoutes);

/**
 * Endpoint de salud (Health Check) para verificar que el servidor responde.
 * 
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
