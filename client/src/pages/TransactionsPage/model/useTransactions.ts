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
        queryKey: queryKeys.transactions,
        queryFn: getTransactions,
    });

    const invalidateFinancialData = () => {
        queryClient.invalidateQueries({
            queryKey: queryKeys.transactions,
        });

        queryClient.invalidateQueries({
            queryKey: queryKeys.accounts,
        });

        queryClient.invalidateQueries({
            queryKey: queryKeys.dashboard,
        });

        queryClient.invalidateQueries({
            queryKey: queryKeys.analytics,
        });
    };

    const createMutation = useMutation<
        Transaction,
        Error,
        CreateTransactionInput
    >({
        mutationFn: createTransaction,

        onSuccess: invalidateFinancialData,
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

        onSuccess: invalidateFinancialData,
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteTransaction,

        onSuccess: invalidateFinancialData,
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
