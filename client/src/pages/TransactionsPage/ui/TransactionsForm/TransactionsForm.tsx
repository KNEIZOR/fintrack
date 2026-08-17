import {
    ArrowDownLeft,
    ArrowUpRight,
    CalendarDays,
    Wallet,
} from 'lucide-react';
import { type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import type { Account } from '@/api/accounts.api';
import type { Category } from '@/api/categories.api';
import type { TransactionType } from '@/api/transactions.api';

import styles from '../TransactionsPage.module.scss';

interface TransactionsFormProps {
    accounts: Account[];
    availableCategories: Category[];

    accountId: string;
    setAccountId: (value: string) => void;

    categoryId: string;
    setCategoryId: (value: string) => void;

    type: TransactionType;
    setType: (value: TransactionType) => void;

    amount: string;
    setAmount: (value: string) => void;

    description: string;
    setDescription: (value: string) => void;

    date: string;
    setDate: (value: string) => void;

    isCreating: boolean;
    error: string | null;

    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const TransactionsForm = ({
    accounts,
    availableCategories,

    accountId,
    setAccountId,

    categoryId,
    setCategoryId,

    type,
    setType,

    amount,
    setAmount,

    description,
    setDescription,

    date,
    setDate,

    isCreating,
    error,

    handleSubmit,
}: TransactionsFormProps) => {
    const { t } = useTranslation();

    return (
        <section className={styles.formCard}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                    <ArrowUpRight size={20} />
                </div>

                <div>
                    <h2 className={styles.sectionTitle}>
                        {t('transactions.addTransaction')}
                    </h2>

                    <p className={styles.sectionDescription}>
                        {t('transactions.addDescription')}
                    </p>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.typeSwitcher}>
                    <button
                        type="button"
                        className={`${styles.typeButton} ${
                            type === 'EXPENSE' ? styles.typeButtonActive : ''
                        }`}
                        onClick={() => setType('EXPENSE')}
                    >
                        <ArrowDownLeft size={18} />

                        {t('transactions.expense')}
                    </button>

                    <button
                        type="button"
                        className={`${styles.typeButton} ${
                            type === 'INCOME' ? styles.typeButtonIncome : ''
                        }`}
                        onClick={() => setType('INCOME')}
                    >
                        <ArrowUpRight size={18} />

                        {t('transactions.income')}
                    </button>
                </div>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="account">
                            {t('transactions.account')}
                        </label>

                        <div className={styles.inputWrapper}>
                            <Wallet size={18} className={styles.inputIcon} />

                            <select
                                id="account"
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
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="category">
                            {t('transactions.category')}
                        </label>

                        <select
                            id="category"
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
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="amount">
                            {t('transactions.amount')}
                        </label>

                        <input
                            id="amount"
                            className={styles.input}
                            type="number"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="date">
                            {t('transactions.date')}
                        </label>

                        <div className={styles.inputWrapper}>
                            <CalendarDays
                                size={18}
                                className={styles.inputIcon}
                            />

                            <input
                                id="date"
                                className={styles.input}
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                        <label className={styles.label} htmlFor="description">
                            {t('transactions.description')}
                        </label>

                        <input
                            id="description"
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
                </div>

                {error && (
                    <div className={styles.error} role="alert">
                        {error}
                    </div>
                )}

                <div className={styles.formFooter}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isCreating}
                    >
                        {isCreating
                            ? t('transactions.creating')
                            : t('transactions.addTransaction')}
                    </button>
                </div>
            </form>
        </section>
    );
};
