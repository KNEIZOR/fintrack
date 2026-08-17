import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createTransaction,
    deleteTransaction,
    getTransactions,
    type CreateTransactionInput,
    type Transaction,
} from '@/api/transactions.api';

import { queryKeys } from '@/shared/api/queryKeys';

export const useTransactions = () => {
    const queryClient = useQueryClient();

    const query = useQuery<Transaction[], Error>({
        queryKey: queryKeys.transactions,
        queryFn: getTransactions,
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateTransactionInput) => createTransaction(data),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.transactions,
                }),

                queryClient.invalidateQueries({
                    queryKey: queryKeys.accounts,
                }),

                queryClient.invalidateQueries({
                    queryKey: queryKeys.dashboard,
                }),
            ]);
        },
    });

    const deleteMutation = useMutation({
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

        createTransaction: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        createError: createMutation.error,

        deleteTransaction: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.error,

        refetch: query.refetch,
    };
};
