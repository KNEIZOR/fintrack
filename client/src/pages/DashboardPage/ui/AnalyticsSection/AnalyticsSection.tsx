import type { AnalyticsData, AnalyticsPeriod } from '@/api/analytics.api';

import { useTranslation } from 'react-i18next';

import { AnalyticsChart } from './AnalyticsChart/AnalyticsChart';
import { AnalyticsSummary } from './AnalyticsSummary/AnalyticsSummary';
import { AnalyticsPeriodSwitcher } from './AnalyticsPeriodSwitcher/AnalyticsPeriodSwitcher';

import styles from './AnalyticsSection.module.scss';
import { AnalyticsCategories } from './AnalyticsCategories/AnalyticsCategories';

interface AnalyticsSectionProps {
    analytics: AnalyticsData;

    period: AnalyticsPeriod;

    onPeriodChange: (period: AnalyticsPeriod) => void;

    currency: string;

    isFetching?: boolean;
}

export const AnalyticsSection = ({
    analytics,
    period,
    onPeriodChange,
    currency,
    isFetching = false,
}: AnalyticsSectionProps) => {
    const { t } = useTranslation();

    return (
        <section className={styles.analytics}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>{t('analytics.title')}</h2>

                    <p className={styles.subtitle}>{t('analytics.subtitle')}</p>
                </div>

                <AnalyticsPeriodSwitcher
                    value={period}
                    onChange={onPeriodChange}
                    disabled={isFetching}
                />
            </div>

            <div
                className={`${styles.content} ${
                    isFetching ? styles.contentFetching : ''
                }`}
            >
                <AnalyticsSummary analytics={analytics} currency={currency} />

                <AnalyticsChart analytics={analytics} currency={currency} />

                <AnalyticsCategories
                    analytics={analytics}
                    currency={currency}
                />

                {isFetching && (
                    <div
                        className={styles.fetching}
                        aria-live="polite"
                        aria-label={t('analytics.updating')}
                    >
                        <span className={styles.fetchingSpinner} />

                        <span>{t('analytics.updating')}</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnalyticsSection;
