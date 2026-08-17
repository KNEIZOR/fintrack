import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

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

    const {
        dashboard,
        isLoading: isDashboardLoading,
        error: dashboardError,
    } = useDashboard();

    const {
        analytics,
        isLoading: isAnalyticsLoading,
        error: analyticsError,
    } = useAnalytics();

    const isLoading = isDashboardLoading || isAnalyticsLoading;

    const error = dashboardError ?? analyticsError;

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <main className={styles.dashboard}>
                <div className={styles.container}>
                    <div className={styles.error}>{t('dashboard.error')}</div>
                </div>
            </main>
        );
    }

    if (!dashboard) {
        return null;
    }

    return (
        <main className={styles.dashboard}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('dashboard.title')}</h1>

                    <p className={styles.subtitle}>
                        {t('dashboard.recentTransactions')}
                    </p>
                </header>

                <section className={styles.balance}>
                    <BalanceCard
                        balance={dashboard.balance}
                        currency={dashboard.accounts[0]?.currency ?? 'EUR'}
                    />
                </section>

                <div className={styles.stats}>
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
                </div>

                <div className={styles.content}>
                    <RecentTransactions
                        transactions={dashboard.recentTransactions}
                    />
                </div>

                {analytics && (
                    <Suspense
                        fallback={
                            <div className={styles.analyticsLoading}>
                                {t('common.loading')}
                            </div>
                        }
                    >
                        <AnalyticsSection analytics={analytics} />
                    </Suspense>
                )}
            </div>
        </main>
    );
};
