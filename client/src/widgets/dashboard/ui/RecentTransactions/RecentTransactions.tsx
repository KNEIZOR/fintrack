import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { DashboardTransaction } from '@/api/dashboard.api';

import styles from './RecentTransactions.module.scss';

interface RecentTransactionsProps {
    transactions: DashboardTransaction[];
}

export const RecentTransactions = ({
    transactions,
}: RecentTransactionsProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleTransactionClick = (id: string) => {
        navigate(`/transactions?edit=${id}`);
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                {t('dashboard.recentTransactions')}
            </h2>

            {transactions.length === 0 ? (
                <p className={styles.empty}>{t('dashboard.noTransactions')}</p>
            ) : (
                <div className={styles.list}>
                    {transactions.map((transaction) => {
                        const isIncome = transaction.type === 'INCOME';

                        return (
                            <button
                                type="button"
                                className={styles.item}
                                key={transaction.id}
                                onClick={() =>
                                    handleTransactionClick(transaction.id)
                                }
                            >
                                <div className={styles.info}>
                                    <strong>{transaction.category.name}</strong>

                                    <span>
                                        {transaction.description || '—'}
                                    </span>
                                </div>

                                <strong
                                    className={
                                        isIncome
                                            ? styles.income
                                            : styles.expense
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
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
