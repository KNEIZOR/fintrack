import type { MonthlyAnalytics } from '@/api/analytics.api';

import styles from '../AnalyticsChart.module.scss';

interface Props {
    month: MonthlyAnalytics;

    x: number;

    getY: (value: number) => number;

    height: number;
}

export const ChartCursor = ({ month, x, getY, height }: Props) => {
    return (
        <>
            <line
                x1={x}

                x2={x}

                y1={20}

                y2={height - 45}

                className={styles.activeLine}
            />

            <circle
                cx={x}

                cy={getY(month.income)}

                r="7"

                className={styles.activeIncomePoint}
            />

            <circle
                cx={x}

                cy={getY(month.expenses)}

                r="7"

                className={styles.activeExpensePoint}
            />

            <circle
                cx={x}

                cy={getY(month.net)}

                r="7"

                className={styles.activeNetPoint}
            />
        </>
    );
};
