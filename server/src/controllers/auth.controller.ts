import type { Request, Response } from 'express';
import { registerSchema } from '../schemas/auth.schema.js';
import { registerUser } from '../services/auth.service.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { loginUser } from '../services/auth.service.js';
import { prisma } from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const user = await registerUser(result.data);

        return res.status(201).json({
            status: 'ok',
            user,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'USER_ALREADY_EXISTS') {
            return res.status(409).json({
                status: 'error',
                message: 'User with this email already exists',
            });
        }

        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const { accessToken, user } = await loginUser(
            result.data.email,
            result.data.password,
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            status: 'ok',
            user,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

export const me = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            id: true,
            email: true,
            name: true,
            currency: true,
            timezone: true,
            createdAt: true,
        },
    });

    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'User not found',
        });
    }

    return res.json({
        status: 'ok',
        user,
    });
};

export const logout = (_req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return res.json({
        status: 'ok',
        message: 'Logged out successfully',
    });
};
