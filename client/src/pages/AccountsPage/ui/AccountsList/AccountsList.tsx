import { useTranslation } from 'react-i18next';

import type { Account } from '@/api/accounts.api';
import { AccountCard } from '@/widgets/accounts/AccountCard';

import styles from './AccountsList.module.scss';

interface AccountsListProps {
    accounts: Account[];
    isDeleting: boolean;
    onEdit: (account: Account) => void;
    onDelete: (id: string) => Promise<void>;
}

export const AccountsList = ({
    accounts,
    isDeleting,
    onEdit,
    onDelete,
}: AccountsListProps) => {
    const { t } = useTranslation();

    return (
        <section>
            <h2 className={styles.sectionTitle}>
                {t('accounts.yourAccounts')}
            </h2>

            {accounts.length === 0 ? (
                <p className={styles.empty}>{t('accounts.noAccounts')}</p>
            ) : (
                <div className={styles.grid}>
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isDeleting={isDeleting}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
