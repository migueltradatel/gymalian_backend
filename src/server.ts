import dotenv from 'dotenv';
dotenv.config();

/**
 * Punto de entrada principal del servidor.
 * Se encarga de cargar las variables de entorno, conectar con la base de datos (MongoDB)
 * e iniciar la escucha de peticiones HTTP.
 */
import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trainer-platform';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
