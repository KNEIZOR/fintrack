import { useState } from 'react';

import type {
    Account,
    CreateAccountInput,
    UpdateAccountInput,
} from '@/api/accounts.api';

interface UseAccountModalProps {
    createAccount: (data: CreateAccountInput) => Promise<unknown>;

    updateAccount: (params: {
        id: string;
        data: UpdateAccountInput;
    }) => Promise<unknown>;

    isCreating: boolean;

    isUpdating: boolean;
}

export const useAccountModal = ({
    createAccount,
    updateAccount,
    isCreating,
    isUpdating,
}: UseAccountModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingAccount, setEditingAccount] = useState<Account | null>(null);

    const isSubmitting = isCreating || isUpdating;

    const handleOpenCreate = () => {
        setEditingAccount(null);
        setIsModalOpen(true);
    };

    const handleEditAccount = (account: Account) => {
        setEditingAccount(account);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        if (isSubmitting) {
            return;
        }

        setIsModalOpen(false);
        setEditingAccount(null);
    };

    const handleSubmit = async (
        data: CreateAccountInput | UpdateAccountInput,
    ) => {
        if (editingAccount) {
            await updateAccount({
                id: editingAccount.id,
                data: data as UpdateAccountInput,
            });

            handleCloseModal();

            return;
        }

        await createAccount(data as CreateAccountInput);

        handleCloseModal();
    };

    return {
        isModalOpen,
        editingAccount,
        isSubmitting,

        handleOpenCreate,
        handleEditAccount,
        handleCloseModal,
        handleSubmit,
    };
};
