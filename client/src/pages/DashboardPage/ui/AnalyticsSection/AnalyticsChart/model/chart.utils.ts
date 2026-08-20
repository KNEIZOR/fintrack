export interface Point {
    x: number;
    y: number;
}

export const CHART_WIDTH = 800;

export const CHART_HEIGHT = 320;

export const PADDING = {
    top: 20,
    right: 20,
    bottom: 45,
    left: 70,
};

export const getPoints = (values: number[], maxValue: number): Point[] => {
    const chartWidth = CHART_WIDTH - PADDING.left - PADDING.right;

    const chartHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

    return values.map((value, index) => ({
        x: PADDING.left + (index / Math.max(values.length - 1, 1)) * chartWidth,

        y: PADDING.top + chartHeight - (value / maxValue) * chartHeight,
    }));
};

export const createPath = (points: Point[]) => {
    return points
        .map(
            (point, index) =>
                `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`,
        )
        .join(' ');
};
