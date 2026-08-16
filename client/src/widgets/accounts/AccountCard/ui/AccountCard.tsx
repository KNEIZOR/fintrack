import styles from './AccountCard.module.scss';

export interface Account {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: string;
}

interface AccountCardProps {
    account: Account;
}

export const AccountCard = ({ account }: AccountCardProps) => {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.name}>{account.name}</h3>

                    <span className={styles.type}>{account.type}</span>
                </div>

                <span className={styles.currency}>{account.currency}</span>
            </div>

            <strong className={styles.balance}>
                {Number(account.balance).toLocaleString('en-US', {
                    style: 'currency',
                    currency: account.currency,
                })}
            </strong>
        </article>
    );
};
