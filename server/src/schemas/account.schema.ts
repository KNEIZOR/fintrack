import { z } from 'zod';

export const createAccountSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must contain at least 2 characters')
        .max(50, 'Name must contain at most 50 characters'),

    type: z.enum(['BANK', 'CASH', 'SAVINGS', 'INVESTMENT']),

    currency: z
        .string()
        .length(3, 'Currency must contain 3 characters')
        .transform((value) => value.toUpperCase()),

    balance: z.number().finite().default(0),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
