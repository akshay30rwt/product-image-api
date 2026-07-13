import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use(errorHandler);

export { app };