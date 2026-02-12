import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import workoutPlanRoutes from './routes/workoutPlanRoutes';
import workoutLogRoutes from './routes/workoutLogRoutes';
import coachRoutes from './routes/coachRoutes';

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

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
