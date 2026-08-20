import type { MonthlyAnalytics } from '@/api/analytics.api';

import { AnalyticsChart } from '../AnalyticsSection/AnalyticsChart/AnalyticsChart';

interface MonthlyChartProps {
    data: MonthlyAnalytics[];
}

export const MonthlyChart = ({ data }: MonthlyChartProps) => {
    return (
        <AnalyticsChart
            analytics={{
                monthly: data,
                categories: [],
            }}
        />
    );
};
