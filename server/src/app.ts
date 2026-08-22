import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import accountRoutes from './routes/account.routes.js';
import categoryRoutes from './routes/category.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;

if (!CLIENT_URL) {
    throw new Error('CLIENT_URL is not defined');
}

app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);

export default app;
