import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type {
    CreateTransactionInput,
    Transaction,
    UpdateTransactionInput,
} from '@/api/transactions.api';

import { useAccounts } from '@/pages/AccountsPage/model/useAccounts';
import { useCategories } from '@/pages/CategoriesPage/model/useCategories';

import { TransactionCard } from '@/widgets/transactions/TransactionCard';

import {
    TransactionsFilters,
    type TransactionSort,
    type TransactionTypeFilter,
} from './TransactionsFilters/TransactionsFilters';

import { TransactionsSkeleton } from './TransactionsSkeleton/TransactionsSkeleton';
import { TransactionModal } from './TransactionModal/TransactionModal';
import { useTransactions } from '../model/useTransactions';

import styles from './TransactionsPage.module.scss';

export const TransactionsPage = () => {
    const { t } = useTranslation();

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

    // Filters
    const [search, setSearch] = useState('');

    const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>('ALL');

    const [accountFilter, setAccountFilter] = useState('');

    const [categoryFilter, setCategoryFilter] = useState('');

    const [sort, setSort] = useState<TransactionSort>('DATE_DESC');

    if (isLoading) {
        return <TransactionsSkeleton />;
    }

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
            } else {
                await createTransaction(data as CreateTransactionInput);

                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredTransactions = transactions
        .filter((transaction) => {
            if (typeFilter !== 'ALL' && transaction.type !== typeFilter) {
                return false;
            }

            if (accountFilter && transaction.accountId !== accountFilter) {
                return false;
            }

            if (categoryFilter && transaction.categoryId !== categoryFilter) {
                return false;
            }

            if (search.trim()) {
                const query = search.trim().toLowerCase();

                const description =
                    transaction.description?.toLowerCase() ?? '';

                const category = transaction.category.name.toLowerCase();

                const account = transaction.account.name.toLowerCase();

                if (
                    !description.includes(query) &&
                    !category.includes(query) &&
                    !account.includes(query)
                ) {
                    return false;
                }
            }

            return true;
        })
        .sort((a, b) => {
            if (sort === 'DATE_DESC') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }

            if (sort === 'DATE_ASC') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }

            if (sort === 'AMOUNT_DESC') {
                return Number(b.amount) - Number(a.amount);
            }

            return Number(a.amount) - Number(b.amount);
        });

    const modalError = selectedTransaction ? updateError : createError;

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
                        onClick={handleOpenCreateModal}
                        disabled={isCreating || isUpdating}
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
                    <div className={styles.sectionHeader}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                {t('transactions.recent')}
                            </h2>

                            <p className={styles.sectionCount}>
                                {filteredTransactions.length}
                            </p>
                        </div>
                    </div>

                    <TransactionsFilters
                        search={search}
                        type={typeFilter}
                        accountId={accountFilter}
                        categoryId={categoryFilter}
                        sort={sort}
                        accounts={accounts}
                        categories={categories}
                        onSearchChange={setSearch}
                        onTypeChange={setTypeFilter}
                        onAccountChange={setAccountFilter}
                        onCategoryChange={setCategoryFilter}
                        onSortChange={setSort}
                    />

                    {transactions.length === 0 ? (
                        <p className={styles.empty}>
                            {t('transactions.noTransactions')}
                        </p>
                    ) : filteredTransactions.length === 0 ? (
                        <p className={styles.empty}>
                            {t('transactions.noFilteredTransactions')}
                        </p>
                    ) : (
                        <div className={styles.list}>
                            {filteredTransactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    onEdit={handleOpenEditModal}
                                    onDelete={handleDelete}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <TransactionModal
                key={
                    selectedTransaction
                        ? selectedTransaction.id
                        : 'create-transaction'
                }
                isOpen={isModalOpen}
                transaction={selectedTransaction}
                accounts={accounts}
                categories={categories}
                isSubmitting={isCreating || isUpdating}
                error={modalError ?? null}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </main>
    );
};
