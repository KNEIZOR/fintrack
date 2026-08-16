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
    const response = await fetch('http://localhost:4000/api/analytics', {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to load analytics');
    }

    const data: AnalyticsResponse = await response.json();

    return data.analytics;
};
