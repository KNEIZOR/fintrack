import type { CategoryAnalytics } from '@/api/analytics.api';

import { useTranslation } from 'react-i18next';

import styles from './AnalyticsSection.module.scss';

interface Props {
    categories: CategoryAnalytics[];
    currency: string;
}

const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
};

export const AnalyticsCategories = ({ categories, currency }: Props) => {
    const { t } = useTranslation();

    const incomeCategories = categories
        .filter((category) => category.type === 'INCOME')
        .sort((a, b) => b.amount - a.amount);

    const expenseCategories = categories
        .filter((category) => category.type === 'EXPENSE')
        .sort((a, b) => b.amount - a.amount);

    const renderList = (
        items: CategoryAnalytics[],
        emptyText: string,
        type: 'income' | 'expense',
    ) => {
        if (items.length === 0) {
            return <p className={styles.categoryEmpty}>{emptyText}</p>;
        }

        return (
            <div className={styles.categoryList}>
                {items.map((category) => (
                    <div
                        key={category.categoryId}
                        className={styles.categoryRow}
                    >
                        <span className={styles.categoryName}>
                            {category.name}
                        </span>

                        <span
                            className={`
                                    ${styles.categoryAmount}
                                    ${
                                        type === 'income'
                                            ? styles.incomeAmount
                                            : styles.expenseAmount
                                    }
                                `}
                        >
                            {formatCurrency(category.amount, currency)}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>
                    {t('analytics.incomeByCategory')}
                </h3>

                {renderList(
                    incomeCategories,
                    t('analytics.noIncome'),
                    'income',
                )}
            </div>

            <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>
                    {t('analytics.expensesByCategory')}
                </h3>

                {renderList(
                    expenseCategories,
                    t('analytics.noExpenses'),
                    'expense',
                )}
            </div>
        </div>
    );
};
