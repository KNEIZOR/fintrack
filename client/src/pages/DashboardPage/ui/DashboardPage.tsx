import { lazy, Suspense, useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { AnalyticsPeriod } from '@/api/analytics.api';

import { BalanceCard } from '@/widgets/dashboard/ui/BalanceCard';

import { StatCard } from '@/widgets/dashboard/ui/StatCard';

import { RecentTransactions } from '@/widgets/dashboard/ui/RecentTransactions';

import { DashboardSkeleton } from './DashboardSkeleton/DashboardSkeleton';

import { useDashboard } from '../model/useDashboard';

import { useAnalytics } from '../model/useAnalytics';

import styles from './DashboardPage.module.scss';

const AnalyticsSection = lazy(
    () => import('./AnalyticsSection/AnalyticsSection'),
);

export const DashboardPage = () => {
    const { t } = useTranslation();

    const [analyticsPeriod, setAnalyticsPeriod] =
        useState<AnalyticsPeriod>('6m');

    const {
        dashboard,
        isLoading: isDashboardLoading,
        error: dashboardError,
    } = useDashboard();

    const {
        data: analytics,
        isLoading: isAnalyticsLoading,
        isFetching: isAnalyticsFetching,
        error: analyticsError,
    } = useAnalytics(analyticsPeriod);

    const isLoading = isDashboardLoading || isAnalyticsLoading;

    const error = dashboardError ?? analyticsError;

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <main className={styles.dashboard}>
                <div className={styles.container}>
                    <div className={styles.error} role="alert">
                        {t('dashboard.error')}
                    </div>
                </div>
            </main>
        );
    }

    if (!dashboard) {
        return null;
    }

    const currency = dashboard.accounts[0]?.currency ?? 'EUR';

    return (
        <main className={styles.dashboard}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('dashboard.title')}</h1>

                    <p className={styles.subtitle}>{t('dashboard.subtitle')}</p>
                </header>

                <section className={styles.balance}>
                    <BalanceCard
                        balance={dashboard.balance}
                        currency={currency}
                    />
                </section>

                <section
                    className={styles.stats}
                    aria-label={t('dashboard.title')}
                >
                    <StatCard
                        title={t('dashboard.income')}
                        value={dashboard.income}
                        type="income"
                    />

                    <StatCard
                        title={t('dashboard.expenses')}
                        value={dashboard.expenses}
                        type="expense"
                    />

                    <StatCard
                        title={t('dashboard.net')}
                        value={dashboard.net}
                        type="neutral"
                    />
                </section>

                <section className={styles.content}>
                    <RecentTransactions
                        transactions={dashboard.recentTransactions}
                    />
                </section>

                {analytics && (
                    <Suspense
                        fallback={
                            <div className={styles.analyticsLoading}>
                                {t('common.loading')}
                            </div>
                        }
                    >
                        <AnalyticsSection
                            analytics={analytics}
                            period={analyticsPeriod}
                            onPeriodChange={setAnalyticsPeriod}
                            currency={currency}
                            isFetching={isAnalyticsFetching}
                        />
                    </Suspense>
                )}
            </div>
        </main>
    );
};
