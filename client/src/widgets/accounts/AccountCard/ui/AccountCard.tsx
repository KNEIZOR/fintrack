import {
    Banknote,
    Landmark,
    PiggyBank,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Account } from '@/api/accounts.api';

import styles from './AccountCard.module.scss';

interface AccountCardProps {
    account: Account;
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

export const AccountCard = ({ account }: AccountCardProps) => {
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

    return (
        <article className={styles.card}>
            <div className={styles.top}>
                <div className={styles.icon}>
                    <Icon size={22} strokeWidth={2} />
                </div>

                <span className={styles.type}>{typeLabel}</span>
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
