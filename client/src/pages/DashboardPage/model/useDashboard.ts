import { useQuery } from '@tanstack/react-query';

import { getDashboard, type DashboardData } from '@/api/dashboard.api';

import { queryKeys } from '@/shared/api/queryKeys';

export const useDashboard = () => {
    const dashboardQuery = useQuery<DashboardData, Error>({
        queryKey: queryKeys.dashboard,
        queryFn: getDashboard,
    });

    return {
        dashboard: dashboardQuery.data ?? null,

        isLoading: dashboardQuery.isLoading,

        error: dashboardQuery.error,

        refetch: dashboardQuery.refetch,
    };
};
