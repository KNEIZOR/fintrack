import { ApiErrorMessage } from '@/shared/api/ApiErrorMessage';

import { useAccounts } from '../model/useAccounts';
import { useAccountModal } from '../model/useAccountModal';

import { AccountModal } from './AccountModal/AccountModal';
import { AccountsHeader } from './AccountsHeader/AccountsHeader';
import { AccountsList } from './AccountsList/AccountsList';
import { AccountsSkeleton } from './AccountsSkeleton/AccountsSkeleton';

import styles from './AccountsPage.module.scss';

export const AccountsPage = () => {
    const {
        accounts,
        isLoading,
        error,

        createAccount,
        isCreating,
        createError,

        deleteAccount,
        isDeleting,
        deleteError,

        updateAccount,
        isUpdating,
        updateError,
    } = useAccounts();

    const {
        isModalOpen,
        editingAccount,
        isSubmitting,

        handleOpenCreate,
        handleEditAccount,
        handleCloseModal,
        handleSubmit,
    } = useAccountModal({
        createAccount,
        updateAccount,
        isCreating,
        isUpdating,
    });

    if (isLoading) {
        return <AccountsSkeleton />;
    }

    const mutationError = createError ?? updateError ?? deleteError;

    const modalError = createError ?? updateError;

    const handleDeleteAccount = async (id: string) => {
        try {
            await deleteAccount(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className={styles.accounts}>
            <div className={styles.container}>
                <AccountsHeader
                    isSubmitting={isSubmitting}
                    onAddAccount={handleOpenCreate}
                />

                {error && (
                    <div className={styles.error}>
                        <ApiErrorMessage error={error} />
                    </div>
                )}

                {mutationError && (
                    <div className={styles.error}>
                        <ApiErrorMessage error={mutationError} />
                    </div>
                )}

                <AccountsList
                    accounts={accounts}
                    isDeleting={isDeleting}
                    onEdit={handleEditAccount}
                    onDelete={handleDeleteAccount}
                />
            </div>

            <AccountModal
                key={editingAccount?.id ?? 'create'}
                isOpen={isModalOpen}
                isCreating={isSubmitting}
                error={modalError}
                account={editingAccount}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </main>
    );
};
