import { z } from 'zod';

export const createTransactionSchema = z.object({
    accountId: z.string().min(1, 'Account is required'),

    categoryId: z.string().min(1, 'Category is required'),

    type: z.enum(['INCOME', 'EXPENSE']),

    amount: z.number().finite().positive('Amount must be greater than 0'),

    description: z
        .string()
        .trim()
        .max(200, 'Description must contain at most 200 characters')
        .optional(),

    date: z.string().min(1, 'Date is required'),
});

export type CreateTransactionFormValues = z.infer<
    typeof createTransactionSchema
>;
