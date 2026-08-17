import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware.js';

import {
    create,
    deleteAccount,
    getAll,
    updateAccount,
} from '../controllers/account.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', create);

router.get('/', getAll);

router.delete('/:id', deleteAccount);

router.patch('/:id', updateAccount);

export default router;
