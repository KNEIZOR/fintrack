import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDashboard, type DashboardData } from '@/api/dashboard.api';

import { getAnalytics } from '@/api/analytics.api';

import { BalanceCard } from '@/widgets/dashboard/ui/BalanceCard';
import { StatCard } from '@/widgets/dashboard/ui/StatCard';
import { RecentTransactions } from '@/widgets/dashboard/ui/RecentTransactions';

import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
    const { t } = useTranslation();

    const [dashboard, setDashboard] = useState<DashboardData | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [dashboardData, analyticsData] = await Promise.all([
                    getDashboard(),
                    getAnalytics(),
                ]);

                console.log('Dashboard:', dashboardData);
                console.log('Analytics:', analyticsData);

                setDashboard(dashboardData);
            } catch (error) {
                console.error(error);

                setError('Failed to load dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (isLoading) {
        return <div className={styles.loading}>{t('dashboard.loading')}</div>;
    }

    if (error) {
        return <div className={styles.error}>{t('dashboard.error')}</div>;
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
            </div>
        </main>
    );
};
