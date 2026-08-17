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
        queryKey: ['accounts'],
        queryFn: getAccounts,
    });

    const createMutation = useMutation<Account, Error, CreateAccountInput>({
        mutationFn: createAccount,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard,
            });
        },
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteAccount,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard,
            });
        },
    });

    const updateMutation = useMutation<
        Account,
        Error,
        { id: string; data: UpdateAccountInput }
    >({
        mutationFn: ({ id, data }) => updateAccount(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard,
            });
        },
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

        deleteAccount: deleteMutation.mutateAsync,

        isDeleting: deleteMutation.isPending,

        deleteError: deleteMutation.error,

        updateAccount: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.error,
    };
};
