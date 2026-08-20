import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createTransaction,
    deleteTransaction,
    getTransactions,
    updateTransaction,
    type CreateTransactionInput,
    type Transaction,
    type UpdateTransactionInput,
} from '@/api/transactions.api';

import { queryKeys } from '@/shared/api/queryKeys';

export const useTransactions = () => {
    const queryClient = useQueryClient();

    const query = useQuery<Transaction[], Error>({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });

    const createMutation = useMutation<
        Transaction,
        Error,
        CreateTransactionInput
    >({
        mutationFn: createTransaction,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
            });

            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.analytics,
            });
        },
    });

    const updateMutation = useMutation<
        Transaction,
        Error,
        {
            id: string;
            data: UpdateTransactionInput;
        }
    >({
        mutationFn: ({ id, data }) => updateTransaction(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
            });

            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.analytics,
            });
        },
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteTransaction,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
            });

            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.analytics,
            });
        },
    });

    return {
        transactions: query.data ?? [],

        isLoading: query.isLoading,

        error: query.error,

        isError: query.isError,

        refetch: query.refetch,

        createTransaction: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        createError: createMutation.error,

        updateTransaction: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.error,

        deleteTransaction: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.error,
    };
};
