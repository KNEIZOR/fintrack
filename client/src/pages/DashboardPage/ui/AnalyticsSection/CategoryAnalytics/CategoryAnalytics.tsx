import { useTranslation } from 'react-i18next';

import type { AnalyticsData } from '@/api/analytics.api';

import { formatCurrency } from '../AnalyticsChart/model/formatters';

import styles from './CategoryAnalytics.module.scss';

interface Props {
    analytics: AnalyticsData;
    currency: string;
}

export const CategoryAnalytics = ({ analytics, currency }: Props) => {
    const { t } = useTranslation();

    const incomeCategories = analytics.categories
        .filter((category) => category.type === 'INCOME')
        .sort((a, b) => b.amount - a.amount);

    const expenseCategories = analytics.categories
        .filter((category) => category.type === 'EXPENSE')
        .sort((a, b) => b.amount - a.amount);

    return (
        <div className={styles.grid}>
            <CategoryCard
                title={t('analytics.incomeByCategory')}
                empty={t('analytics.noIncome')}
                categories={incomeCategories}
                currency={currency}
                type="income"
            />

            <CategoryCard
                title={t('analytics.expensesByCategory')}
                empty={t('analytics.noExpenses')}
                categories={expenseCategories}
                currency={currency}
                type="expense"
            />
        </div>
    );
};

interface CategoryCardProps {
    title: string;

    empty: string;

    categories: AnalyticsData['categories'];

    currency: string;

    type: 'income' | 'expense';
}

const CategoryCard = ({
    title,
    empty,
    categories,
    currency,
    type,
}: CategoryCardProps) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>

            {categories.length === 0 ? (
                <p className={styles.empty}>{empty}</p>
            ) : (
                <div className={styles.list}>
                    {categories.map((category) => (
                        <div key={category.categoryId} className={styles.row}>
                            <span>{category.name}</span>

                            <strong
                                className={
                                    type === 'income'
                                        ? styles.income
                                        : styles.expense
                                }
                            >
                                {formatCurrency(category.amount, currency)}
                            </strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
