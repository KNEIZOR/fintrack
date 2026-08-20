import styles from '../AnalyticsChart.module.scss';

interface Point {
    x: number;
    y: number;
}

interface Props {
    income: Point[];

    expenses: Point[];

    net: Point[];
}

const createPath = (points: Point[]) => {
    return points
        .map(
            (point, index) =>
                `${index === 0 ? 'M' : 'L'}
                ${point.x}
                ${point.y}`,
        )
        .join(' ');
};

export const ChartLines = ({ income, expenses, net }: Props) => {
    return (
        <>
            <path
                d={createPath(income)}
                className={`${styles.line} ${styles.incomeLine}`}
            />

            <path
                d={createPath(expenses)}
                className={`${styles.line} ${styles.expenseLine}`}
            />

            <path
                d={createPath(net)}
                className={`${styles.line} ${styles.netLine}`}
            />
        </>
    );
};
