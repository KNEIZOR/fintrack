import { prisma } from '../lib/prisma.js';
import { TransactionType } from '@prisma/client';

interface CreateCategoryInput {
    name: string;
    type: TransactionType;
}

export const createCategory = async (
    userId: string,
    data: CreateCategoryInput,
) => {
    return prisma.category.create({
        data: {
            name: data.name,
            type: data.type,
            userId,
        },
    });
};

export const getCategories = async (userId: string) => {
    return prisma.category.findMany({
        where: {
            userId,
        },
        orderBy: {
            name: 'asc',
        },
    });
};

export const deleteCategory = async (userId: string, categoryId: string) => {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
            userId,
        },
    });

    if (!category) {
        return {
            deleted: false,
            reason: 'NOT_FOUND' as const,
        };
    }

    const transactionCount = await prisma.transaction.count({
        where: {
            categoryId,
            userId,
        },
    });

    if (transactionCount > 0) {
        return {
            deleted: false,
            reason: 'HAS_TRANSACTIONS' as const,
            transactionCount,
        };
    }

    await prisma.category.delete({
        where: {
            id: categoryId,
        },
    });

    return {
        deleted: true,
    };
};
