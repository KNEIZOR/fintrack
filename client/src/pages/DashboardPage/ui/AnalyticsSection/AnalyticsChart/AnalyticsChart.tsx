import type { AnalyticsData } from '@/api/analytics.api';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { ChartHoverZones } from './ChartHoverZones';
import { ChartPoints } from './ChartPoints';

import { ChartCursor } from './ui/ChartCursor';
import { ChartLines } from './ui/ChartLines';
import { ChartTooltip } from './ui/ChartTooltip';
import { ChartXAxis } from './ChartXAxis';

import styles from './AnalyticsChart.module.scss';

interface AnalyticsChartProps {
    analytics: AnalyticsData;

    currency: string;
}

interface Point {
    x: number;

    y: number;
}

interface ActivePoint {
    index: number;

    x: number;
}

const CHART_WIDTH = 800;

const CHART_HEIGHT = 320;

const PADDING = {
    top: 20,

    right: 20,

    bottom: 45,

    left: 70,
};

const getPoints = (
    values: number[],
    minValue: number,
    range: number,
): Point[] => {
    const chartWidth = CHART_WIDTH - PADDING.left - PADDING.right;

    const chartHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    return values.map((value, index) => {
        const x =
            PADDING.left +
            (index / Math.max(values.length - 1, 1)) * chartWidth;

        const y =
            PADDING.top + ((range - (value - minValue)) / range) * chartHeight;

        return {
            x,
            y,
        };
    });
};

export const AnalyticsChart = ({
    analytics,
    currency,
}: AnalyticsChartProps) => {
    const { t } = useTranslation();

    const [activePoint, setActivePoint] = useState<ActivePoint | null>(null);

    const monthly = analytics.monthly;

    const income = monthly.map((item) => item.income);

    const expenses = monthly.map((item) => item.expenses);

    const net = monthly.map((item) => item.net);

    const allValues = [...income, ...expenses, ...net];

    const maxValue = Math.max(...allValues, 0);

    const minValue = Math.min(...allValues, 0);

    const range = maxValue - minValue || 1;

    const incomePoints = getPoints(income, minValue, range);

    const expensePoints = getPoints(expenses, minValue, range);

    const netPoints = getPoints(net, minValue, range);

    const chartHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    const getX = (index: number) => {
        const chartWidth = CHART_WIDTH - PADDING.left - PADDING.right;

        return (
            PADDING.left +
            (index / Math.max(monthly.length - 1, 1)) * chartWidth
        );
    };

    const getY = (value: number) => {
        return (
            PADDING.top + ((range - (value - minValue)) / range) * chartHeight
        );
    };

    const activeMonth = activePoint ? monthly[activePoint.index] : null;

    return (
        <div className={styles.chart}>
            <div className={styles.legend}>
                <span className={styles.legendItem}>
                    <span
                        className={`${styles.legendDot} ${styles.incomeDot}`}
                    />

                    {t('analytics.income')}
                </span>

                <span className={styles.legendItem}>
                    <span
                        className={`${styles.legendDot} ${styles.expenseDot}`}
                    />

                    {t('analytics.expenses')}
                </span>

                <span className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.netDot}`} />

                    {t('analytics.net')}
                </span>
            </div>

            <div className={styles.svgWrapper}>
                <svg
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    className={styles.svg}
                    preserveAspectRatio="none"
                    onMouseLeave={() => setActivePoint(null)}
                    aria-label={t('analytics.chartLabel')}
                    role="img"
                >
                    <ChartLines
                        income={incomePoints}
                        expenses={expensePoints}
                        net={netPoints}
                    />

                    <ChartHoverZones
                        monthly={monthly}
                        getX={getX}
                        height={CHART_HEIGHT}
                        onHover={(index, x) =>
                            setActivePoint({
                                index,
                                x,
                            })
                        }
                        onLeave={() => setActivePoint(null)}
                    />

                    <ChartPoints
                        monthly={monthly}
                        getX={getX}
                        getY={getY}
                        onHover={(index, x) =>
                            setActivePoint({
                                index,
                                x,
                            })
                        }
                    />

                    {activeMonth && activePoint && (
                        <ChartCursor
                            month={activeMonth}
                            x={activePoint.x}
                            getY={getY}
                            height={CHART_HEIGHT}
                        />
                    )}

                    {activeMonth && activePoint && (
                        <ChartTooltip
                            month={activeMonth}
                            x={activePoint.x}
                            y={getY(activeMonth.net)}
                            height={CHART_HEIGHT}
                            width={CHART_WIDTH}
                            currency={currency}
                        />
                    )}

                    <ChartXAxis monthly={monthly} getX={getX} />
                </svg>
            </div>
        </div>
    );
};

export default AnalyticsChart;
