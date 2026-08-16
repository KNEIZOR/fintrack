import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountCard, type Account } from '@/widgets/accounts/AccountCard';

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

                const response = await fetch(
                    'http://localhost:4000/api/accounts',
                    {
                        credentials: 'include',
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to load accounts');
                }

                const data = await response.json();

                setAccounts(data.accounts);
            } catch (error) {
                console.error(error);

                setError('Failed to load accounts');
            } finally {
                setIsLoading(false);
            }
        };

        loadAccounts();
    }, []);

    if (isLoading) {
        return <div className={styles.loading}>{t('common.loading')}</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <main className={styles.accounts}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('accounts.title')}</h1>

                    <button type="button" className={styles.addButton}>
                        {t('accounts.addAccount')}
                    </button>
                </header>

                <section>
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
