import { apiClient } from '@/shared/api';

export interface Account {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: string;
}

interface AccountsResponse {
    status: string;
    accounts: Account[];
}

export const getAccounts = async (): Promise<Account[]> => {
    const data = await apiClient<AccountsResponse>('/api/accounts');

    return data.accounts;
};
