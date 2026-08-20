import { useTranslation } from 'react-i18next';

import styles from './AnalyticsSection.module.scss';

export const AnalyticsLegend = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.legend}>
            <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.incomeDot}`} />

                <span>{t('analytics.income')}</span>
            </div>

            <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.expensesDot}`} />

                <span>{t('analytics.expenses')}</span>
            </div>

            <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.netDot}`} />

                <span>{t('analytics.net')}</span>
            </div>
        </div>
    );
};
