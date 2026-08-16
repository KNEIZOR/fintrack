import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().trim().min(2).max(50),

    type: z.enum(['INCOME', 'EXPENSE']),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
