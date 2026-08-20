import { z } from 'zod';

const categoryTypeSchema = z.enum(['INCOME', 'EXPENSE']);

export const createCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Category name must contain at least 2 characters')
        .max(50, 'Category name must contain at most 50 characters'),

    type: categoryTypeSchema,
});

export const updateCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Category name must contain at least 2 characters')
        .max(50, 'Category name must contain at most 50 characters'),

    type: categoryTypeSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
