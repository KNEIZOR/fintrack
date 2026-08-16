import { Router } from 'express';

import { getAnalytics } from '../controllers/analytics.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAnalytics);

export default router;
