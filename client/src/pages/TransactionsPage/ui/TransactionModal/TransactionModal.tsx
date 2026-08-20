import { type FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type {
    CreateTransactionInput,
    Transaction,
    TransactionType,
    UpdateTransactionInput,
} from '@/api/transactions.api';

import type { Account } from '@/api/accounts.api';
import type { Category } from '@/api/categories.api';

import styles from './TransactionModal.module.scss';

interface TransactionModalProps {
    isOpen: boolean;
    transaction: Transaction | null;

    accounts: Account[];
    categories: Category[];

    isSubmitting: boolean;
    error: Error | null;

    onClose: () => void;

    onSubmit: (
        data: CreateTransactionInput | UpdateTransactionInput,
    ) => Promise<void>;
}

export const TransactionModal = ({
    isOpen,
    transaction,
    accounts,
    categories,
    isSubmitting,
    error,
    onClose,
    onSubmit,
}: TransactionModalProps) => {
    const { t } = useTranslation();

    const isEditing = Boolean(transaction);

    const [type, setType] = useState<TransactionType>(
        transaction?.type ?? 'EXPENSE',
    );

    const [accountId, setAccountId] = useState(
        transaction?.accountId ?? accounts[0]?.id ?? '',
    );

    const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? '');

    const [amount, setAmount] = useState(
        transaction?.amount !== undefined ? String(transaction.amount) : '',
    );

    const [description, setDescription] = useState(
        transaction?.description ?? '',
    );

    const [date, setDate] = useState(
        transaction
            ? transaction.date.slice(0, 10)
            : new Date().toISOString().slice(0, 10),
    );

    if (!isOpen) {
        return null;
    }

    const filteredCategories = categories.filter(
        (category) => category.type === type,
    );

    const handleTypeChange = (newType: TransactionType) => {
        setType(newType);

        const currentCategoryBelongsToType = categories.some(
            (category) =>
                category.id === categoryId && category.type === newType,
        );

        if (!currentCategoryBelongsToType) {
            const firstCategory = categories.find(
                (category) => category.type === newType,
            );

            setCategoryId(firstCategory?.id ?? '');
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!accountId || !categoryId || !amount || !date) {
            return;
        }

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return;
        }

        await onSubmit({
            accountId,
            categoryId,
            type,
            amount: numericAmount,
            description: description.trim() || undefined,
            date,
        });
    };

    return (
        <div
            className={styles.overlay}
            onMouseDown={onClose}
            role="presentation"
        >
            <div
                className={styles.modal}
                onMouseDown={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="transaction-modal-title"
            >
                <header className={styles.header}>
                    <div>
                        <h2
                            id="transaction-modal-title"
                            className={styles.title}
                        >
                            {isEditing
                                ? t('transactions.editTransaction')
                                : t('transactions.addTransaction')}
                        </h2>

                        <p className={styles.subtitle}>
                            {isEditing
                                ? t('transactions.editTransactionDescription')
                                : t('transactions.addTransactionDescription')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.close}
                        onClick={onClose}
                        disabled={isSubmitting}
                        aria-label={t('common.close')}
                    >
                        <X size={20} />
                    </button>
                </header>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className={styles.typeSwitcher}>
                        <button
                            type="button"
                            className={
                                type === 'EXPENSE'
                                    ? styles.activeExpense
                                    : styles.typeButton
                            }
                            onClick={() => handleTypeChange('EXPENSE')}
                            disabled={isSubmitting}
                        >
                            {t('transactions.expense')}
                        </button>

                        <button
                            type="button"
                            className={
                                type === 'INCOME'
                                    ? styles.activeIncome
                                    : styles.typeButton
                            }
                            onClick={() => handleTypeChange('INCOME')}
                            disabled={isSubmitting}
                        >
                            {t('transactions.income')}
                        </button>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-account">
                            {t('transactions.account')}
                        </label>

                        <select
                            id="transaction-account"
                            value={accountId}
                            onChange={(event) =>
                                setAccountId(event.target.value)
                            }
                            required
                            disabled={isSubmitting}
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
                        <label htmlFor="transaction-category">
                            {t('transactions.category')}
                        </label>

                        <select
                            id="transaction-category"
                            value={categoryId}
                            onChange={(event) =>
                                setCategoryId(event.target.value)
                            }
                            required
                            disabled={
                                isSubmitting || filteredCategories.length === 0
                            }
                        >
                            <option value="">
                                {t('transactions.selectCategory')}
                            </option>

                            {filteredCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="transaction-amount">
                                {t('transactions.amount')}
                            </label>

                            <input
                                id="transaction-amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="transaction-date">
                                {t('transactions.date')}
                            </label>

                            <input
                                id="transaction-date"
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-description">
                            {t('transactions.description')}
                        </label>

                        <textarea
                            id="transaction-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            maxLength={255}
                            rows={3}
                            placeholder={t(
                                'transactions.descriptionPlaceholder',
                            )}
                            disabled={isSubmitting}
                        />
                    </div>

                    {error && (
                        <div className={styles.error} role="alert">
                            {error.message}
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancel}
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            {t('common.cancel')}
                        </button>

                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={
                                isSubmitting ||
                                !accountId ||
                                !categoryId ||
                                !amount ||
                                !date
                            }
                        >
                            {isSubmitting
                                ? isEditing
                                    ? t('transactions.updating')
                                    : t('transactions.creating')
                                : isEditing
                                  ? t('transactions.saveChanges')
                                  : t('transactions.createTransaction')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
