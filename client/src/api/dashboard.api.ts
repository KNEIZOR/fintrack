import { apiClient } from '@/shared/api';

export interface DashboardAccount {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: string;
}

export interface DashboardTransaction {
    id: string;
    type: 'INCOME' | 'EXPENSE';
    amount: string;
    description: string | null;
    date: string;

    account: {
        id: string;
        name: string;
        currency: string;
    };

    category: {
        id: string;
        name: string;
        type: 'INCOME' | 'EXPENSE';
    };
}

export interface DashboardData {
    balance: number;
    income: number;
    expenses: number;
    net: number;
    accounts: DashboardAccount[];
    recentTransactions: DashboardTransaction[];
}

interface DashboardResponse {
    status: string;
    dashboard: DashboardData;
}

export const getDashboard = async (): Promise<DashboardData> => {
    const data = await apiClient<DashboardResponse>('/api/dashboard');

    return data.dashboard;
};
