import { apiClient } from '@/shared/api';

export interface Category {
    id: string;
    userId: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    createdAt: string;
    updatedAt: string;
}

interface CategoriesResponse {
    status: string;
    categories: Category[];
}

export const getCategories = async (): Promise<Category[]> => {
    const data = await apiClient<CategoriesResponse>('/api/categories');

    return data.categories;
};
