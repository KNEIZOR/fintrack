import { apiClient } from '@/shared/api';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    id: string;
    userId: string;
    accountId: string;
    categoryId: string;

    type: TransactionType;

    amount: number;
    description: string | null;
    date: string;

    createdAt: string;
    updatedAt: string;
}

interface TransactionsResponse {
    status: string;
    transactions: Transaction[];
}

interface TransactionResponse {
    status: string;
    transaction: Transaction;
}

export interface CreateTransactionInput {
    accountId: string;
    categoryId: string;
    type: TransactionType;
    amount: number;
    description?: string;
    date: string;
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

export const deleteTransaction = async (
    id: string,
): Promise<void> => {
    await apiClient(`/api/transactions/${id}`, {
        method: 'DELETE',
    });
};