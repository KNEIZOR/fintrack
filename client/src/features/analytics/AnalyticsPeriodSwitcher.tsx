import type { AnalyticsPeriod } from '@/api/analytics.api';

import styles from './AnalyticsPeriodSwitcher.module.scss';

interface Props {
    value: AnalyticsPeriod;

    onChange: (value: AnalyticsPeriod) => void;
}

const periods: {
    label: string;

    value: AnalyticsPeriod;
}[] = [
    {
        label: '3 месяца',

        value: '3m',
    },

    {
        label: '6 месяцев',

        value: '6m',
    },

    {
        label: '12 месяцев',

        value: '12m',
    },
];

export const AnalyticsPeriodSwitcher = ({ value, onChange }: Props) => {
    return (
        <div className={styles.switcher}>
            {periods.map((period) => (
                <button
                    key={period.value}

                    type="button"

                    className={value === period.value ? styles.active : ''}

                    onClick={() => onChange(period.value)}
                >
                    {period.label}
                </button>
            ))}
        </div>
    );
};
