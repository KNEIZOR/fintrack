import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createCategory,
    deleteCategory,
    getCategories,
    type Category,
    type CreateCategoryInput,
} from '@/api/categories.api';

export const useCategories = () => {
    const queryClient = useQueryClient();

    const query = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateCategoryInput) => createCategory(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteCategory(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });

    return {
        categories: query.data ?? [],

        isLoading: query.isLoading,

        error: query.error ?? createMutation.error ?? deleteMutation.error,

        isError: query.isError,

        isCreating: createMutation.isPending,

        isDeleting: deleteMutation.isPending,

        createCategory: createMutation.mutateAsync,

        deleteCategory: deleteMutation.mutateAsync,

        refetch: query.refetch,
    };
};
