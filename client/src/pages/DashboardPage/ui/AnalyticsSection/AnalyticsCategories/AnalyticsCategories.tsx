import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { AnalyticsData } from '@/api/analytics.api';

import { formatCurrency } from '../AnalyticsChart/model/formatters';

import styles from './AnalyticsCategories.module.scss';

interface Props {
    analytics: AnalyticsData;

    currency: string;
}

type CategoryType = 'EXPENSE' | 'INCOME';

interface CategorySegment {
    categoryId: string;

    name: string;

    amount: number;

    percentage: number;

    color: string;
}

const COLORS = [
    '#2563eb',
    '#16a34a',
    '#dc2626',
    '#9333ea',
    '#ea580c',
    '#0891b2',
    '#ca8a04',
    '#db2777',
];

const MAX_VISIBLE_CATEGORIES = 5;

export const AnalyticsCategories = ({ analytics, currency }: Props) => {
    const { t } = useTranslation();

    const [type, setType] = useState<CategoryType>('EXPENSE');

    const categories = useMemo(() => {
        return analytics.categories
            .filter((category) => category.type === type)
            .filter((category) => category.amount > 0)
            .sort((a, b) => b.amount - a.amount);
    }, [analytics.categories, type]);

    const total = useMemo(() => {
        return categories.reduce((sum, category) => sum + category.amount, 0);
    }, [categories]);

    const hasData = categories.length > 0 && total > 0;

    const segments = useMemo<CategorySegment[]>(() => {
        if (!hasData) {
            return [];
        }

        const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);

        const hiddenCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

        const hiddenAmount = hiddenCategories.reduce(
            (sum, category) => sum + category.amount,
            0,
        );

        const preparedCategories = [
            ...visibleCategories.map((category, index) => ({
                categoryId: category.categoryId,

                name: category.name,

                amount: category.amount,

                color: COLORS[index % COLORS.length],
            })),

            ...(hiddenAmount > 0
                ? [
                      {
                          categoryId: 'other',

                          name: t('analytics.other'),

                          amount: hiddenAmount,

                          color: COLORS[MAX_VISIBLE_CATEGORIES % COLORS.length],
                      },
                  ]
                : []),
        ];

        return preparedCategories.map((category) => ({
            ...category,

            percentage: category.amount / total,
        }));
    }, [categories, hasData, t, total]);

    let currentOffset = 0;

    const segmentsWithOffset = segments.map((segment) => {
        const dashLength = segment.percentage * 100;

        const offset = -currentOffset;

        currentOffset += dashLength;

        return {
            ...segment,

            dashLength,

            offset,
        };
    });

    return (
        <section className={styles.categories}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>
                        {t('analytics.categoriesTitle')}
                    </h3>

                    <p className={styles.subtitle}>
                        {t('analytics.categoriesSubtitle')}
                    </p>
                </div>

                <div className={styles.switcher}>
                    <button
                        type="button"
                        className={
                            type === 'EXPENSE'
                                ? styles.activeButton
                                : styles.button
                        }
                        onClick={() => setType('EXPENSE')}
                        aria-pressed={type === 'EXPENSE'}
                    >
                        {t('analytics.expenses')}
                    </button>

                    <button
                        type="button"
                        className={
                            type === 'INCOME'
                                ? styles.activeButton
                                : styles.button
                        }
                        onClick={() => setType('INCOME')}
                        aria-pressed={type === 'INCOME'}
                    >
                        {t('analytics.income')}
                    </button>
                </div>
            </div>

            {!hasData ? (
                <div className={styles.empty}>
                    {type === 'EXPENSE'
                        ? t('analytics.noExpenses')
                        : t('analytics.noIncome')}
                </div>
            ) : (
                <div className={styles.content}>
                    <div className={styles.chart}>
                        <svg
                            viewBox="0 0 100 100"
                            className={styles.donut}
                            role="img"
                            aria-label={t('analytics.categoriesChartLabel')}
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="38"
                                pathLength="100"
                                className={styles.donutBackground}
                            />

                            {segmentsWithOffset.map((segment) => (
                                <circle
                                    key={segment.categoryId}
                                    cx="50"
                                    cy="50"
                                    r="38"
                                    pathLength="100"
                                    className={styles.segment}
                                    stroke={segment.color}
                                    strokeDasharray={`${segment.dashLength} ${
                                        100 - segment.dashLength
                                    }`}
                                    strokeDashoffset={segment.offset}
                                />
                            ))}
                        </svg>

                        <div className={styles.center}>
                            <span className={styles.totalLabel}>
                                {t('analytics.total')}
                            </span>

                            <strong className={styles.total}>
                                {formatCurrency(total, currency)}
                            </strong>
                        </div>
                    </div>

                    <div className={styles.list}>
                        {segments.map((category) => (
                            <div
                                key={category.categoryId}
                                className={styles.item}
                            >
                                <div className={styles.itemInfo}>
                                    <span
                                        className={styles.dot}
                                        style={{
                                            backgroundColor: category.color,
                                        }}
                                    />

                                    <span className={styles.categoryName}>
                                        {category.name}
                                    </span>
                                </div>

                                <div className={styles.itemValues}>
                                    <strong>
                                        {formatCurrency(
                                            category.amount,
                                            currency,
                                        )}
                                    </strong>

                                    <span>
                                        {Math.round(category.percentage * 100)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default AnalyticsCategories;
