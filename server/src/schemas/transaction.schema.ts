import { z } from 'zod';

export const createTransactionSchema = z.object({
    accountId: z.string().min(1),

    categoryId: z.string().min(1),

    type: z.enum(['INCOME', 'EXPENSE']),

    amount: z.number().finite().positive(),

    description: z.string().trim().max(255).optional(),

    date: z.coerce.date(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = z.object({
    accountId: z.string().min(1).optional(),

    categoryId: z.string().min(1).optional(),

    type: z.enum(['INCOME', 'EXPENSE']).optional(),

    amount: z.number().finite().positive().optional(),

    description: z.string().trim().max(255).optional(),

    date: z.coerce.date().optional(),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
