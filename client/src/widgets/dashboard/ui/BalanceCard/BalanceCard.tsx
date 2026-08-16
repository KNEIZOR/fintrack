import { useTranslation } from 'react-i18next';

import styles from './BalanceCard.module.scss';

interface BalanceCardProps {
    balance: number;
    currency?: string;
}

export const BalanceCard = ({
    balance,
    currency = 'EUR',
}: BalanceCardProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.card}>
            <span className={styles.label}>{t('dashboard.totalBalance')}</span>

            <h2 className={styles.value}>
                {balance.toLocaleString('en-US', {
                    style: 'currency',
                    currency,
                })}
            </h2>
        </div>
    );
};
