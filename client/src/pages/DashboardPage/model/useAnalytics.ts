import { useQuery } from '@tanstack/react-query';

import { getAnalytics, type AnalyticsPeriod } from '@/api/analytics.api';

export const useAnalytics = (period: AnalyticsPeriod) => {
    return useQuery({
        queryKey: ['analytics', period],

        queryFn: () => getAnalytics(period),

        staleTime: 1000 * 60 * 5,
    });
};
