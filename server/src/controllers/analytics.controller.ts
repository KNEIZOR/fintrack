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

        const periodParam = req.query.period;

        const period =
            periodParam === '3m' ||
            periodParam === '6m' ||
            periodParam === '12m'
                ? periodParam
                : '6m';

        console.log('[Analytics] Request:', {
            userId: req.userId,
            period,
        });

        const analytics = await analyticsService.getAnalytics(
            req.userId,
            period,
        );

        console.log('[Analytics] Success:', {
            period,
            months: analytics.monthly.length,
            categories: analytics.categories.length,
        });

        return res.json({
            status: 'ok',
            analytics,
        });
    } catch (error) {
        console.error('[Analytics] Error:', error);

        return res.status(500).json({
            status: 'error',
            message:
                error instanceof Error
                    ? error.message
                    : 'Failed to get analytics',
        });
    }
};
