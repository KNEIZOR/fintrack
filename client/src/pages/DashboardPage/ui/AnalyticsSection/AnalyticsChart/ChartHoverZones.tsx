import type { MonthlyAnalytics } from '@/api/analytics.api';

interface Props {
    monthly: MonthlyAnalytics[];

    getX: (index: number) => number;

    onHover: (index: number, x: number) => void;

    onLeave: () => void;

    height: number;
}

export const ChartHoverZones = ({
    monthly,
    getX,
    onHover,
    onLeave,
    height,
}: Props) => {
    const width = monthly.length > 1 ? Math.abs(getX(1) - getX(0)) : 80;

    return (
        <>
            {monthly.map((item, index) => {
                const x = getX(index);

                return (
                    <rect
                        key={item.month}
                        x={x - width / 2}
                        y={0}
                        width={width}
                        height={height}
                        fill="transparent"
                        onMouseEnter={() => onHover(index, x)}
                        onMouseLeave={onLeave}
                    />
                );
            })}
        </>
    );
};
