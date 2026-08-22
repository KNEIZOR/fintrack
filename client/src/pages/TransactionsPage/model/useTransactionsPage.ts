import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type {
    CreateTransactionInput,
    Transaction,
    UpdateTransactionInput,
} from '@/api/transactions.api';

import { useAccounts } from '@/pages/AccountsPage/model/useAccounts';
import { useCategories } from '@/pages/CategoriesPage/model/useCategories';

import { useTransactions } from './useTransactions';

export const useTransactionsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        transactions,
        isLoading,
        error,

        isDeleting,
        deleteTransaction,

        createTransaction,
        isCreating,
        createError,

        updateTransaction,
        isUpdating,
        updateError,
    } = useTransactions();

    const { accounts } = useAccounts();
    const { categories } = useCategories();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const editTransactionId = searchParams.get('edit');

    const selectedTransaction =
        transactions.find(
            (transaction) => transaction.id === editTransactionId,
        ) ?? null;

    const isEditModalOpen = Boolean(editTransactionId && selectedTransaction);

    const isModalOpen = isCreateModalOpen || isEditModalOpen;

    const isSubmitting = isCreating || isUpdating;

    const modalError = selectedTransaction ? updateError : createError;

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleOpenEditModal = (transaction: Transaction) => {
        setIsCreateModalOpen(false);

        setSearchParams(
            {
                edit: transaction.id,
            },
            {
                replace: true,
            },
        );
    };

    const handleCloseModal = () => {
        if (isSubmitting) {
            return;
        }

        setIsCreateModalOpen(false);

        if (editTransactionId) {
            setSearchParams({}, { replace: true });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (
        data: CreateTransactionInput | UpdateTransactionInput,
    ) => {
        try {
            if (selectedTransaction) {
                await updateTransaction({
                    id: selectedTransaction.id,
                    data: data as UpdateTransactionInput,
                });

                setSearchParams({}, { replace: true });

                return;
            }

            await createTransaction(data as CreateTransactionInput);

            setIsCreateModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        transactions,
        accounts,
        categories,

        isLoading,
        error,

        isDeleting,
        handleDelete,

        isCreating,
        isUpdating,
        isSubmitting,

        selectedTransaction,

        isModalOpen,
        modalError,

        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
        handleSubmit,
    };
};
