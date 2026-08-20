import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
    type Category,
    type CreateCategoryInput,
    type UpdateCategoryInput,
} from '@/api/categories.api';

export const useCategories = () => {
    const queryClient = useQueryClient();

    const query = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const createMutation = useMutation<Category, Error, CreateCategoryInput>({
        mutationFn: createCategory,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });

    const updateMutation = useMutation<
        Category,
        Error,
        {
            id: string;
            data: UpdateCategoryInput;
        }
    >({
        mutationFn: ({ id, data }) => updateCategory(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteCategory,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });

    return {
        categories: query.data ?? [],

        isLoading: query.isLoading,
        error: query.error,
        isError: query.isError,

        refetch: query.refetch,

        createCategory: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        createError: createMutation.error,

        updateCategory: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.error,

        deleteCategory: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.error,
    };
};
