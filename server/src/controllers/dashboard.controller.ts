import type { Response } from 'express';

import type { AuthRequest } from '../middleware/auth.middleware.js';

import * as dashboardService from '../services/dashboard.service.js';

export const getDashboard = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const dashboard = await dashboardService.getDashboard(req.userId);

        return res.json({
            status: 'ok',
            dashboard,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to get dashboard',
        });
    }
};
