import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
    Account,
    CreateAccountInput,
    UpdateAccountInput,
} from '@/api/accounts.api';

import { AccountCard } from '@/widgets/accounts/AccountCard';

import { AccountsSkeleton } from './AccountsSkeleton/AccountsSkeleton';
import { AccountModal } from './AccountModal/AccountModal';

import { useAccounts } from '../model/useAccounts';

import styles from './AccountsPage.module.scss';

export const AccountsPage = () => {
    const { t } = useTranslation();

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);

    if (isLoading) {
        return <AccountsSkeleton />;
    }

    if (error) {
        return (
            <main className={styles.accounts}>
                <div className={styles.container}>
                    <div className={styles.error}>{t('accounts.error')}</div>
                </div>
            </main>
        );
    }

    const handleOpenCreate = () => {
        setEditingAccount(null);
        setIsModalOpen(true);
    };

    const handleEditAccount = (account: Account) => {
        setEditingAccount(account);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAccount(null);
    };

    const handleCreateAccount = async (data: CreateAccountInput) => {
        try {
            await createAccount(data);

            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateAccount = async (data: UpdateAccountInput) => {
        if (!editingAccount) {
            return;
        }

        try {
            await updateAccount({
                id: editingAccount.id,
                data,
            });

            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteAccount = async (id: string) => {
        try {
            await deleteAccount(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (
        data: CreateAccountInput | UpdateAccountInput,
    ) => {
        if (editingAccount) {
            await handleUpdateAccount(data as UpdateAccountInput);
        } else {
            await handleCreateAccount(data as CreateAccountInput);
        }
    };

    const mutationError = createError ?? updateError ?? deleteError;

    return (
        <main className={styles.accounts}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{t('accounts.title')}</h1>

                        <p className={styles.subtitle}>
                            {t('accounts.subtitle')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={handleOpenCreate}
                    >
                        {t('accounts.addAccount')}
                    </button>
                </header>

                {mutationError && (
                    <div className={styles.error} role="alert">
                        {mutationError.message}
                    </div>
                )}

                <section>
                    <h2 className={styles.sectionTitle}>
                        {t('accounts.yourAccounts')}
                    </h2>

                    {accounts.length === 0 ? (
                        <p className={styles.empty}>
                            {t('accounts.noAccounts')}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {accounts.map((account) => (
                                <AccountCard
                                    key={account.id}
                                    account={account}
                                    onEdit={handleEditAccount}
                                    onDelete={handleDeleteAccount}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <AccountModal
                key={editingAccount?.id ?? 'create'}
                isOpen={isModalOpen}
                isCreating={isCreating || isUpdating}
                error={createError ?? updateError}
                account={editingAccount}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </main>
    );
};
