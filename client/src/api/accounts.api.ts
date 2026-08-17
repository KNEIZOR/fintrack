import { apiClient } from '@/shared/api';

export interface Account {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: string;
}

export interface CreateAccountInput {
    name: string;
    type: 'BANK' | 'CASH' | 'SAVINGS' | 'INVESTMENT';
    currency: string;
    balance: number;
}

export interface UpdateAccountInput {
    name: string;
    type: 'BANK' | 'CASH' | 'SAVINGS' | 'INVESTMENT';
    currency: string;
    balance: number;
}

interface AccountsResponse {
    status: string;
    accounts: Account[];
}

interface CreateAccountResponse {
    status: string;
    account: Account;
}

interface UpdateAccountResponse {
    status: string;
    account: Account;
}

export const getAccounts = async (): Promise<Account[]> => {
    const data = await apiClient<AccountsResponse>('/api/accounts');

    return data.accounts;
};

export const createAccount = async (
    data: CreateAccountInput,
): Promise<Account> => {
    const response = await apiClient<CreateAccountResponse>('/api/accounts', {
        method: 'POST',
        body: data,
    });

    return response.account;
};

export const updateAccount = async (
    id: string,
    data: UpdateAccountInput,
): Promise<Account> => {
    const response = await apiClient<UpdateAccountResponse>(
        `/api/accounts/${id}`,
        {
            method: 'PATCH',
            body: data,
        },
    );

    return response.account;
};

export const deleteAccount = async (id: string): Promise<void> => {
    await apiClient(`/api/accounts/${id}`, {
        method: 'DELETE',
    });
};
