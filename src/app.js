import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use(errorHandler);

export { app };