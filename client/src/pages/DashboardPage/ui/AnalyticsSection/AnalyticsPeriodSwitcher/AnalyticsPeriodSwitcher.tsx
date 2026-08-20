import { useTranslation } from 'react-i18next';

import type { AnalyticsPeriod } from '@/api/analytics.api';

import styles from './AnalyticsPeriodSwitcher.module.scss';

interface Props {
    value: AnalyticsPeriod;

    onChange: (value: AnalyticsPeriod) => void;

    disabled?: boolean;
}

const periods: {
    translationKey:
        | 'analytics.last3Months'
        | 'analytics.last6Months'
        | 'analytics.last12Months';

    value: AnalyticsPeriod;
}[] = [
    {
        translationKey: 'analytics.last3Months',

        value: '3m',
    },

    {
        translationKey: 'analytics.last6Months',

        value: '6m',
    },

    {
        translationKey: 'analytics.last12Months',

        value: '12m',
    },
];

export const AnalyticsPeriodSwitcher = ({
    value,
    onChange,
    disabled = false,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.periodSwitcher}>
            {periods.map((period) => {
                const isActive = value === period.value;

                return (
                    <button
                        key={period.value}
                        type="button"
                        className={`${styles.periodButton} ${
                            isActive ? styles.activePeriod : ''
                        }`}
                        onClick={() => onChange(period.value)}
                        disabled={disabled}
                        aria-pressed={isActive}
                    >
                        {t(period.translationKey)}
                    </button>
                );
            })}
        </div>
    );
};
