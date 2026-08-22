import type { Response } from 'express';

import type { AuthRequest } from '../middleware/auth.middleware.js';

import {
    createAccountSchema,
    updateAccountSchema,
} from '../schemas/account.schema.js';

import * as accountService from '../services/account.service.js';

import { createAccount, getAccounts } from '../services/account.service.js';

export const create = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
        });
    }

    const result = createAccountSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            code: 'VALIDATION_FAILED',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const account = await createAccount(req.userId, result.data);

        return res.status(201).json({
            status: 'ok',
            account,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
        });
    }
};

export const getAll = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
        });
    }

    try {
        const accounts = await getAccounts(req.userId);

        return res.json({
            status: 'ok',
            accounts,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
        });
    }
};

export const deleteAccount = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
            });
        }

        const { id } = req.params;

        await accountService.deleteAccount(req.userId, id);

        return res.json({
            status: 'ok',
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error && error.message === 'Account not found') {
            return res.status(404).json({
                status: 'error',
                code: 'ACCOUNT_NOT_FOUND',
                message: 'Account not found',
            });
        }

        if (
            error instanceof Error &&
            error.message ===
                'Account cannot be deleted because it is used by transactions'
        ) {
            return res.status(409).json({
                status: 'error',
                code: 'ACCOUNT_HAS_TRANSACTIONS',
                message:
                    'Account cannot be deleted because it is used by transactions',
            });
        }

        return res.status(500).json({
            status: 'error',
            code: 'FAILED_TO_DELETE_ACCOUNT',
            message: 'Failed to delete account',
        });
    }
};

export const updateAccount = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
            });
        }

        const { id } = req.params;

        const result = updateAccountSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                status: 'error',
                code: 'VALIDATION_FAILED',
                message: 'Validation failed',
                errors: result.error.flatten().fieldErrors,
            });
        }

        const account = await accountService.updateAccount(
            req.userId,
            id,
            result.data,
        );

        return res.json({
            status: 'ok',
            account,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error && error.message === 'Account not found') {
            return res.status(404).json({
                status: 'error',
                code: 'ACCOUNT_NOT_FOUND',
                message: 'Account not found',
            });
        }

        return res.status(500).json({
            status: 'error',
            code: 'FAILED_TO_UPDATE_ACCOUNT',
            message: 'Failed to update account',
        });
    }
};
