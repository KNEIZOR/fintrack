import { type FormEvent, useEffect, useState } from 'react';

import { getAccounts, type Account } from '@/api/accounts.api';

import { getCategories, type Category } from '@/api/categories.api';

import {
    createTransaction,
    getTransactions,
    type Transaction,
    type TransactionType,
} from '@/api/transactions.api';

export const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [accountId, setAccountId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [type, setType] = useState<TransactionType>('EXPENSE');

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [transactionsData, accountsData, categoriesData] =
                await Promise.all([
                    getTransactions(),
                    getAccounts(),
                    getCategories(),
                ]);

            setTransactions(transactionsData);
            setAccounts(accountsData);
            setCategories(categoriesData);

            if (!accountId && accountsData.length > 0) {
                setAccountId(accountsData[0].id);
            }

            const filteredCategories = categoriesData.filter(
                (category) => category.type === type,
            );

            if (!categoryId && filteredCategories.length > 0) {
                setCategoryId(filteredCategories[0].id);
            }
        } catch (error) {
            console.error(error);

            setError('Failed to load transactions');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const availableCategories = categories.filter(
            (category) => category.type === type,
        );

        if (
            availableCategories.length > 0 &&
            !availableCategories.some((category) => category.id === categoryId)
        ) {
            setCategoryId(availableCategories[0].id);
        }

        if (availableCategories.length === 0) {
            setCategoryId('');
        }
    }, [type, categories]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!accountId) {
            setError('Please select an account');
            return;
        }

        if (!categoryId) {
            setError('Please select a category');
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setError('Amount must be greater than zero');
            return;
        }

        try {
            setIsCreating(true);
            setError(null);

            await createTransaction({
                accountId,
                categoryId,
                type,
                amount: Number(amount),
                description: description || undefined,
                date,
            });

            setAmount('');
            setDescription('');

            await loadData();
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create transaction',
            );
        } finally {
            setIsCreating(false);
        }
    };

    if (isLoading) {
        return <div>Loading transactions...</div>;
    }

    const availableCategories = categories.filter(
        (category) => category.type === type,
    );

    return (
        <main>
            <h1>Transactions</h1>

            <section>
                <h2>Add transaction</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Type</label>

                        <select
                            value={type}
                            onChange={(event) =>
                                setType(event.target.value as TransactionType)
                            }
                        >
                            <option value="EXPENSE">Expense</option>

                            <option value="INCOME">Income</option>
                        </select>
                    </div>

                    <div>
                        <label>Account</label>

                        <select
                            value={accountId}
                            onChange={(event) =>
                                setAccountId(event.target.value)
                            }
                        >
                            <option value="">Select account</option>

                            {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.name} ({account.currency})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Category</label>

                        <select
                            value={categoryId}
                            onChange={(event) =>
                                setCategoryId(event.target.value)
                            }
                        >
                            <option value="">Select category</option>

                            {availableCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Amount</label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div>
                        <label>Description</label>

                        <input
                            type="text"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Salary"
                        />
                    </div>

                    <div>
                        <label>Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            required
                        />
                    </div>

                    {error && <p>{error}</p>}

                    <button type="submit" disabled={isCreating}>
                        {isCreating ? 'Creating...' : 'Add transaction'}
                    </button>
                </form>
            </section>

            <section>
                <h2>Transactions history</h2>

                {transactions.length === 0 ? (
                    <p>No transactions yet.</p>
                ) : (
                    <div>
                        {transactions.map((transaction) => {
                            const isIncome = transaction.type === 'INCOME';

                            return (
                                <article key={transaction.id}>
                                    <div>
                                        <strong>
                                            {transaction.category.name}
                                        </strong>

                                        <p>{transaction.account.name}</p>

                                        <p>
                                            {transaction.description ||
                                                'No description'}
                                        </p>

                                        <small>
                                            {new Date(
                                                transaction.date,
                                            ).toLocaleDateString()}
                                        </small>
                                    </div>

                                    <strong>
                                        {isIncome ? '+' : '-'}
                                        {Number(
                                            transaction.amount,
                                        ).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency:
                                                transaction.account.currency,
                                        })}
                                    </strong>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
};
