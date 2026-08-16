import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import * as transactionService from '../services/transaction.service.js';

export const createTransaction = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const transaction = await transactionService.createTransaction(
            req.userId,
            req.body,
        );

        return res.status(201).json({
            status: 'ok',
            transaction,
        });
    } catch (error) {
        console.error(error);

        const message =
            error instanceof Error
                ? error.message
                : 'Failed to create transaction';

        if (
            message === 'Account not found' ||
            message === 'Category not found'
        ) {
            return res.status(404).json({
                status: 'error',
                message,
            });
        }

        if (message === 'Amount must be greater than zero') {
            return res.status(400).json({
                status: 'error',
                message,
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Failed to create transaction',
        });
    }
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const transactions = await transactionService.getTransactions(
            req.userId,
        );

        return res.json({
            status: 'ok',
            transactions,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to get transactions',
        });
    }
};

export const getTransactionById = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const id = req.params.id;

        if (typeof id !== 'string') {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid transaction id',
            });
        }

        const transaction = await transactionService.getTransactionById(
            req.userId,
            id,
        );

        if (!transaction) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        return res.json({
            status: 'ok',
            transaction,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to get transaction',
        });
    }
};

export const updateTransaction = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const transaction = await transactionService.updateTransaction(
            req.userId,
            String(req.params.id),
            req.body,
        );

        return res.json({
            status: 'ok',
            transaction,
        });
    } catch (error) {
        console.error(error);

        const message =
            error instanceof Error
                ? error.message
                : 'Failed to update transaction';

        if (
            message === 'Transaction not found' ||
            message === 'Account not found' ||
            message === 'Category not found'
        ) {
            return res.status(404).json({
                status: 'error',
                message,
            });
        }

        if (message === 'Amount must be greater than zero') {
            return res.status(400).json({
                status: 'error',
                message,
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Failed to update transaction',
        });
    }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const deleted = await transactionService.deleteTransaction(
            req.userId,
            String(req.params.id),
        );

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        return res.json({
            status: 'ok',
            message: 'Transaction deleted',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to delete transaction',
        });
    }
};
