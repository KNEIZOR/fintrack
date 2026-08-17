import { apiClient } from '@/shared/api';

export interface Category {
    id: string;
    userId: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryInput {
    name: string;
    type: 'INCOME' | 'EXPENSE';
}

interface CategoriesResponse {
    status: string;
    categories: Category[];
}

interface CreateCategoryResponse {
    status: string;
    category: Category;
}

interface DeleteCategoryResponse {
    status: string;
    message: string;
}

export const getCategories = async (): Promise<Category[]> => {
    const data = await apiClient<CategoriesResponse>('/api/categories');

    return data.categories;
};

export const createCategory = async (
    data: CreateCategoryInput,
): Promise<Category> => {
    const response = await apiClient<CreateCategoryResponse>(
        '/api/categories',
        {
            method: 'POST',
            body: data,
        },
    );

    return response.category;
};

export const deleteCategory = async (id: string): Promise<void> => {
    await apiClient<DeleteCategoryResponse>(`/api/categories/${id}`, {
        method: 'DELETE',
    });
};
