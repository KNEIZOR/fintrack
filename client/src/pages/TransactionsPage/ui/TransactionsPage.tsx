import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAccounts } from '@/pages/AccountsPage/model/useAccounts';
import { useCategories } from '@/pages/CategoriesPage/model/useCategories';

import { TransactionCard } from '@/widgets/transactions/TransactionCard';

import { TransactionsSkeleton } from './TransactionsSkeleton/TransactionsSkeleton';
import { TransactionModal } from './TransactionModal/TransactionModal';
import { useTransactions } from '../model/useTransactions';

import styles from './TransactionsPage.module.scss';

export const TransactionsPage = () => {
    const { t } = useTranslation();

    const {
        transactions,
        isLoading,
        error,
        isDeleting,
        deleteTransaction,
        createTransaction,
        isCreating,
        createError,
    } = useTransactions();

    const { accounts } = useAccounts();
    const { categories } = useCategories();

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return <TransactionsSkeleton />;
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id);
        } catch {
            // Ошибка доступна через mutation.error
        }
    };

    const handleCreate = async (
        data: Parameters<typeof createTransaction>[0],
    ) => {
        try {
            await createTransaction(data);

            setIsModalOpen(false);
        } catch {
            // Ошибка доступна через mutation.error
        }
    };

    return (
        <main className={styles.transactions}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            {t('transactions.title')}
                        </h1>

                        <p className={styles.subtitle}>
                            {t('transactions.subtitle')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        {t('transactions.addTransaction')}
                    </button>
                </header>

                {error && (
                    <div className={styles.error} role="alert">
                        {t('transactions.error')}
                    </div>
                )}

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {t('transactions.recent')}
                    </h2>

                    {transactions.length === 0 ? (
                        <p className={styles.empty}>
                            {t('transactions.noTransactions')}
                        </p>
                    ) : (
                        <div className={styles.list}>
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    onDelete={handleDelete}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                accounts={accounts}
                categories={categories}
                isCreating={isCreating}
                error={
                    createError instanceof Error ? createError.message : null
                }
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
            />
        </main>
    );
};
