import { useQuery } from '@tanstack/react-query';

import { getAnalytics, type AnalyticsData } from '@/api/analytics.api';

import { queryKeys } from '@/shared/api/queryKeys';

export const useAnalytics = () => {
    const analyticsQuery = useQuery<AnalyticsData, Error>({
        queryKey: queryKeys.analytics,
        queryFn: getAnalytics,
    });

    return {
        analytics: analyticsQuery.data ?? null,

        isLoading: analyticsQuery.isLoading,

        error: analyticsQuery.error,
    };
};
