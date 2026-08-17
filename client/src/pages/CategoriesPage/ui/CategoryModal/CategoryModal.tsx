import { type FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { CreateCategoryInput } from '@/api/categories.api';

import styles from './CategoryModal.module.scss';

interface CategoryModalProps {
    isOpen: boolean;
    isCreating: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (data: CreateCategoryInput) => Promise<void>;
}

export const CategoryModal = ({
    isOpen,
    isCreating,
    error,
    onClose,
    onSubmit,
}: CategoryModalProps) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [type, setType] = useState<CreateCategoryInput['type']>('EXPENSE');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (trimmedName.length < 2) {
            return;
        }

        await onSubmit({
            name: trimmedName,
            type,
        });

        setName('');
        setType('EXPENSE');
    };

    const handleClose = () => {
        if (isCreating) {
            return;
        }

        setName('');
        setType('EXPENSE');

        onClose();
    };

    return (
        <div className={styles.overlay} onMouseDown={handleClose}>
            <div
                className={styles.modal}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <header className={styles.header}>
                    <div>
                        <h2 className={styles.title}>
                            {t('categories.addCategory')}
                        </h2>

                        <p className={styles.subtitle}>
                            {t('categories.addDescription')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={handleClose}
                        disabled={isCreating}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="category-name">
                            {t('categories.name')}
                        </label>

                        <input
                            id="category-name"
                            className={styles.input}
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={t('categories.namePlaceholder')}
                            minLength={2}
                            maxLength={50}
                            required
                            autoFocus
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="category-type">
                            {t('categories.type')}
                        </label>

                        <select
                            id="category-type"
                            className={styles.input}
                            value={type}
                            onChange={(event) =>
                                setType(
                                    event.target
                                        .value as CreateCategoryInput['type'],
                                )
                            }
                        >
                            <option value="EXPENSE">
                                {t('categories.expenses')}
                            </option>

                            <option value="INCOME">
                                {t('categories.income')}
                            </option>
                        </select>
                    </div>

                    {error && (
                        <div className={styles.error} role="alert">
                            {error}
                        </div>
                    )}

                    <footer className={styles.footer}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleClose}
                            disabled={isCreating}
                        >
                            {t('common.cancel')}
                        </button>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isCreating || name.trim().length < 2}
                        >
                            {isCreating
                                ? t('categories.creating')
                                : t('categories.addCategory')}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
