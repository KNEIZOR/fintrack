import { prisma } from '../lib/prisma.js';
import { TransactionType } from '@prisma/client';

export const getAnalytics = async (userId: string) => {
    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
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

    const monthlyMap = new Map<string, { income: number; expenses: number }>();

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

        const month = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
        ).padStart(2, '0')}`;

        if (!monthlyMap.has(month)) {
            monthlyMap.set(month, {
                income: 0,
                expenses: 0,
            });
        }

        const monthly = monthlyMap.get(month)!;

        if (transaction.type === TransactionType.INCOME) {
            monthly.income += amount;
        } else {
            monthly.expenses += amount;
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
    }

    const monthly = Array.from(monthlyMap.entries()).map(([month, values]) => ({
        month,
        income: values.income,
        expenses: values.expenses,
        net: values.income - values.expenses,
    }));

    const categories = Array.from(categoryMap.values());

    return {
        monthly,
        categories,
    };
};
