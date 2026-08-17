import type { Response } from 'express';

import type { AuthRequest } from '../middleware/auth.middleware.js';

import {
    createTransactionSchema,
    updateTransactionSchema,
} from '../schemas/transaction.schema.js';

import * as transactionService from '../services/transaction.service.js';

export const create = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    const result = createTransactionSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const transaction = await transactionService.createTransaction(
            req.userId,
            result.data,
        );

        return res.status(201).json({
            status: 'ok',
            transaction,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            if (
                error.message === 'Account not found' ||
                error.message === 'Category not found'
            ) {
                return res.status(404).json({
                    status: 'error',
                    message: error.message,
                });
            }

            if (
                error.message ===
                'Category type does not match transaction type'
            ) {
                return res.status(409).json({
                    status: 'error',
                    message: error.message,
                });
            }
        }

        return res.status(500).json({
            status: 'error',
            message: 'Failed to create transaction',
        });
    }
};

export const getAll = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    try {
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

export const update = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    const result = updateTransactionSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const transaction = await transactionService.updateTransaction(
            req.userId,
            req.params.id,
            result.data,
        );

        return res.json({
            status: 'ok',
            transaction,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            if (
                error.message === 'Transaction not found' ||
                error.message === 'Account not found' ||
                error.message === 'Category not found'
            ) {
                return res.status(404).json({
                    status: 'error',
                    message: error.message,
                });
            }

            if (
                error.message ===
                'Category type does not match transaction type'
            ) {
                return res.status(409).json({
                    status: 'error',
                    message: error.message,
                });
            }
        }

        return res.status(500).json({
            status: 'error',
            message: 'Failed to update transaction',
        });
    }
};

export const remove = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    try {
        await transactionService.deleteTransaction(req.userId, req.params.id);

        return res.json({
            status: 'ok',
        });
    } catch (error) {
        console.error(error);

        if (
            error instanceof Error &&
            error.message === 'Transaction not found'
        ) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Failed to delete transaction',
        });
    }
};
