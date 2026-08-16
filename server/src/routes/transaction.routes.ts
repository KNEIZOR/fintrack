import { Router } from 'express';

import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} from '../controllers/transaction.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTransactions);
router.get('/:id', getTransactionById);

router.post('/', createTransaction);

router.patch('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
