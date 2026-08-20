import type { MonthlyAnalytics } from '@/api/analytics.api';

import styles from './AnalyticsChart.module.scss';

interface ChartPointsProps {
    monthly: MonthlyAnalytics[];

    getX: (index: number) => number;

    getY: (value: number) => number;

    onHover: (index: number, x: number) => void;
}

interface PointConfig {
    key: string;

    className: string;

    getValue: (item: MonthlyAnalytics) => number;
}

const pointConfigs: PointConfig[] = [
    {
        key: 'income',

        className: styles.incomePoint,

        getValue: (item) => item.income,
    },

    {
        key: 'expenses',

        className: styles.expensePoint,

        getValue: (item) => item.expenses,
    },

    {
        key: 'net',

        className: styles.netPoint,

        getValue: (item) => item.net,
    },
];

export const ChartPoints = ({
    monthly,

    getX,

    getY,

    onHover,
}: ChartPointsProps) => {
    return (
        <>
            {pointConfigs.map((config) =>
                monthly.map((item, index) => {
                    const value = config.getValue(item);

                    const x = getX(index);

                    const y = getY(value);

                    return (
                        <circle
                            key={`${config.key}-${item.month}`}

                            cx={x}

                            cy={y}

                            r="4"

                            className={config.className}

                            onMouseEnter={() => onHover(index, x)}
                        />
                    );
                }),
            )}
        </>
    );
};
