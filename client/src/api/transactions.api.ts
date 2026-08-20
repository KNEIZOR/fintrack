import { apiClient } from '@/shared/api';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    id: string;
    accountId: string;
    categoryId: string;
    type: TransactionType;
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
        type: TransactionType;
    };
}

export interface CreateTransactionInput {
    accountId: string;
    categoryId: string;
    type: TransactionType;
    amount: number;
    description?: string;
    date: string;
}

export type UpdateTransactionInput = CreateTransactionInput;

interface TransactionsResponse {
    status: string;
    transactions: Transaction[];
}

interface TransactionResponse {
    status: string;
    transaction: Transaction;
}

export const getTransactions = async (): Promise<Transaction[]> => {
    const data = await apiClient<TransactionsResponse>('/api/transactions');

    return data.transactions;
};

export const createTransaction = async (
    data: CreateTransactionInput,
): Promise<Transaction> => {
    const response = await apiClient<TransactionResponse>('/api/transactions', {
        method: 'POST',
        body: data,
    });

    return response.transaction;
};

export const updateTransaction = async (
    id: string,
    data: UpdateTransactionInput,
): Promise<Transaction> => {
    const response = await apiClient<TransactionResponse>(
        `/api/transactions/${id}`,
        {
            method: 'PATCH',
            body: data,
        },
    );

    return response.transaction;
};

export const deleteTransaction = async (id: string): Promise<void> => {
    await apiClient(`/api/transactions/${id}`, {
        method: 'DELETE',
    });
};
