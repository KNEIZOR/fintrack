import styles from './DashboardSkeleton.module.scss';

export const DashboardSkeleton = () => {
    return (
        <main className={styles.dashboard}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.title} />

                    <div className={styles.subtitle} />
                </header>

                <div className={styles.balance}>
                    <div className={styles.balanceCard} />
                </div>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <div className={styles.statTitle} />
                        <div className={styles.statValue} />
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statTitle} />
                        <div className={styles.statValue} />
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statTitle} />
                        <div className={styles.statValue} />
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.transactions}>
                        <div className={styles.transactionsTitle} />

                        <div className={styles.transaction}>
                            <div className={styles.transactionLeft} />
                            <div className={styles.transactionRight} />
                        </div>

                        <div className={styles.transaction}>
                            <div className={styles.transactionLeft} />
                            <div className={styles.transactionRight} />
                        </div>

                        <div className={styles.transaction}>
                            <div className={styles.transactionLeft} />
                            <div className={styles.transactionRight} />
                        </div>

                        <div className={styles.transaction}>
                            <div className={styles.transactionLeft} />
                            <div className={styles.transactionRight} />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};
