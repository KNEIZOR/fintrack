import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createAccount,
    deleteAccount,
    getAccounts,
    updateAccount,
    type Account,
    type CreateAccountInput,
    type UpdateAccountInput,
} from '@/api/accounts.api';

import { queryKeys } from '@/shared/api/queryKeys';

export const useAccounts = () => {
    const queryClient = useQueryClient();

    const query = useQuery<Account[], Error>({
        queryKey: queryKeys.accounts,
        queryFn: getAccounts,
    });

    const invalidateFinancialData = () => {
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

    const createMutation = useMutation<Account, Error, CreateAccountInput>({
        mutationFn: createAccount,

        onSuccess: invalidateFinancialData,
    });

    const updateMutation = useMutation<
        Account,
        Error,
        {
            id: string;
            data: UpdateAccountInput;
        }
    >({
        mutationFn: ({ id, data }) => updateAccount(id, data),

        onSuccess: invalidateFinancialData,
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteAccount,

        onSuccess: invalidateFinancialData,
    });

    return {
        accounts: query.data ?? [],

        isLoading: query.isLoading,

        error: query.error,

        isError: query.isError,

        refetch: query.refetch,

        createAccount: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        createError: createMutation.error,

        updateAccount: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.error,

        deleteAccount: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.error,
    };
};
