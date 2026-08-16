import styles from './CategoriesSkeleton.module.scss';

const SkeletonCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.icon} />

            <div className={styles.info}>
                <div className={styles.name} />

                <div className={styles.description} />
            </div>
        </div>
    );
};

export const CategoriesSkeleton = () => {
    return (
        <main className={styles.categories}>
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
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle} />

                    <div className={styles.grid}>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </section>
            </div>
        </main>
    );
};
