import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export interface AuthRequest<
    Params = Record<string, string>,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = Record<string, string>,
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    userId?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (
            typeof payload !== 'object' ||
            !payload ||
            typeof payload.userId !== 'string'
        ) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token',
            });
        }

        req.userId = payload.userId;

        next();
    } catch {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token',
        });
    }
};
