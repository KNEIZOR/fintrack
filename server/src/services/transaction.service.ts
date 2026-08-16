import { prisma } from '../lib/prisma.js';
import { Prisma, TransactionType } from '@prisma/client';

interface CreateTransactionInput {
    accountId: string;
    categoryId: string;
    type: TransactionType;
    amount: number;
    description?: string;
    date: string;
}

export const createTransaction = async (
    userId: string,
    data: CreateTransactionInput,
) => {
    if (data.amount <= 0) {
        throw new Error('Amount must be greater than zero');
    }

    return prisma.$transaction(async (tx) => {
        const account = await tx.account.findFirst({
            where: {
                id: data.accountId,
                userId,
            },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        const category = await tx.category.findFirst({
            where: {
                id: data.categoryId,
                userId,
                type: data.type,
            },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        const transaction = await tx.transaction.create({
            data: {
                userId,
                accountId: data.accountId,
                categoryId: data.categoryId,
                type: data.type,
                amount: new Prisma.Decimal(data.amount),
                description: data.description,
                date: new Date(data.date),
            },
            include: {
                account: true,
                category: true,
            },
        });

        const balanceChange =
            data.type === TransactionType.INCOME
                ? new Prisma.Decimal(data.amount)
                : new Prisma.Decimal(data.amount).negated();

        await tx.account.update({
            where: {
                id: account.id,
            },
            data: {
                balance: {
                    increment: balanceChange,
                },
            },
        });

        return transaction;
    });
};

export const getTransactions = async (userId: string) => {
    return prisma.transaction.findMany({
        where: {
            userId,
        },
        include: {
            account: {
                select: {
                    id: true,
                    name: true,
                    currency: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                },
            },
        },
        orderBy: {
            date: 'desc',
        },
    });
};

interface UpdateTransactionInput {
    accountId?: string;
    categoryId?: string;
    type?: TransactionType;
    amount?: number;
    description?: string;
    date?: string;
}

export const updateTransaction = async (
    userId: string,
    transactionId: string,
    data: UpdateTransactionInput,
) => {
    return prisma.$transaction(async (tx) => {
        const existingTransaction = await tx.transaction.findFirst({
            where: {
                id: transactionId,
                userId,
            },
        });

        if (!existingTransaction) {
            throw new Error('Transaction not found');
        }

        if (data.amount !== undefined && data.amount <= 0) {
            throw new Error('Amount must be greater than zero');
        }

        const accountId =
            data.accountId ?? existingTransaction.accountId;

        const categoryId =
            data.categoryId ?? existingTransaction.categoryId;

        const type =
            data.type ?? existingTransaction.type;

        const amount =
            data.amount ?? Number(existingTransaction.amount);

        const account = await tx.account.findFirst({
            where: {
                id: accountId,
                userId,
            },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        const category = await tx.category.findFirst({
            where: {
                id: categoryId,
                userId,
                type,
            },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        // Возвращаем старый баланс
        const oldBalanceChange =
            existingTransaction.type === TransactionType.INCOME
                ? new Prisma.Decimal(existingTransaction.amount)
                : new Prisma.Decimal(existingTransaction.amount).negated();

        await tx.account.update({
            where: {
                id: existingTransaction.accountId,
            },
            data: {
                balance: {
                    decrement: oldBalanceChange,
                },
            },
        });

        // Применяем новый баланс
        const newBalanceChange =
            type === TransactionType.INCOME
                ? new Prisma.Decimal(amount)
                : new Prisma.Decimal(amount).negated();

        await tx.account.update({
            where: {
                id: account.id,
            },
            data: {
                balance: {
                    increment: newBalanceChange,
                },
            },
        });

        const transaction = await tx.transaction.update({
            where: {
                id: transactionId,
            },
            data: {
                accountId,
                categoryId,
                type,
                amount: new Prisma.Decimal(amount),
                description: data.description,
                date: data.date
                    ? new Date(data.date)
                    : existingTransaction.date,
            },
            include: {
                account: {
                    select: {
                        id: true,
                        name: true,
                        currency: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    },
                },
            },
        });

        return transaction;
    });
};

export const deleteTransaction = async (
    userId: string,
    transactionId: string,
) => {
    return prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.findFirst({
            where: {
                id: transactionId,
                userId,
            },
        });

        if (!transaction) {
            return null;
        }

        const balanceChange =
            transaction.type === TransactionType.INCOME
                ? new Prisma.Decimal(transaction.amount).negated()
                : new Prisma.Decimal(transaction.amount);

        await tx.account.update({
            where: {
                id: transaction.accountId,
            },
            data: {
                balance: {
                    increment: balanceChange,
                },
            },
        });

        await tx.transaction.delete({
            where: {
                id: transactionId,
            },
        });

        return transaction;
    });
};

export const getTransactionById = async (
    userId: string,
    transactionId: string,
) => {
    return prisma.transaction.findFirst({
        where: {
            id: transactionId,
            userId,
        },
        include: {
            account: {
                select: {
                    id: true,
                    name: true,
                    currency: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                },
            },
        },
    });
};