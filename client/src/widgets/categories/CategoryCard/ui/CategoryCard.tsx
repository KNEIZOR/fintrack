import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Category } from '@/api/categories.api';

import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}

export const CategoryCard = ({
    category,
    onEdit,
    onDelete,
    isDeleting,
}: CategoryCardProps) => {
    const { t } = useTranslation();

    const isIncome = category.type === 'INCOME';

    const handleDelete = () => {
        if (isDeleting) {
            return;
        }

        const confirmed = window.confirm(t('categories.deleteConfirmation'));

        if (!confirmed) {
            return;
        }

        onDelete(category.id);
    };

    return (
        <article className={styles.card}>
            <div className={styles.main}>
                <div
                    className={`${styles.icon} ${
                        isIncome ? styles.income : styles.expense
                    }`}
                >
                    <span>{isIncome ? '+' : '−'}</span>
                </div>

                <div className={styles.info}>
                    <h3 className={styles.name}>{category.name}</h3>

                    <span
                        className={`${styles.type} ${
                            isIncome ? styles.income : styles.expense
                        }`}
                    >
                        {isIncome
                            ? t('categories.income')
                            : t('categories.expense')}
                    </span>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.editButton}
                    onClick={() => onEdit(category)}
                    disabled={isDeleting}
                    aria-label={t('categories.edit')}
                >
                    <Pencil size={17} />
                </button>

                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    aria-label={t('categories.delete')}
                >
                    <Trash2 size={17} />
                </button>
            </div>
        </article>
    );
};
