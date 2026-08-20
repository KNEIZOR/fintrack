import { TransactionType } from '@prisma/client';

import { prisma } from '../lib/prisma.js';

export type AnalyticsPeriod = '3m' | '6m' | '12m';

const getMonthsCount = (period: AnalyticsPeriod) => {
    if (period === '3m') {
        return 3;
    }

    if (period === '12m') {
        return 12;
    }

    return 6;
};

const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
    )}`;
};

const calculateChange = (current: number, previous: number) => {
    if (previous === 0) {
        if (current === 0) {
            return 0;
        }

        return 100;
    }

    return ((current - previous) / previous) * 100;
};

export const getAnalytics = async (
    userId: string,
    period: AnalyticsPeriod = '6m',
) => {
    const now = new Date();

    const months = getMonthsCount(period);

    // Начало текущего периода
    const currentFrom = new Date(now);

    currentFrom.setMonth(currentFrom.getMonth() - (months - 1));
    currentFrom.setDate(1);
    currentFrom.setHours(0, 0, 0, 0);

    // Начало предыдущего периода
    const previousFrom = new Date(currentFrom);

    previousFrom.setMonth(previousFrom.getMonth() - months);

    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
            date: {
                gte: previousFrom,
                lte: now,
            },
        },

        select: {
            type: true,
            amount: true,
            date: true,

            category: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                },
            },
        },

        orderBy: {
            date: 'asc',
        },
    });

    const monthlyMap = new Map<
        string,
        {
            income: number;
            expenses: number;
        }
    >();

    // Создаём все месяцы текущего периода,
    // даже если в них не было транзакций.
    for (let i = 0; i < months; i++) {
        const date = new Date(currentFrom);

        date.setMonth(currentFrom.getMonth() + i);

        monthlyMap.set(getMonthKey(date), {
            income: 0,
            expenses: 0,
        });
    }

    let currentIncome = 0;
    let currentExpenses = 0;

    let previousIncome = 0;
    let previousExpenses = 0;

    const categoryMap = new Map<
        string,
        {
            categoryId: string;
            name: string;
            type: TransactionType;
            amount: number;
        }
    >();

    for (const transaction of transactions) {
        const amount = Number(transaction.amount);

        const date = new Date(transaction.date);

        const isCurrentPeriod = date >= currentFrom;

        if (isCurrentPeriod) {
            // -------------------------
            // CURRENT PERIOD
            // -------------------------

            if (transaction.type === TransactionType.INCOME) {
                currentIncome += amount;
            } else {
                currentExpenses += amount;
            }

            const month = getMonthKey(date);

            const monthly = monthlyMap.get(month);

            if (monthly) {
                if (transaction.type === TransactionType.INCOME) {
                    monthly.income += amount;
                } else {
                    monthly.expenses += amount;
                }
            }

            const categoryKey = `${transaction.category.id}-${transaction.type}`;

            if (!categoryMap.has(categoryKey)) {
                categoryMap.set(categoryKey, {
                    categoryId: transaction.category.id,
                    name: transaction.category.name,
                    type: transaction.type,
                    amount: 0,
                });
            }

            categoryMap.get(categoryKey)!.amount += amount;
        } else {
            // -------------------------
            // PREVIOUS PERIOD
            // -------------------------

            if (transaction.type === TransactionType.INCOME) {
                previousIncome += amount;
            } else {
                previousExpenses += amount;
            }
        }
    }

    const currentNet = currentIncome - currentExpenses;

    const previousNet = previousIncome - previousExpenses;

    const monthly = Array.from(monthlyMap.entries()).map(([month, values]) => ({
        month,
        income: values.income,
        expenses: values.expenses,
        net: values.income - values.expenses,
    }));

    const categories = Array.from(categoryMap.values());

    return {
        period,

        summary: {
            income: currentIncome,
            expenses: currentExpenses,
            net: currentNet,

            incomeChange: calculateChange(currentIncome, previousIncome),

            expensesChange: calculateChange(currentExpenses, previousExpenses),

            netChange: calculateChange(currentNet, previousNet),
        },

        monthly,

        categories,
    };
};
