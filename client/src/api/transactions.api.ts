export type TransactionType = 'INCOME' | 'EXPENSE';

export interface TransactionAccount {
    id: string;
    name: string;
    currency: string;
}

export interface TransactionCategory {
    id: string;
    name: string;
    type: TransactionType;
}

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: string;
    description: string | null;
    date: string;
    account: TransactionAccount;
    category: TransactionCategory;
}

interface TransactionsResponse {
    status: string;
    transactions: Transaction[];
}

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch('http://localhost:4000/api/transactions', {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to load transactions');
    }

    const data: TransactionsResponse = await response.json();

    return data.transactions;
};

interface CreateTransactionResponse {
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

export const createTransaction = async (
    data: CreateTransactionInput,
): Promise<Transaction> => {
    const response = await fetch('http://localhost:4000/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    const result: CreateTransactionResponse & {
        message?: string;
    } = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to create transaction');
    }

    return result.transaction;
};
