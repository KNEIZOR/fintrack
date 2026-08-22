import { useTranslation } from 'react-i18next';

import styles from './AccountsHeader.module.scss';

interface AccountsHeaderProps {
    isSubmitting: boolean;
    onAddAccount: () => void;
}

export const AccountsHeader = ({
    isSubmitting,
    onAddAccount,
}: AccountsHeaderProps) => {
    const { t } = useTranslation();

    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>{t('accounts.title')}</h1>

                <p className={styles.subtitle}>{t('accounts.subtitle')}</p>
            </div>

            <button
                type="button"
                className={styles.addButton}
                onClick={onAddAccount}
                disabled={isSubmitting}
            >
                {t('accounts.addAccount')}
            </button>
        </header>
    );
};
