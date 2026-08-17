import { prisma } from '../lib/prisma.js';
import type { CreateAccountInput, UpdateAccountInput } from '../schemas/account.schema.js';

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

export const deleteAccount = async (userId: string, accountId: string) => {
    const account = await prisma.account.findFirst({
        where: {
            id: accountId,
            userId,
        },
    });

    if (!account) {
        throw new Error('Account not found');
    }

    const transactionsCount = await prisma.transaction.count({
        where: {
            accountId,
            userId,
        },
    });

    if (transactionsCount > 0) {
        throw new Error(
            'Account cannot be deleted because it is used by transactions',
        );
    }

    return prisma.account.delete({
        where: {
            id: accountId,
        },
    });
};

export const updateAccount = async (
    userId: string,
    accountId: string,
    data: UpdateAccountInput,
) => {
    const account = await prisma.account.findFirst({
        where: {
            id: accountId,
            userId,
        },
    });

    if (!account) {
        throw new Error('Account not found');
    }

    return prisma.account.update({
        where: {
            id: accountId,
        },
        data: {
            name: data.name,
            type: data.type,
            currency: data.currency,
            balance: data.balance,
        },
    });
};
