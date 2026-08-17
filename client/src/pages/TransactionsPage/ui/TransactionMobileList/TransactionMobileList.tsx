import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import type { Transaction } from '@/api/transactions.api';

import styles from '../TransactionsPage.module.scss';
import { memo } from 'react';

interface TransactionMobileListProps {
    transactions: Transaction[];
}

export const TransactionMobileList = memo(
    ({ transactions }: TransactionMobileListProps) => {
        return (
            <div className={styles.mobileList}>
                {transactions.map((transaction) => {
                    const isIncome = transaction.type === 'INCOME';

                    return (
                        <article
                            key={transaction.id}
                            className={styles.mobileCard}
                        >
                            <div className={styles.mobileTop}>
                                <div className={styles.categoryCell}>
                                    <div
                                        className={`${styles.transactionIcon} ${
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

                                    <div>
                                        <strong>
                                            {transaction.category.name}
                                        </strong>

                                        <span className={styles.mobileAccount}>
                                            {transaction.account.name}
                                        </span>
                                    </div>
                                </div>

                                <strong
                                    className={
                                        isIncome
                                            ? styles.incomeAmount
                                            : styles.expenseAmount
                                    }
                                >
                                    {isIncome ? '+' : '-'}
                                    {Number(transaction.amount).toLocaleString(
                                        'en-US',
                                        {
                                            style: 'currency',
                                            currency:
                                                transaction.account.currency,
                                        },
                                    )}
                                </strong>
                            </div>

                            <div className={styles.mobileBottom}>
                                <span>{transaction.description || '—'}</span>

                                <span>
                                    {new Date(
                                        transaction.date,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    },
);
