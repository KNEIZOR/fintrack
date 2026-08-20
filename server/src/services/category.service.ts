import { Prisma, TransactionType } from '@prisma/client';

import { prisma } from '../lib/prisma.js';

import type {
    CreateCategoryInput,
    UpdateCategoryInput,
} from '../schemas/category.schema.js';

export const createCategory = async (
    userId: string,
    data: CreateCategoryInput,
) => {
    try {
        return await prisma.category.create({
            data: {
                userId,
                name: data.name,
                type: data.type as TransactionType,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            throw new Error(
                'Category name already exists for this transaction type',
            );
        }

        throw error;
    }
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

export const updateCategory = async (
    userId: string,
    categoryId: string,
    data: UpdateCategoryInput,
) => {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId,
            userId,
        },
    });

    if (!category) {
        throw new Error('Category not found');
    }

    try {
        return await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: {
                name: data.name,
                type: data.type as TransactionType,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            throw new Error(
                'Category name already exists for this transaction type',
            );
        }

        throw error;
    }
};
