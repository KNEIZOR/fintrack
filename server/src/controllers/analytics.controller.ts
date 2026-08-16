import type { Response } from 'express';

import type { AuthRequest } from '../middleware/auth.middleware.js';

import * as analyticsService from '../services/analytics.service.js';

export const getAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const analytics = await analyticsService.getAnalytics(req.userId);

        return res.json({
            status: 'ok',
            analytics,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to get analytics',
        });
    }
};
