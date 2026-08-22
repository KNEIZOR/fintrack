import { useAccounts } from '@/pages/AccountsPage/model/useAccounts';
import { useCategories } from '@/pages/CategoriesPage/model/useCategories';
import { ApiErrorMessage } from '@/shared/api/ApiErrorMessage';

import { TransactionModal } from './TransactionModal/TransactionModal';
import { TransactionsFilters } from './TransactionsFilters/TransactionsFilters';
import { TransactionsHeader } from './TransactionsHeader/TransactionsHeader';
import { TransactionsList } from './TransactionsList/TransactionsList';
import { TransactionsSkeleton } from './TransactionsSkeleton/TransactionsSkeleton';

import { useTransactionFilters } from '../model/useTransactionFilters';
import { useTransactionModal } from '../model/useTransactionModal';
import { useTransactions } from '../model/useTransactions';

import styles from './TransactionsPage.module.scss';
import { useTranslation } from 'react-i18next';

export const TransactionsPage = () => {
    const {
        transactions,
        isLoading,
        error,

        isDeleting,
        deleteTransaction,
        deleteError,

        createTransaction,
        isCreating,
        createError,

        updateTransaction,
        isUpdating,
        updateError,
    } = useTransactions();

    const { t } = useTranslation();
    const { accounts } = useAccounts();
    const { categories } = useCategories();

    const {
        search,
        typeFilter,
        accountFilter,
        categoryFilter,
        sort,

        setSearch,
        setTypeFilter,
        setAccountFilter,
        setCategoryFilter,
        setSort,

        filteredTransactions,
    } = useTransactionFilters({
        transactions,
    });

    const {
        selectedTransaction,
        isModalOpen,

        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal,
        handleSubmit,
    } = useTransactionModal({
        transactions,
        isCreating,
        isUpdating,
        createTransaction,
        updateTransaction,
    });

    if (isLoading) {
        return <TransactionsSkeleton />;
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id);
        } catch (error) {
            console.error(error);
        }
    };

    const modalError = selectedTransaction ? updateError : createError;

    return (
        <main className={styles.transactions}>
            <div className={styles.container}>
                <TransactionsHeader
                    isCreating={isCreating}
                    isUpdating={isUpdating}
                    onAddTransaction={handleOpenCreateModal}
                />

                {error && <ApiErrorMessage error={error} />}

                {deleteError && <ApiErrorMessage error={deleteError} />}

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

                    <TransactionsList
                        transactions={transactions}
                        filteredTransactions={filteredTransactions}
                        isDeleting={isDeleting}
                        onEdit={handleOpenEditModal}
                        onDelete={handleDelete}
                    />
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
