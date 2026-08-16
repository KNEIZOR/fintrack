import styles from './StatCard.module.scss';

interface StatCardProps {
    title: string;
    value: number;
    type: 'income' | 'expense' | 'neutral';
}

export const StatCard = ({ title, value, type }: StatCardProps) => {
    return (
        <div className={styles.card}>
            <span className={styles.title}>{title}</span>

            <strong className={`${styles.value} ${styles[type]}`}>
                {value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                })}
            </strong>
        </div>
    );
};
