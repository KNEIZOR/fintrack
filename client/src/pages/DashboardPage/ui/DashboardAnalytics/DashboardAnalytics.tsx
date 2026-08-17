import { useTranslation } from 'react-i18next';

import type { AnalyticsData } from '@/api/analytics.api';

import { MonthlyChart } from './MonthlyChart';

import styles from './DashboardAnalytics.module.scss';

interface DashboardAnalyticsProps {
    analytics: AnalyticsData;
}

export const DashboardAnalytics = ({ analytics }: DashboardAnalyticsProps) => {
    const { t } = useTranslation();

    return (
        <section className={styles.analytics}>
            <header className={styles.header}>
                <div>
                    <h2 className={styles.title}>{t('dashboard.analytics')}</h2>

                    <p className={styles.subtitle}>
                        {t('dashboard.analyticsSubtitle')}
                    </p>
                </div>
            </header>

            <MonthlyChart data={analytics.monthly} />
        </section>
    );
};
