import { useTranslation } from 'react-i18next';

import styles from './AnalyticsChart.module.scss';

export const ChartLegend = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.legend}>
            <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.incomeDot}`} />

                {t('analytics.income')}
            </span>

            <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.expenseDot}`} />

                {t('analytics.expenses')}
            </span>

            <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.netDot}`} />

                {t('analytics.net')}
            </span>
        </div>
    );
};
