import { type FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from '@/api/categories.api';

import styles from './CategoryModal.module.scss';

interface CategoryModalProps {
    isOpen: boolean;
    isSubmitting: boolean;
    error: Error | null;

    category: Category | null;

    onClose: () => void;

    onSubmit: (
        data: CreateCategoryInput | UpdateCategoryInput,
    ) => Promise<void>;
}

export const CategoryModal = ({
    isOpen,
    isSubmitting,
    error,
    category,
    onClose,
    onSubmit,
}: CategoryModalProps) => {
    const { t } = useTranslation();

    const isEditing = Boolean(category);

    const [name, setName] = useState(category?.name ?? '');
    const [type, setType] = useState<CreateCategoryInput['type']>(
        category?.type ?? 'EXPENSE',
    );

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: CreateCategoryInput | UpdateCategoryInput = {
            name: name.trim(),
            type,
        };

        if (!data.name) {
            return;
        }

        await onSubmit(data);
    };

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
                                ? t('categories.editCategory')
                                : t('categories.addCategory')}
                        </h2>

                        <p className={styles.subtitle}>
                            {isEditing
                                ? t('categories.editCategoryDescription')
                                : t('categories.addCategoryDescription')}
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

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="category-name">
                            {t('categories.categoryName')}
                        </label>

                        <input
                            id="category-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Food"
                            minLength={2}
                            maxLength={50}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="category-type">
                            {t('categories.categoryType')}
                        </label>

                        <select
                            id="category-type"
                            value={type}
                            onChange={(event) =>
                                setType(
                                    event.target
                                        .value as CreateCategoryInput['type'],
                                )
                            }
                            disabled={isSubmitting}
                        >
                            <option value="EXPENSE">
                                {t('categories.expense')}
                            </option>

                            <option value="INCOME">
                                {t('categories.income')}
                            </option>
                        </select>
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
                            disabled={isSubmitting || !name.trim()}
                        >
                            {isSubmitting
                                ? isEditing
                                    ? t('categories.updating')
                                    : t('categories.creating')
                                : isEditing
                                  ? t('categories.saveChanges')
                                  : t('categories.createCategory')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
