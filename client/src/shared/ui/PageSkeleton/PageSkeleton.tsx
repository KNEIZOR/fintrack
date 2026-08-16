import styles from './PageSkeleton.module.scss';

export const PageSkeleton = () => {
    return (
        <div className={styles.page}>
            <div className={styles.loader}>
                <div className={styles.line} />
                <div className={styles.lineShort} />
                <div className={styles.block} />
            </div>
        </div>
    );
};