import styles from './TransactionsSkeleton.module.scss';

export const TransactionsSkeleton = () => {
    return (
        <main className={styles.transactions}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.title} />

                    <div className={styles.subtitle} />
                </header>

                <section className={styles.formSection}>
                    <div className={styles.sectionTitle} />

                    <div className={styles.form}>
                        <div className={styles.field}>
                            <div className={styles.label} />
                            <div className={styles.input} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label} />
                            <div className={styles.input} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label} />
                            <div className={styles.input} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label} />
                            <div className={styles.input} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label} />
                            <div className={styles.input} />
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label} />
                            <div className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.button} />
                </section>

                <section className={styles.history}>
                    <div className={styles.sectionTitle} />

                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <div className={styles.category} />
                            <div className={styles.account} />
                            <div className={styles.description} />
                            <div className={styles.date} />
                        </div>

                        <div className={styles.amount} />
                    </div>

                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <div className={styles.category} />
                            <div className={styles.account} />
                            <div className={styles.description} />
                            <div className={styles.date} />
                        </div>

                        <div className={styles.amount} />
                    </div>

                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <div className={styles.category} />
                            <div className={styles.account} />
                            <div className={styles.description} />
                            <div className={styles.date} />
                        </div>

                        <div className={styles.amount} />
                    </div>

                    <div className={styles.transaction}>
                        <div className={styles.transactionInfo}>
                            <div className={styles.category} />
                            <div className={styles.account} />
                            <div className={styles.description} />
                            <div className={styles.date} />
                        </div>

                        <div className={styles.amount} />
                    </div>
                </section>
            </div>
        </main>
    );
};
