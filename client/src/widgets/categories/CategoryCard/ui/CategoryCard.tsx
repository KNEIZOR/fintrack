import { ArrowDownLeft, ArrowUpRight, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Category } from '@/api/categories.api';

import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
    category: Category;
    onDelete?: (id: string) => void;
    isDeleting?: boolean;
}

export const CategoryCard = ({
    category,
    onDelete,
    isDeleting = false,
}: CategoryCardProps) => {
    const { t } = useTranslation();

    const isIncome = category.type === 'INCOME';

    const typeLabel = isIncome
        ? t('categories.income')
        : t('categories.expenses');

    const handleDelete = () => {
        if (isDeleting || !onDelete) {
            return;
        }

        const confirmed = window.confirm(t('categories.deleteConfirmation'));

        if (!confirmed) {
            return;
        }

        onDelete(category.id);
    };

    const Icon = isIncome ? ArrowUpRight : ArrowDownLeft;

    return (
        <article
            className={`${styles.card} ${
                isIncome ? styles.income : styles.expense
            }`}
        >
            <div className={styles.top}>
                <div className={styles.icon}>
                    <Icon size={22} strokeWidth={2} />
                </div>

                <span className={styles.type}>{typeLabel}</span>

                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    aria-label={t('categories.delete')}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{category.name}</h3>
            </div>
        </article>
    );
};
