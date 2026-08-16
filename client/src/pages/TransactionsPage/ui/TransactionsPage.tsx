import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAccounts, type Account } from '@/api/accounts.api';
import { getCategories, type Category } from '@/api/categories.api';
import {
    createTransaction,
    getTransactions,
    type Transaction,
    type TransactionType,
} from '@/api/transactions.api';

import { TransactionsSkeleton } from './TransactionsSkeleton/TransactionsSkeleton';

import styles from './TransactionsPage.module.scss';

export const TransactionsPage = () => {
    const { t } = useTranslation();

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

            setError(t('transactions.error'));
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
    }, [type, categories, categoryId]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!accountId) {
            setError(t('transactions.selectAccount'));

            return;
        }

        if (!categoryId) {
            setError(t('transactions.selectCategory'));

            return;
        }

        if (!amount || Number(amount) <= 0) {
            setError(t('transactions.invalidAmount'));

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
                    : t('transactions.createError'),
            );
        } finally {
            setIsCreating(false);
        }
    };

    if (isLoading) {
        return <TransactionsSkeleton />;
    }

    const availableCategories = categories.filter(
        (category) => category.type === type,
    );

    return (
        <main className={styles.transactions}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('transactions.title')}</h1>

                    <p className={styles.subtitle}>
                        {t('transactions.subtitle')}
                    </p>
                </header>

                <section className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>
                        {t('transactions.addTransaction')}
                    </h2>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="transaction-type"
                            >
                                {t('transactions.type')}
                            </label>

                            <select
                                id="transaction-type"
                                className={styles.input}
                                value={type}
                                onChange={(event) =>
                                    setType(
                                        event.target.value as TransactionType,
                                    )
                                }
                            >
                                <option value="EXPENSE">
                                    {t('transactions.expense')}
                                </option>

                                <option value="INCOME">
                                    {t('transactions.income')}
                                </option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="transaction-account"
                            >
                                {t('transactions.account')}
                            </label>

                            <select
                                id="transaction-account"
                                className={styles.input}
                                value={accountId}
                                onChange={(event) =>
                                    setAccountId(event.target.value)
                                }
                            >
                                <option value="">
                                    {t('transactions.selectAccount')}
                                </option>

                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.name} ({account.currency})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="transaction-category"
                            >
                                {t('transactions.category')}
                            </label>

                            <select
                                id="transaction-category"
                                className={styles.input}
                                value={categoryId}
                                onChange={(event) =>
                                    setCategoryId(event.target.value)
                                }
                            >
                                <option value="">
                                    {t('transactions.selectCategory')}
                                </option>

                                {availableCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="transaction-amount"
                            >
                                {t('transactions.amount')}
                            </label>

                            <input
                                id="transaction-amount"
                                className={styles.input}
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                                placeholder="0.00"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="transaction-description"
                            >
                                {t('transactions.description')}
                            </label>

                            <input
                                id="transaction-description"
                                className={styles.input}
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder={t(
                                    'transactions.descriptionPlaceholder',
                                )}
                            />
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="transaction-date"
                            >
                                {t('transactions.date')}
                            </label>

                            <input
                                id="transaction-date"
                                className={styles.input}
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                                required
                            />
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <button
                            className={styles.submit}
                            type="submit"
                            disabled={isCreating}
                        >
                            {isCreating
                                ? t('transactions.creating')
                                : t('transactions.addTransaction')}
                        </button>
                    </form>
                </section>

                <section className={styles.history}>
                    <h2 className={styles.sectionTitle}>
                        {t('transactions.history')}
                    </h2>

                    {transactions.length === 0 ? (
                        <div className={styles.empty}>
                            {t('transactions.noTransactions')}
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {transactions.map((transaction) => {
                                const isIncome = transaction.type === 'INCOME';

                                return (
                                    <article
                                        className={styles.transaction}
                                        key={transaction.id}
                                    >
                                        <div className={styles.transactionInfo}>
                                            <strong className={styles.category}>
                                                {transaction.category.name}
                                            </strong>

                                            <span className={styles.account}>
                                                {transaction.account.name}
                                            </span>

                                            <span
                                                className={styles.description}
                                            >
                                                {transaction.description ||
                                                    t(
                                                        'transactions.noDescription',
                                                    )}
                                            </span>

                                            <time className={styles.date}>
                                                {new Date(
                                                    transaction.date,
                                                ).toLocaleDateString()}
                                            </time>
                                        </div>

                                        <strong
                                            className={
                                                isIncome
                                                    ? styles.income
                                                    : styles.expense
                                            }
                                        >
                                            {isIncome ? '+' : '-'}
                                            {Number(
                                                transaction.amount,
                                            ).toLocaleString(undefined, {
                                                style: 'currency',
                                                currency:
                                                    transaction.account
                                                        .currency,
                                            })}
                                        </strong>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};
