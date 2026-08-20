import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from '@/api/categories.api';

import { CategoryCard } from '@/widgets/categories/CategoryCard';

import { useCategories } from '../model/useCategories';

import { CategoriesSkeleton } from './CategoriesSkeleton/CategoriesSkeleton';
import { CategoryModal } from './CategoryModal/CategoryModal';

import styles from './CategoriesPage.module.scss';

export const CategoriesPage = () => {
    const { t } = useTranslation();

    const {
        categories,
        isLoading,
        error,

        createCategory,
        isCreating,
        createError,

        updateCategory,
        isUpdating,
        updateError,

        deleteCategory,
        isDeleting,
        deleteError,
    } = useCategories();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );

    if (isLoading) {
        return <CategoriesSkeleton />;
    }

    if (error) {
        return (
            <main className={styles.categories}>
                <div className={styles.container}>
                    <div className={styles.error} role="alert">
                        {t('categories.error')}
                    </div>
                </div>
            </main>
        );
    }

    const handleOpenCreate = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleCreateCategory = async (data: CreateCategoryInput) => {
        try {
            await createCategory(data);

            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateCategory = async (data: UpdateCategoryInput) => {
        if (!editingCategory) {
            return;
        }

        try {
            await updateCategory({
                id: editingCategory.id,
                data,
            });

            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (
        data: CreateCategoryInput | UpdateCategoryInput,
    ) => {
        if (editingCategory) {
            await handleUpdateCategory(data as UpdateCategoryInput);

            return;
        }

        await handleCreateCategory(data as CreateCategoryInput);
    };

    const mutationError = createError ?? updateError ?? deleteError;

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
                        onClick={handleOpenCreate}
                    >
                        {t('categories.addCategory')}
                    </button>
                </header>

                {mutationError && (
                    <div className={styles.error} role="alert">
                        {mutationError.message}
                    </div>
                )}

                <section>
                    <h2 className={styles.sectionTitle}>
                        {t('categories.yourCategories')}
                    </h2>

                    {categories.length === 0 ? (
                        <p className={styles.empty}>
                            {t('categories.noCategories')}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onEdit={handleEditCategory}
                                    onDelete={handleDeleteCategory}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <CategoryModal
                key={editingCategory?.id ?? 'create'}
                isOpen={isModalOpen}
                isSubmitting={isCreating || isUpdating}
                error={createError ?? updateError}
                category={editingCategory}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </main>
    );
};
