import type { MonthlyAnalytics } from '@/api/analytics.api';

import { useTranslation } from 'react-i18next';

import styles from './AnalyticsChart.module.scss';

interface ChartXAxisProps {
    monthly: MonthlyAnalytics[];

    getX: (index: number) => number;
}

const CHART_HEIGHT = 320;

const formatMonth = (value: string, language: string) => {
    const [year, month] = value.split('-').map(Number);

    if (!year || !month) {
        return value;
    }

    const date = new Date(year, month - 1, 1);

    return new Intl.DateTimeFormat(language, {
        month: 'short',
    }).format(date);
};

export const ChartXAxis = ({ monthly, getX }: ChartXAxisProps) => {
    const { i18n } = useTranslation();

    return (
        <>
            {monthly.map((item, index) => (
                <text
                    key={item.month}
                    x={getX(index)}
                    y={CHART_HEIGHT - 15}
                    textAnchor="middle"
                    className={styles.axisLabel}
                >
                    {formatMonth(item.month, i18n.language)}
                </text>
            ))}
        </>
    );
};

export default ChartXAxis;
