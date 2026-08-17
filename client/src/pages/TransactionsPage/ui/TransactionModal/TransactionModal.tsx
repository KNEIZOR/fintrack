import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { Account } from '@/api/accounts.api';
import type { Category } from '@/api/categories.api';
import {
    createTransactionSchema,
    type CreateTransactionFormValues,
} from '@/features/transactions/model/transaction.schema';

import styles from './TransactionModal.module.scss';

interface TransactionModalProps {
    isOpen: boolean;
    accounts: Account[];
    categories: Category[];
    isCreating: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (data: CreateTransactionFormValues) => Promise<void>;
}

export const TransactionModal = ({
    isOpen,
    accounts,
    categories,
    isCreating,
    error,
    onClose,
    onSubmit,
}: TransactionModalProps) => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateTransactionFormValues>({
        resolver: zodResolver(createTransactionSchema),

        defaultValues: {
            type: 'EXPENSE',
            accountId: '',
            categoryId: '',
            amount: 0,
            description: '',
            date: new Date().toISOString().slice(0, 10),
        },
    });

    const type = watch('type');

    const filteredCategories = categories.filter(
        (category) => category.type === type,
    );

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) {
        return null;
    }

    const submit = async (data: CreateTransactionFormValues) => {
        await onSubmit(data);
        reset();
    };

    return (
        <div className={styles.overlay} onMouseDown={onClose}>
            <div
                className={styles.modal}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>
                            {t('transactions.createTitle')}
                        </h2>

                        <p className={styles.subtitle}>
                            {t('transactions.createSubtitle')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        disabled={isCreating}
                        aria-label={t('common.close')}
                    >
                        ×
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(submit)}>
                    <div className={styles.field}>
                        <label htmlFor="transaction-type">
                            {t('transactions.type')}
                        </label>

                        <select id="transaction-type" {...register('type')}>
                            <option value="EXPENSE">
                                {t('transactions.expense')}
                            </option>

                            <option value="INCOME">
                                {t('transactions.income')}
                            </option>
                        </select>

                        {errors.type && (
                            <span className={styles.error}>
                                {errors.type.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-account">
                            {t('transactions.account')}
                        </label>

                        <select
                            id="transaction-account"
                            {...register('accountId')}
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

                        {errors.accountId && (
                            <span className={styles.error}>
                                {errors.accountId.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-category">
                            {t('transactions.category')}
                        </label>

                        <select
                            id="transaction-category"
                            {...register('categoryId')}
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

                        {errors.categoryId && (
                            <span className={styles.error}>
                                {errors.categoryId.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-amount">
                            {t('transactions.amount')}
                        </label>

                        <input
                            id="transaction-amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...register('amount', {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.amount && (
                            <span className={styles.error}>
                                {errors.amount.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-date">
                            {t('transactions.date')}
                        </label>

                        <input
                            id="transaction-date"
                            type="date"
                            {...register('date')}
                        />

                        {errors.date && (
                            <span className={styles.error}>
                                {errors.date.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transaction-description">
                            {t('transactions.description')}
                        </label>

                        <textarea
                            id="transaction-description"
                            rows={3}
                            placeholder={t(
                                'transactions.descriptionPlaceholder',
                            )}
                            {...register('description')}
                        />

                        {errors.description && (
                            <span className={styles.error}>
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    {error && (
                        <div className={styles.serverError} role="alert">
                            {error}
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                            disabled={isCreating}
                        >
                            {t('common.cancel')}
                        </button>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isCreating}
                        >
                            {isCreating
                                ? t('common.saving')
                                : t('transactions.create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
