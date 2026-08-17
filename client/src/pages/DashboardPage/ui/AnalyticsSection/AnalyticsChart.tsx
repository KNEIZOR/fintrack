import type { AnalyticsData } from '@/api/analytics.api';

import styles from './AnalyticsSection.module.scss';

interface AnalyticsChartProps {
    analytics: AnalyticsData;
}

interface Point {
    x: number;
    y: number;
}

const CHART_WIDTH = 800;
const CHART_HEIGHT = 320;

const PADDING = {
    top: 20,
    right: 20,
    bottom: 45,
    left: 70,
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(value);
};

const getPoints = (values: number[], maxValue: number): Point[] => {
    if (values.length === 0) {
        return [];
    }

    const chartWidth = CHART_WIDTH - PADDING.left - PADDING.right;

    const chartHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    return values.map((value, index) => {
        const x =
            PADDING.left +
            (index / Math.max(values.length - 1, 1)) * chartWidth;

        const y = PADDING.top + chartHeight - (value / maxValue) * chartHeight;

        return { x, y };
    });
};

const createPath = (points: Point[]) => {
    if (points.length === 0) {
        return '';
    }

    return points
        .map((point, index) => {
            return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
        })
        .join(' ');
};

export const AnalyticsChart = ({ analytics }: AnalyticsChartProps) => {
    const monthly = analytics.monthly;

    const income = monthly.map((item) => Number(item.income));
    const expenses = monthly.map((item) => Number(item.expenses));
    const net = monthly.map((item) => Number(item.net));

    const allValues = [...income, ...expenses, ...net];

    const maxValue = Math.max(...allValues, 0);

    const safeMaxValue = maxValue > 0 ? maxValue : 1;

    const incomePoints = getPoints(income, safeMaxValue);
    const expensePoints = getPoints(expenses, safeMaxValue);
    const netPoints = getPoints(net, safeMaxValue);

    const chartHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    const gridLines = 5;

    return (
        <div className={styles.chart}>
            <div className={styles.legend}>
                <span className={styles.legendItem}>
                    <span
                        className={`${styles.legendDot} ${styles.incomeDot}`}
                    />
                    Income
                </span>

                <span className={styles.legendItem}>
                    <span
                        className={`${styles.legendDot} ${styles.expenseDot}`}
                    />
                    Expenses
                </span>

                <span className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.netDot}`} />
                    Net
                </span>
            </div>

            <div className={styles.svgWrapper}>
                <svg
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    className={styles.svg}
                    preserveAspectRatio="none"
                >
                    {Array.from({ length: gridLines }).map((_, index) => {
                        const ratio = index / (gridLines - 1);

                        const y = PADDING.top + chartHeight * ratio;

                        const value = safeMaxValue * (1 - ratio);

                        return (
                            <g key={index}>
                                <line
                                    x1={PADDING.left}
                                    x2={CHART_WIDTH - PADDING.right}
                                    y1={y}
                                    y2={y}
                                    className={styles.gridLine}
                                />

                                <text
                                    x={PADDING.left - 10}
                                    y={y + 4}
                                    textAnchor="end"
                                    className={styles.axisLabel}
                                >
                                    {formatCurrency(value)}
                                </text>
                            </g>
                        );
                    })}

                    <path
                        d={createPath(incomePoints)}
                        className={`${styles.line} ${styles.incomeLine}`}
                    />

                    <path
                        d={createPath(expensePoints)}
                        className={`${styles.line} ${styles.expenseLine}`}
                    />

                    <path
                        d={createPath(netPoints)}
                        className={`${styles.line} ${styles.netLine}`}
                    />

                    {monthly.map((item, index) => {
                        const x =
                            PADDING.left +
                            (index / Math.max(monthly.length - 1, 1)) *
                                (CHART_WIDTH - PADDING.left - PADDING.right);

                        return (
                            <text
                                key={item.month}
                                x={x}
                                y={CHART_HEIGHT - 15}
                                textAnchor="middle"
                                className={styles.axisLabel}
                            >
                                {item.month}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default AnalyticsChart;
