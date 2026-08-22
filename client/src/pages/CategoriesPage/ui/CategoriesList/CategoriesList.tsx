import { useTranslation } from 'react-i18next';

import type { Category } from '@/api/categories.api';
import { CategoryCard } from '@/widgets/categories/CategoryCard';

import styles from './CategoriesList.module.scss';

interface CategoriesListProps {
    categories: Category[];

    isDeleting: boolean;

    onEdit: (category: Category) => void;

    onDelete: (id: string) => Promise<void>;
}

export const CategoriesList = ({
    categories,
    isDeleting,
    onEdit,
    onDelete,
}: CategoriesListProps) => {
    const { t } = useTranslation();

    return (
        <section>
            <h2 className={styles.sectionTitle}>
                {t('categories.yourCategories')}
            </h2>

            {categories.length === 0 ? (
                <p className={styles.empty}>{t('categories.noCategories')}</p>
            ) : (
                <div className={styles.grid}>
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isDeleting={isDeleting}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
