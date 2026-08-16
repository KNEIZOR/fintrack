export type AccountType = 'BANK' | 'CASH' | 'SAVINGS' | 'INVESTMENT';

export interface Account {
    id: string;
    name: string;
    type: AccountType;
    currency: string;
    balance: string;
    createdAt: string;
    updatedAt: string;
}

interface AccountsResponse {
    status: string;
    accounts: Account[];
}

export const getAccounts = async (): Promise<Account[]> => {
    const response = await fetch('http://localhost:4000/api/accounts', {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to load accounts');
    }

    const data: AccountsResponse = await response.json();

    return data.accounts;
};

interface CreateAccountResponse {
    status: string;
    account: Account;
}

export const createAccount = async (data: {
    name: string;
    type: AccountType;
    currency: string;
}): Promise<Account> => {
    const response = await fetch('http://localhost:4000/api/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    const result: CreateAccountResponse & {
        message?: string;
    } = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to create account');
    }

    return result.account;
};

export const deleteAccount = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:4000/api/accounts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to delete account');
    }
};
