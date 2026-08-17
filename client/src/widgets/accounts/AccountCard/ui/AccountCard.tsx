import {
    Banknote,
    Landmark,
    Pencil,
    PiggyBank,
    TrendingUp,
    Wallet,
    Trash2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Account } from '@/api/accounts.api';

import styles from './AccountCard.module.scss';

interface AccountCardProps {
    account: Account;
    onEdit: (account: Account) => void;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}

const accountIcons = {
    BANK: Landmark,
    CASH: Banknote,
    SAVINGS: PiggyBank,
    INVESTMENT: TrendingUp,
} as const;

type AccountType = keyof typeof accountIcons;

const isAccountType = (type: string): type is AccountType => {
    return type in accountIcons;
};

export const AccountCard = ({
    account,
    onEdit,
    onDelete,
    isDeleting = false,
}: AccountCardProps) => {
    const { t } = useTranslation();

    const Icon = isAccountType(account.type)
        ? accountIcons[account.type]
        : Wallet;

    const balance = Number(account.balance);

    const formattedBalance = balance.toLocaleString('en-US', {
        style: 'currency',
        currency: account.currency,
    });

    const typeLabel = isAccountType(account.type)
        ? t(`accounts.${account.type.toLowerCase()}`)
        : account.type;

    const handleEdit = () => {
        if (isDeleting) {
            return;
        }

        onEdit(account);
    };

    const handleDelete = () => {
        if (isDeleting) {
            return;
        }

        const confirmed = window.confirm(t('accounts.deleteConfirmation'));

        if (!confirmed) {
            return;
        }

        onDelete(account.id);
    };

    return (
        <article className={styles.card}>
            <div className={styles.top}>
                <div className={styles.icon}>
                    <Icon size={22} strokeWidth={2} />
                </div>

                <span className={styles.type}>{typeLabel}</span>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.editButton}
                        onClick={handleEdit}
                        disabled={isDeleting}
                        aria-label={t('accounts.edit')}
                    >
                        <Pencil size={17} />
                    </button>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label={t('accounts.delete')}
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{account.name}</h3>

                <p className={styles.balance}>{formattedBalance}</p>
            </div>

            <div className={styles.footer}>
                <span>{account.currency}</span>
            </div>
        </article>
    );
};
