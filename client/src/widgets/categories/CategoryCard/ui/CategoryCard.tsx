import { useTranslation } from 'react-i18next';

import styles from './CategoryCard.module.scss';

export interface Category {
    id: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    createdAt?: string;
    updatedAt?: string;
}

interface CategoryCardProps {
    category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
    const { t } = useTranslation();

    const isIncome = category.type === 'INCOME';

    return (
        <article
            className={`${styles.card} ${
                isIncome ? styles.income : styles.expense
            }`}
        >
            <div className={styles.icon}>{isIncome ? '+' : '−'}</div>

            <div className={styles.content}>
                <h3 className={styles.name}>{category.name}</h3>

                <span className={styles.type}>
                    {isIncome
                        ? t('categories.income')
                        : t('categories.expenses')}
                </span>
            </div>
        </article>
    );
};
