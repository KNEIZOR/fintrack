import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { CreateCategoryInput } from '@/api/categories.api';

import { CategoryCard } from '@/widgets/categories/CategoryCard';

import { CategoriesSkeleton } from './CategoriesSkeleton/CategoriesSkeleton';
import { CategoryModal } from './CategoryModal/CategoryModal';
import { useCategories } from '../model/useCategories';

import styles from './CategoriesPage.module.scss';

export const CategoriesPage = () => {
    const { t } = useTranslation();

    const {
        categories,
        isLoading,
        error,
        isCreating,
        isDeleting,
        createCategory,
        deleteCategory,
    } = useCategories();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateCategory = async (data: CreateCategoryInput) => {
        try {
            await createCategory(data);

            setIsModalOpen(false);
        } catch {
            // Ошибка уже доступна через mutation.error
        }
    };

    if (isLoading) {
        return <CategoriesSkeleton />;
    }

    const incomeCategories = categories.filter(
        (category) => category.type === 'INCOME',
    );

    const expenseCategories = categories.filter(
        (category) => category.type === 'EXPENSE',
    );

    return (
        <main className={styles.categories}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            {t('categories.title')}
                        </h1>

                        <p className={styles.subtitle}>
                            {t('categories.subtitle')}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        {t('categories.addCategory')}
                    </button>
                </header>

                {error && (
                    <div className={styles.error} role="alert">
                        {error instanceof Error
                            ? error.message
                            : t('categories.error')}
                    </div>
                )}

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {t('categories.income')}
                    </h2>

                    {incomeCategories.length === 0 ? (
                        <p className={styles.empty}>
                            {t('categories.noCategories')}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {incomeCategories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onDelete={deleteCategory}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {t('categories.expenses')}
                    </h2>

                    {expenseCategories.length === 0 ? (
                        <p className={styles.empty}>
                            {t('categories.noCategories')}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {expenseCategories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onDelete={deleteCategory}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                isCreating={isCreating}
                error={error instanceof Error ? error.message : null}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateCategory}
            />
        </main>
    );
};
