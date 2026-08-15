import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import accountRoutes from './routes/account.routes.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);

export default app;
