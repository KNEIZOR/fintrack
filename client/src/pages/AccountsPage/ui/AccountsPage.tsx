import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAccounts, type Account } from '@/api/accounts.api';
import { AccountCard } from '@/widgets/accounts/AccountCard';

import { AccountsSkeleton } from './AccountsSkeleton/AccountsSkeleton';

import styles from './AccountsPage.module.scss';

export const AccountsPage = () => {
    const { t } = useTranslation();

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getAccounts();

                setAccounts(data);
            } catch (error) {
                console.error(error);

                setError(t('accounts.error'));
            } finally {
                setIsLoading(false);
            }
        };

        loadAccounts();
    }, [t]);

    if (isLoading) {
        return <AccountsSkeleton />;
    }

    if (error) {
        return (
            <main className={styles.accounts}>
                <div className={styles.container}>
                    <div className={styles.error}>{error}</div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.accounts}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>{t('accounts.title')}</h1>

                        <p className={styles.subtitle}>
                            {t('accounts.subtitle')}
                        </p>
                    </div>

                    <button type="button" className={styles.addButton}>
                        {t('accounts.addAccount')}
                    </button>
                </header>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {t('accounts.yourAccounts')}
                    </h2>

                    {accounts.length === 0 ? (
                        <p className={styles.empty}>
                            {t('accounts.noAccounts')}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {accounts.map((account) => (
                                <AccountCard
                                    key={account.id}
                                    account={account}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};
