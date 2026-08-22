import type { Response } from 'express';

import type { AuthRequest } from '../middleware/auth.middleware.js';

import {
    createCategorySchema,
    updateCategorySchema,
} from '../schemas/category.schema.js';

import * as categoryService from '../services/category.service.js';

export const createCategory = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
        });
    }

    const result = createCategorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            code: 'VALIDATION_FAILED',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const category = await categoryService.createCategory(
            req.userId,
            result.data,
        );

        return res.status(201).json({
            status: 'ok',
            category,
        });
    } catch (error) {
        console.error(error);

        if (
            error instanceof Error &&
            error.message ===
                'Category name already exists for this transaction type'
        ) {
            return res.status(409).json({
                status: 'error',
                code: 'CATEGORY_NAME_ALREADY_EXISTS',
                message:
                    'Category name already exists for this transaction type',
            });
        }

        return res.status(500).json({
            status: 'error',
            code: 'FAILED_TO_CREATE_CATEGORY',
            message: 'Failed to create category',
        });
    }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
        });
    }

    try {
        const categories = await categoryService.getCategories(req.userId);

        return res.json({
            status: 'ok',
            categories,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: 'error',
            code: 'FAILED_TO_GET_CATEGORIES',
            message: 'Failed to get categories',
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
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
        });
    }

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_CATEGORY_ID',
            message: 'Invalid category id',
        });
    }

    const result = updateCategorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 'error',
            code: 'VALIDATION_FAILED',
            message: 'Validation failed',
            errors: result.error.flatten().fieldErrors,
        });
    }

    try {
        const category = await categoryService.updateCategory(
            req.userId,
            id,
            result.data,
        );

        return res.json({
            status: 'ok',
            category,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error && error.message === 'Category not found') {
            return res.status(404).json({
                status: 'error',
                code: 'CATEGORY_NOT_FOUND',
                message: 'Category not found',
            });
        }

        if (
            error instanceof Error &&
            error.message ===
                'Category name already exists for this transaction type'
        ) {
            return res.status(409).json({
                status: 'error',
                code: 'CATEGORY_NAME_ALREADY_EXISTS',
                message:
                    'Category name already exists for this transaction type',
            });
        }

        return res.status(500).json({
            status: 'error',
            code: 'FAILED_TO_UPDATE_CATEGORY',
            message: 'Failed to update category',
        });
    }
};

export const deleteCategory = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
) => {
    if (!req.userId) {
        return res.status(401).json({
            status: 'error',
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
        });
    }

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_CATEGORY_ID',
            message: 'Invalid category id',
        });
    }

    try {
        const result = await categoryService.deleteCategory(req.userId, id);

        if (result.reason === 'NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                code: 'CATEGORY_NOT_FOUND',
                message: 'Category not found',
            });
        }

        if (result.reason === 'HAS_TRANSACTIONS') {
            return res.status(409).json({
                status: 'error',
                code: 'CATEGORY_HAS_TRANSACTIONS',
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
            code: 'FAILED_TO_DELETE_CATEGORY',
            message: 'Failed to delete category',
        });
    }
};
