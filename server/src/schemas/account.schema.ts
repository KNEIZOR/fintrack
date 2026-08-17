import { z } from 'zod';

export const createAccountSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.enum(['BANK', 'CASH', 'SAVINGS', 'INVESTMENT']),
    currency: z.string().min(3).max(3),
    balance: z.number().nonnegative(),
});

export const updateAccountSchema = z.object({
    name: z.string().min(1),
    type: z.enum(['BANK', 'CASH', 'SAVINGS', 'INVESTMENT']),
    currency: z.string().min(1),
    balance: z.number(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
