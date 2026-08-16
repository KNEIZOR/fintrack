import { prisma } from '../lib/prisma.js';
import { TransactionType } from '@prisma/client';

export const getDashboard = async (userId: string) => {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [accounts, income, expenses, recentTransactions] = await Promise.all([
        prisma.account.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                name: true,
                type: true,
                currency: true,
                balance: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        }),

        prisma.transaction.aggregate({
            where: {
                userId,
                type: TransactionType.INCOME,
                date: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
            _sum: {
                amount: true,
            },
        }),

        prisma.transaction.aggregate({
            where: {
                userId,
                type: TransactionType.EXPENSE,
                date: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
            _sum: {
                amount: true,
            },
        }),

        prisma.transaction.findMany({
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
            take: 10,
        }),
    ]);

    const totalBalance = accounts.reduce(
        (sum, account) => sum + Number(account.balance),
        0,
    );

    const totalIncome = Number(income._sum.amount ?? 0);
    const totalExpenses = Number(expenses._sum.amount ?? 0);

    return {
        balance: totalBalance,
        income: totalIncome,
        expenses: totalExpenses,
        net: totalIncome - totalExpenses,
        accounts,
        recentTransactions,
    };
};
