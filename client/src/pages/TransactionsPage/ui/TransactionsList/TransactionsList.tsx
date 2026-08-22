import { useTranslation } from 'react-i18next';

import type { Transaction } from '@/api/transactions.api';

import { TransactionCard } from '@/widgets/transactions/TransactionCard';

import styles from './TransactionsList.module.scss';

interface TransactionsListProps {
    transactions: Transaction[];
    filteredTransactions: Transaction[];

    isDeleting: boolean;

    onEdit: (transaction: Transaction) => void;
    onDelete: (id: string) => Promise<void>;
}

export const TransactionsList = ({
    transactions,
    filteredTransactions,
    isDeleting,
    onEdit,
    onDelete,
}: TransactionsListProps) => {
    const { t } = useTranslation();

    if (transactions.length === 0) {
        return (
            <p className={styles.empty}>{t('transactions.noTransactions')}</p>
        );
    }

    if (filteredTransactions.length === 0) {
        return (
            <p className={styles.empty}>
                {t('transactions.noFilteredTransactions')}
            </p>
        );
    }

    return (
        <div className={styles.list}>
            {filteredTransactions.map((transaction) => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                />
            ))}
        </div>
    );
};
