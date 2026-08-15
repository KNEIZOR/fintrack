import { Router } from 'express';

import { create, getAll } from '../controllers/account.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', create);

router.get('/', getAll);

export default router;
