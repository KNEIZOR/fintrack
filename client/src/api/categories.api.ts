export type CategoryType = 'INCOME' | 'EXPENSE';

export interface Category {
    id: string;
    userId: string;
    name: string;
    type: CategoryType;
    createdAt: string;
    updatedAt: string;
}

interface CategoriesResponse {
    status: string;
    categories: Category[];
}

export const getCategories = async (): Promise<Category[]> => {
    const response = await fetch('http://localhost:4000/api/categories', {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to load categories');
    }

    const data: CategoriesResponse = await response.json();

    return data.categories;
};

interface CreateCategoryResponse {
    status: string;
    category: Category;
}

export const createCategory = async (data: {
    name: string;
    type: CategoryType;
}): Promise<Category> => {
    const response = await fetch('http://localhost:4000/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    const result: CreateCategoryResponse & {
        message?: string;
    } = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to create category');
    }

    return result.category;
};

export const deleteCategory = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to delete category');
    }
};
