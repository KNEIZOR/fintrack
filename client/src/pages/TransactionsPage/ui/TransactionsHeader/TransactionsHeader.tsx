import { useTranslation } from 'react-i18next';

import styles from './TransactionsHeader.module.scss';

interface TransactionsHeaderProps {
    isCreating: boolean;
    isUpdating: boolean;
    onAddTransaction: () => void;
}

export const TransactionsHeader = ({
    isCreating,
    isUpdating,
    onAddTransaction,
}: TransactionsHeaderProps) => {
    const { t } = useTranslation();

    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>{t('transactions.title')}</h1>

                <p className={styles.subtitle}>{t('transactions.subtitle')}</p>
            </div>

            <button
                type="button"
                className={styles.addButton}
                onClick={onAddTransaction}
                disabled={isCreating || isUpdating}
            >
                {t('transactions.addTransaction')}
            </button>
        </header>
    );
};
