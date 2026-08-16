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

export const deleteCategory = async (
    userId: string,
    categoryId: string,
) => {
    return prisma.category.deleteMany({
        where: {
            id: categoryId,
            userId,
        },
    });
};