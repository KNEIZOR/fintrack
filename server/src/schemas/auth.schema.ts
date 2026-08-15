import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().trim().email('Invalid email'),

    password: z.string().min(8, 'Password must contain at least 8 characters'),

    name: z
        .string()
        .trim()
        .min(2, 'Name must contain at least 2 characters')
        .max(50, 'Name must contain at most 50 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().trim().email('Invalid email'),

    password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
