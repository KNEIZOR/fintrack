import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type {
    CreateTransactionInput,
    Transaction,
    UpdateTransactionInput,
} from '@/api/transactions.api';

interface UseTransactionModalProps {
    transactions: Transaction[];

    isCreating: boolean;
    isUpdating: boolean;

    createTransaction: (data: CreateTransactionInput) => Promise<unknown>;

    updateTransaction: (params: {
        id: string;
        data: UpdateTransactionInput;
    }) => Promise<unknown>;
}

export const useTransactionModal = ({
    transactions,
    isCreating,
    isUpdating,
    createTransaction,
    updateTransaction,
}: UseTransactionModalProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const editTransactionId = searchParams.get('edit');

    const selectedTransaction =
        transactions.find(
            (transaction) => transaction.id === editTransactionId,
        ) ?? null;

    const isEditModalOpen = Boolean(editTransactionId && selectedTransaction);

    const isModalOpen = isCreateModalOpen || isEditModalOpen;

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
        if (isCreating || isUpdating) {
            return;
        }

        setIsCreateModalOpen(false);

        if (editTransactionId) {
            setSearchParams({}, { replace: true });
        }
    };

    const handleSubmit = async (
        data: CreateTransactionInput | UpdateTransactionInput,
    ) => {
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
    };

    return {
        selectedTransaction,
        isModalOpen,

        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
        handleSubmit,
    };
};
