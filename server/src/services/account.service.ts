import { prisma } from '../lib/prisma.js';
import type { CreateAccountInput } from '../schemas/account.schema.js';

export const createAccount = async (
    userId: string,
    data: CreateAccountInput,
) => {
    return prisma.account.create({
        data: {
            userId,
            name: data.name,
            type: data.type,
            currency: data.currency,
            balance: data.balance,
        },
    });
};

export const getAccounts = async (userId: string) => {
    return prisma.account.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
