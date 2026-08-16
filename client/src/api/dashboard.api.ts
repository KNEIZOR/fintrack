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
    const response = await fetch('http://localhost:4000/api/dashboard', {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to load dashboard');
    }

    const data: DashboardResponse = await response.json();

    return data.dashboard;
};
