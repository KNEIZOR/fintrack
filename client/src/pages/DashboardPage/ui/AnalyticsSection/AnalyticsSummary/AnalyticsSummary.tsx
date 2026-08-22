import { useTranslation } from 'react-i18next';

import type { AnalyticsData } from '@/api/analytics.api';

import { formatCurrency } from '../AnalyticsChart/model/formatters';

import styles from './AnalyticsSummary.module.scss';

interface Props {
    analytics: AnalyticsData;
    currency: string;
}

type SummaryType = 'income' | 'expense' | 'net';

export const AnalyticsSummary = ({ analytics, currency }: Props) => {
    const { t } = useTranslation();

    const { summary } = analytics;

    const items: {
        title: string;
        value: number;
        change: number;
        type: SummaryType;
    }[] = [
        {
            title: t('analytics.income'),
            value: summary.income,
            change: summary.incomeChange,
            type: 'income',
        },
        {
            title: t('analytics.expenses'),
            value: summary.expenses,
            change: summary.expensesChange,
            type: 'expense',
        },
        {
            title: t('analytics.net'),
            value: summary.net,
            change: summary.netChange,
            type: 'net',
        },
    ];

    const formatChange = (change: number) => {
        if (!Number.isFinite(change)) {
            return '0%';
        }

        const rounded = Math.round(change * 10) / 10;

        if (rounded === 0) {
            return '0%';
        }

        return `${rounded > 0 ? '+' : ''}${rounded}%`;
    };

    const getChangeIcon = (change: number) => {
        if (change > 0) {
            return '↑';
        }

        if (change < 0) {
            return '↓';
        }

        return '→';
    };

    const getChangeClassName = (type: SummaryType, change: number) => {
        if (change === 0 || !Number.isFinite(change)) {
            return styles.changeNeutral;
        }

        const isPositive = type === 'expense' ? change < 0 : change > 0;

        return isPositive ? styles.changePositive : styles.changeNegative;
    };

    const getChangeLabel = (type: SummaryType, change: number) => {
        if (change === 0 || !Number.isFinite(change)) {
            return t('analytics.noChange');
        }

        const isPositive = type === 'expense' ? change < 0 : change > 0;

        return isPositive ? t('analytics.improved') : t('analytics.decreased');
    };

    return (
        <div className={styles.summary}>
            {items.map((item) => (
                <div
                    key={item.type}
                    className={`${styles.card} ${styles[item.type]}`}
                >
                    <span className={styles.title}>{item.title}</span>

                    <strong className={styles.value}>
                        {formatCurrency(item.value, currency)}
                    </strong>

                    <div className={styles.changeWrapper}>
                        <span
                            className={`${styles.change} ${getChangeClassName(
                                item.type,
                                item.change,
                            )}`}
                        >
                            <span
                                className={styles.changeIcon}
                                aria-hidden="true"
                            >
                                {getChangeIcon(item.change)}
                            </span>

                            <span>{formatChange(item.change)}</span>
                        </span>

                        <span className={styles.changeLabel}>
                            {getChangeLabel(item.type, item.change)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
