import styles from './AccountsSkeleton.module.scss';

const SkeletonCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.icon} />

            <div className={styles.info}>
                <div className={styles.name} />

                <div className={styles.type} />

                <div className={styles.balance} />
            </div>
        </div>
    );
};

export const AccountsSkeleton = () => {
    return (
        <main className={styles.accounts}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <div className={styles.title} />

                        <div className={styles.subtitle} />
                    </div>

                    <div className={styles.addButton} />
                </header>

                <section className={styles.section}>
                    <div className={styles.sectionTitle} />

                    <div className={styles.grid}>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </section>
            </div>
        </main>
    );
};
