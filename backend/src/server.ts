import express, { Request, Response } from 'express';
import { connectDB } from './config/db';
import router from './router';

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);

export default app;