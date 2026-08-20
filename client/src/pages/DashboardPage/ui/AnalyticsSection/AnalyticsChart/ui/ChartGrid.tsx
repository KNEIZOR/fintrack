import styles from './AnalyticsChart.module.scss';

interface ChartGridProps {
    maxValue: number;
    range: number;
    zeroY: number;
    chartHeight: number;
    currency: string;
}

const GRID_LINES = 5;

const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
};

const PADDING = {
    top: 20,
    left: 70,
    right: 20,
};

const CHART_WIDTH = 800;

export const ChartGrid = ({
    maxValue,
    range,
    zeroY,
    chartHeight,
    currency,
}: ChartGridProps) => {
    return (
        <>
            {Array.from({
                length: GRID_LINES,
            }).map((_, index) => {
                const ratio = index / (GRID_LINES - 1);

                const y = PADDING.top + chartHeight * ratio;

                const value = maxValue - range * ratio;

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
                            {formatCurrency(value, currency)}
                        </text>
                    </g>
                );
            })}

            <line
                x1={PADDING.left}
                x2={CHART_WIDTH - PADDING.right}
                y1={zeroY}
                y2={zeroY}
                className={styles.zeroLine}
            />
        </>
    );
};
