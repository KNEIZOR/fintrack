import { apiClient } from '@/shared/api';

export type AnalyticsPeriod = '3m' | '6m' | '12m';

export interface AnalyticsSummary {
    income: number;
    expenses: number;
    net: number;

    incomeChange: number;
    expensesChange: number;
    netChange: number;
}

export interface MonthlyAnalytics {
    month: string;
    income: number;
    expenses: number;
    net: number;
}

export interface CategoryAnalytics {
    categoryId: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    amount: number;
}

export interface AnalyticsData {
    period: AnalyticsPeriod;

    summary: AnalyticsSummary;

    monthly: MonthlyAnalytics[];

    categories: CategoryAnalytics[];
}

interface AnalyticsResponse {
    status: string;

    analytics: AnalyticsData;
}

export const getAnalytics = async (
    period: AnalyticsPeriod = '6m',
): Promise<AnalyticsData> => {
    const data = await apiClient<AnalyticsResponse>(
        `/api/analytics?period=${period}`,
    );

    return data.analytics;
};
