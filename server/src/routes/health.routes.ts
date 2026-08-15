import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/health', async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            status: 'ok',
            database: 'connected',
        });
    } catch {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
        });
    }
});

export default router;
