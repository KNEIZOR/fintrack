import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware.js';

import {
    create,
    getAll,
    remove,
    update,
} from '../controllers/transaction.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', create);

router.get('/', getAll);

router.patch('/:id', update);

router.delete('/:id', remove);

export default router;
