import { memo } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from '@/api/transactions.api';

import styles from '../TransactionsPage.module.scss';

interface TransactionsTableProps {
    transactions: Transaction[];
}

export const TransactionsTable = memo(
    ({ transactions }: TransactionsTableProps) => {
        const { t } = useTranslation();

        return (
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('transactions.category')}</th>

                            <th>{t('transactions.account')}</th>

                            <th>{t('transactions.description')}</th>

                            <th>{t('transactions.date')}</th>

                            <th>{t('transactions.amount')}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => {
                            const isIncome = transaction.type === 'INCOME';

                            return (
                                <tr key={transaction.id}>
                                    <td>
                                        <div className={styles.categoryCell}>
                                            <div
                                                className={`${
                                                    styles.transactionIcon
                                                } ${
                                                    isIncome
                                                        ? styles.incomeIcon
                                                        : styles.expenseIcon
                                                }`}
                                            >
                                                {isIncome ? (
                                                    <ArrowUpRight size={18} />
                                                ) : (
                                                    <ArrowDownLeft size={18} />
                                                )}
                                            </div>

                                            <strong>
                                                {transaction.category.name}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>{transaction.account.name}</td>

                                    <td>{transaction.description || '—'}</td>

                                    <td>
                                        {new Date(
                                            transaction.date,
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <strong
                                            className={
                                                isIncome
                                                    ? styles.incomeAmount
                                                    : styles.expenseAmount
                                            }
                                        >
                                            {isIncome ? '+' : '-'}
                                            {Number(
                                                transaction.amount,
                                            ).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency:
                                                    transaction.account
                                                        .currency,
                                            })}
                                        </strong>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    },
);

TransactionsTable.displayName = 'TransactionsTable';
