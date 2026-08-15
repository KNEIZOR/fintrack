import type { Response } from 'express';

import type { AuthRequest } from '../middleware/auth.middleware.js';
import { createAccountSchema } from '../schemas/account.schema.js';

import { createAccount, getAccounts } from '../services/account.service.js';

export const create = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    const result = createAccountSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
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
            message: 'Internal server error',
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
        const accounts = await getAccounts(req.userId);

        return res.json({
            status: 'ok',
            accounts,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
