import { apiClient } from '@/shared/api';

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
    monthly: MonthlyAnalytics[];
    categories: CategoryAnalytics[];
}

interface AnalyticsResponse {
    status: string;
    analytics: AnalyticsData;
}

export const getAnalytics = async (): Promise<AnalyticsData> => {
    const data = await apiClient<AnalyticsResponse>('/api/analytics');

    return data.analytics;
};
