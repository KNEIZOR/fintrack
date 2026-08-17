import type { AnalyticsData } from '@/api/analytics.api';
import { useTranslation } from 'react-i18next';

import styles from './AnalyticsSection.module.scss';

interface AnalyticsSectionProps {
    analytics: AnalyticsData;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(value);
};

export const AnalyticsSection = ({ analytics }: AnalyticsSectionProps) => {
    const { t } = useTranslation();

    const monthly = analytics.monthly;

    if (monthly.length === 0) {
        return (
            <section className={styles.analytics}>
                <header className={styles.header}>
                    <div>
                        <h2 className={styles.title}>{t('analytics.title')}</h2>

                        <p className={styles.subtitle}>
                            {t('analytics.subtitle')}
                        </p>
                    </div>
                </header>

                <div className={styles.empty}>{t('analytics.noData')}</div>
            </section>
        );
    }

    const width = 800;
    const height = 320;

    const paddingTop = 20;
    const paddingRight = 20;
    const paddingBottom = 45;
    const paddingLeft = 60;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const values = monthly.flatMap((item) => [
        item.income,
        item.expenses,
        item.net,
    ]);

    const maxValue = Math.max(...values, 0);
    const minValue = Math.min(...values, 0);

    const range = maxValue - minValue || 1;

    const getX = (index: number) => {
        if (monthly.length === 1) {
            return paddingLeft + chartWidth / 2;
        }

        return paddingLeft + (index / (monthly.length - 1)) * chartWidth;
    };

    const getY = (value: number) => {
        return paddingTop + ((maxValue - value) / range) * chartHeight;
    };

    const createPath = (values: number[]) => {
        return values
            .map((value, index) => {
                const x = getX(index);
                const y = getY(value);

                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    };

    const incomePath = createPath(monthly.map((item) => item.income));

    const expensesPath = createPath(monthly.map((item) => item.expenses));

    const netPath = createPath(monthly.map((item) => item.net));

    const gridLines = 5;

    const incomeCategories = analytics.categories
        .filter((category) => category.type === 'INCOME')
        .sort((a, b) => b.amount - a.amount);

    const expenseCategories = analytics.categories
        .filter((category) => category.type === 'EXPENSE')
        .sort((a, b) => b.amount - a.amount);

    return (
        <section className={styles.analytics}>
            <header className={styles.header}>
                <div>
                    <h2 className={styles.title}>{t('analytics.title')}</h2>

                    <p className={styles.subtitle}>{t('analytics.subtitle')}</p>
                </div>
            </header>

            <div className={styles.chartWrapper}>
                <svg
                    className={styles.chart}
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                    role="img"
                    aria-label={t('analytics.chartLabel')}
                >
                    {Array.from({
                        length: gridLines + 1,
                    }).map((_, index) => {
                        const y =
                            paddingTop + (index / gridLines) * chartHeight;

                        const value = maxValue - (index / gridLines) * range;

                        return (
                            <g key={index}>
                                <line
                                    x1={paddingLeft}
                                    y1={y}
                                    x2={width - paddingRight}
                                    y2={y}
                                    className={styles.gridLine}
                                />

                                <text
                                    x={paddingLeft - 10}
                                    y={y + 4}
                                    textAnchor="end"
                                    className={styles.axisLabel}
                                >
                                    {formatCurrency(value)}
                                </text>
                            </g>
                        );
                    })}

                    {monthly.map((item, index) => (
                        <text
                            key={item.month}
                            x={getX(index)}
                            y={height - 15}
                            textAnchor="middle"
                            className={styles.axisLabel}
                        >
                            {item.month}
                        </text>
                    ))}

                    <path
                        d={incomePath}
                        className={`${styles.line} ${styles.incomeLine}`}
                    />

                    <path
                        d={expensesPath}
                        className={`${styles.line} ${styles.expensesLine}`}
                    />

                    <path
                        d={netPath}
                        className={`${styles.line} ${styles.netLine}`}
                    />

                    {monthly.map((item, index) => (
                        <circle
                            key={`income-${item.month}`}
                            cx={getX(index)}
                            cy={getY(item.income)}
                            r="4"
                            className={styles.incomePoint}
                        />
                    ))}

                    {monthly.map((item, index) => (
                        <circle
                            key={`expenses-${item.month}`}
                            cx={getX(index)}
                            cy={getY(item.expenses)}
                            r="4"
                            className={styles.expensesPoint}
                        />
                    ))}

                    {monthly.map((item, index) => (
                        <circle
                            key={`net-${item.month}`}
                            cx={getX(index)}
                            cy={getY(item.net)}
                            r="4"
                            className={styles.netPoint}
                        />
                    ))}
                </svg>
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <span
                        className={`${styles.legendDot} ${styles.incomeDot}`}
                    />

                    <span>{t('analytics.income')}</span>
                </div>

                <div className={styles.legendItem}>
                    <span
                        className={`${styles.legendDot} ${styles.expensesDot}`}
                    />

                    <span>{t('analytics.expenses')}</span>
                </div>

                <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.netDot}`} />

                    <span>{t('analytics.net')}</span>
                </div>
            </div>

            <div className={styles.categoryGrid}>
                <div className={styles.categoryCard}>
                    <h3 className={styles.categoryTitle}>
                        {t('analytics.incomeByCategory')}
                    </h3>

                    {incomeCategories.length === 0 ? (
                        <p className={styles.categoryEmpty}>
                            {t('analytics.noIncome')}
                        </p>
                    ) : (
                        <div className={styles.categoryList}>
                            {incomeCategories.map((category) => (
                                <div
                                    key={`${category.categoryId}-income`}
                                    className={styles.categoryRow}
                                >
                                    <span className={styles.categoryName}>
                                        {category.name}
                                    </span>

                                    <span
                                        className={`${styles.categoryAmount} ${styles.incomeAmount}`}
                                    >
                                        {formatCurrency(category.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.categoryCard}>
                    <h3 className={styles.categoryTitle}>
                        {t('analytics.expensesByCategory')}
                    </h3>

                    {expenseCategories.length === 0 ? (
                        <p className={styles.categoryEmpty}>
                            {t('analytics.noExpenses')}
                        </p>
                    ) : (
                        <div className={styles.categoryList}>
                            {expenseCategories.map((category) => (
                                <div
                                    key={`${category.categoryId}-expense`}
                                    className={styles.categoryRow}
                                >
                                    <span className={styles.categoryName}>
                                        {category.name}
                                    </span>

                                    <span
                                        className={`${styles.categoryAmount} ${styles.expenseAmount}`}
                                    >
                                        {formatCurrency(category.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AnalyticsSection;
