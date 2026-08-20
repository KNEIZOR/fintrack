import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from '@/api/transactions.api';

import styles from './TransactionCard.module.scss';

interface TransactionCardProps {
    transaction: Transaction;

    onEdit?: (transaction: Transaction) => void;

    onDelete?: (id: string) => void;

    isDeleting?: boolean;
}

export const TransactionCard = ({
    transaction,
    onEdit,
    onDelete,
    isDeleting = false,
}: TransactionCardProps) => {
    const { t } = useTranslation();

    const isIncome = transaction.type === 'INCOME';

    const formattedAmount = Number(transaction.amount).toLocaleString('en-US', {
        style: 'currency',
        currency: transaction.account.currency,
    });

    const formattedDate = new Date(transaction.date).toLocaleDateString(
        'en-GB',
    );

    const handleEdit = () => {
        if (isDeleting || !onEdit) {
            return;
        }

        onEdit(transaction);
    };

    const handleDelete = () => {
        if (isDeleting || !onDelete) {
            return;
        }

        const confirmed = window.confirm(t('transactions.deleteConfirmation'));

        if (!confirmed) {
            return;
        }

        onDelete(transaction.id);
    };

    return (
        <article className={styles.card}>
            <div
                className={`${styles.icon} ${
                    isIncome ? styles.income : styles.expense
                }`}
            >
                {isIncome ? (
                    <ArrowDownLeft size={20} />
                ) : (
                    <ArrowUpRight size={20} />
                )}
            </div>

            <div className={styles.info}>
                <h3 className={styles.description}>
                    {transaction.description || transaction.category.name}
                </h3>

                <div className={styles.meta}>
                    <span>{transaction.category.name}</span>
                    <span>•</span>
                    <span>{transaction.account.name}</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                </div>
            </div>

            <div className={styles.right}>
                <strong
                    className={`${styles.amount} ${
                        isIncome ? styles.incomeAmount : styles.expenseAmount
                    }`}
                >
                    {isIncome ? '+' : '-'}
                    {formattedAmount}
                </strong>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.editButton}
                        onClick={handleEdit}
                        disabled={isDeleting}
                        aria-label={t('common.edit')}
                    >
                        <Pencil size={17} />
                    </button>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label={t('common.delete')}
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            </div>
        </article>
    );
};
