import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import * as categoryService from '../services/category.service.js';

export const createCategory = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const category = await categoryService.createCategory(
            req.userId,
            req.body,
        );

        return res.status(201).json({
            status: 'ok',
            category,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to create category',
        });
    }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required',
            });
        }

        const categories = await categoryService.getCategories(req.userId);

        return res.json({
            status: 'ok',
            categories,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to get categories',
        });
    }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
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
                message: 'Invalid category id',
            });
        }

        const result = await categoryService.deleteCategory(
            req.userId,
            id,
        );

        if (result.reason === 'NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found',
            });
        }

        if (result.reason === 'HAS_TRANSACTIONS') {
            return res.status(409).json({
                status: 'error',
                message:
                    'Category cannot be deleted because it is used by transactions',
            });
        }

        return res.json({
            status: 'ok',
            message: 'Category deleted',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Failed to delete category',
        });
    }
};