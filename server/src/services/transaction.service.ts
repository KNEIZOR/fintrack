import { prisma } from '../lib/prisma.js';
import type {
    CreateTransactionInput,
    UpdateTransactionInput,
} from '../schemas/transaction.schema.js';

export const createTransaction = async (
    userId: string,
    data: CreateTransactionInput,
) => {
    return prisma.$transaction(async (tx) => {
        // Проверяем, что счёт принадлежит пользователю
        const account = await tx.account.findFirst({
            where: {
                id: data.accountId,
                userId,
            },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        // Проверяем, что категория принадлежит пользователю
        const category = await tx.category.findFirst({
            where: {
                id: data.categoryId,
                userId,
            },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        // Проверяем соответствие типа транзакции типу категории
        if (category.type !== data.type) {
            throw new Error('Category type does not match transaction type');
        }

        const balanceChange =
            data.type === 'INCOME' ? data.amount : -data.amount;

        const transaction = await tx.transaction.create({
            data: {
                userId,
                accountId: data.accountId,
                categoryId: data.categoryId,
                type: data.type,
                amount: data.amount,
                description: data.description,
                date: data.date,
            },
        });

        await tx.account.update({
            where: {
                id: data.accountId,
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

        const newAccountId = data.accountId ?? existingTransaction.accountId;

        const newCategoryId = data.categoryId ?? existingTransaction.categoryId;

        const newType = data.type ?? existingTransaction.type;

        const newAmount = data.amount ?? Number(existingTransaction.amount);

        const oldBalanceChange =
            existingTransaction.type === 'INCOME'
                ? Number(existingTransaction.amount)
                : -Number(existingTransaction.amount);

        const newBalanceChange = newType === 'INCOME' ? newAmount : -newAmount;

        // Проверяем новый счёт
        const account = await tx.account.findFirst({
            where: {
                id: newAccountId,
                userId,
            },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        // Проверяем новую категорию
        const category = await tx.category.findFirst({
            where: {
                id: newCategoryId,
                userId,
            },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        if (category.type !== newType) {
            throw new Error('Category type does not match transaction type');
        }

        /*
         * Сначала отменяем влияние старой транзакции
         * на старый счёт.
         */
        await tx.account.update({
            where: {
                id: existingTransaction.accountId,
            },
            data: {
                balance: {
                    increment: -oldBalanceChange,
                },
            },
        });

        /*
         * Затем применяем влияние новой транзакции
         * к новому счёту.
         */
        await tx.account.update({
            where: {
                id: newAccountId,
            },
            data: {
                balance: {
                    increment: newBalanceChange,
                },
            },
        });

        return tx.transaction.update({
            where: {
                id: transactionId,
            },
            data: {
                accountId: newAccountId,
                categoryId: newCategoryId,
                type: newType,
                amount: newAmount,
                description: data.description,
                date: data.date,
            },
        });
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
            throw new Error('Transaction not found');
        }

        const balanceChange =
            transaction.type === 'INCOME'
                ? Number(transaction.amount)
                : -Number(transaction.amount);

        /*
         * Удаляем влияние транзакции со счёта.
         */
        await tx.account.update({
            where: {
                id: transaction.accountId,
            },
            data: {
                balance: {
                    increment: -balanceChange,
                },
            },
        });

        return tx.transaction.delete({
            where: {
                id: transactionId,
            },
        });
    });
};
