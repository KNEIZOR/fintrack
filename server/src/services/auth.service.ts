import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';
import type { RegisterInput } from '../schemas/auth.schema.js';
import { createAccessToken } from '../lib/jwt.js';

export const registerUser = async (data: RegisterInput) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        throw new Error('USER_ALREADY_EXISTS');
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            name: data.name,
        },
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        currency: user.currency,
        timezone: user.timezone,
    };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const accessToken = createAccessToken(user.id);

    return {
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            currency: user.currency,
            timezone: user.timezone,
        },
    };
};
