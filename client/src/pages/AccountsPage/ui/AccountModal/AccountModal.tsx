import { type FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type {
    Account,
    CreateAccountInput,
    UpdateAccountInput,
} from '@/api/accounts.api';

import { getApiErrorMessage } from '@/shared/api/apiError';

import styles from './AccountModal.module.scss';

interface AccountModalProps {
    isOpen: boolean;
    isCreating: boolean;
    error: Error | null;

    account: Account | null;

    onClose: () => void;

    onSubmit: (data: CreateAccountInput | UpdateAccountInput) => Promise<void>;
}

export const AccountModal = ({
    isOpen,
    isCreating,
    error,
    account,
    onClose,
    onSubmit,
}: AccountModalProps) => {
    const { t } = useTranslation();

    const [name, setName] = useState(account?.name ?? '');

    const [type, setType] = useState<CreateAccountInput['type']>(
        (account?.type as CreateAccountInput['type']) ?? 'BANK',
    );

    const [currency, setCurrency] = useState(account?.currency ?? 'EUR');

    const [balance, setBalance] = useState(account?.balance ?? '0');

    const isEditing = Boolean(account);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await onSubmit({
            name,
            type,
            currency,
            balance: Number(balance),
        });

        if (!isEditing) {
            setName('');
            setType('BANK');
            setCurrency('EUR');
            setBalance('0');
        }
    };

    const errorMessage = error ? getApiErrorMessage(error) : null;

    return (
        <div className={styles.overlay} onMouseDown={onClose}>
            <div
                className={styles.modal}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <header className={styles.header}>
                    <div>
                        <h2 className={styles.title}>
                            {isEditing
                                ? t('accounts.editAccount')
                                : t('accounts.addAccount')}
                        </h2>

                        <p className={styles.subtitle}>
                            {isEditing
                                ? t('accounts.editAccountDescription')
                                : t('accounts.addAccountDescription')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.close}
                        onClick={onClose}
                        aria-label={t('common.close')}
                        disabled={isCreating}
                    >
                        <X size={20} />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="account-name">
                            {t('accounts.accountName')}
                        </label>

                        <input
                            id="account-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Main account"
                            minLength={2}
                            maxLength={50}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="account-type">
                            {t('accounts.accountType')}
                        </label>

                        <select
                            id="account-type"
                            value={type}
                            onChange={(event) =>
                                setType(
                                    event.target
                                        .value as CreateAccountInput['type'],
                                )
                            }
                        >
                            <option value="BANK">{t('accounts.bank')}</option>

                            <option value="CASH">{t('accounts.cash')}</option>

                            <option value="SAVINGS">
                                {t('accounts.savings')}
                            </option>

                            <option value="INVESTMENT">
                                {t('accounts.investment')}
                            </option>
                        </select>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="account-currency">
                                {t('accounts.currency')}
                            </label>

                            <select
                                id="account-currency"
                                value={currency}
                                onChange={(event) =>
                                    setCurrency(event.target.value)
                                }
                            >
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="account-balance">
                                {isEditing
                                    ? t('accounts.balance')
                                    : t('accounts.initialBalance')}
                            </label>

                            <input
                                id="account-balance"
                                type="number"
                                min="0"
                                step="0.01"
                                value={balance}
                                onChange={(event) =>
                                    setBalance(event.target.value)
                                }
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className={styles.error} role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancel}
                            onClick={onClose}
                            disabled={isCreating}
                        >
                            {t('common.cancel')}
                        </button>

                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={isCreating}
                        >
                            {isCreating
                                ? isEditing
                                    ? t('accounts.updating')
                                    : t('accounts.creating')
                                : isEditing
                                  ? t('accounts.saveChanges')
                                  : t('accounts.createAccount')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
