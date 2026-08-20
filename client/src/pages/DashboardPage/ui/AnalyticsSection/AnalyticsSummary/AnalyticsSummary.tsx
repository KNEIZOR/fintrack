import { useTranslation } from 'react-i18next';

import type { AnalyticsData } from '@/api/analytics.api';

import { formatCurrency } from '../AnalyticsChart/model/formatters';

import styles from './AnalyticsSummary.module.scss';

interface Props {
    analytics: AnalyticsData;

    currency: string;
}

export const AnalyticsSummary = ({ analytics, currency }: Props) => {
    const { t } = useTranslation();

    const { summary } = analytics;

    const items = [
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
            return '0.0%';
        }

        const roundedChange = Number(change.toFixed(1));

        if (roundedChange > 0) {
            return `+${roundedChange}%`;
        }

        return `${roundedChange}%`;
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

                    <span className={styles.change}>
                        {formatChange(item.change)}
                    </span>
                </div>
            ))}
        </div>
    );
};
