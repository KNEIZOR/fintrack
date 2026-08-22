import { ApiErrorMessage } from '@/shared/api/ApiErrorMessage';

import { useCategories } from '../model/useCategories';
import { useCategoryModal } from '../model/useCategoryModal';
import { CategoriesHeader } from './CategoriesHeader/CategoriesHeader';
import { CategoriesList } from './CategoriesList/CategoriesList';
import { CategoriesSkeleton } from './CategoriesSkeleton/CategoriesSkeleton';
import { CategoryModal } from './CategoryModal/CategoryModal';

import styles from './CategoriesPage.module.scss';

export const CategoriesPage = () => {
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

    const {
        isModalOpen,
        editingCategory,
        isSubmitting,

        handleOpenCreate,
        handleEditCategory,
        handleCloseModal,
        handleSubmit,
    } = useCategoryModal({
        createCategory,
        updateCategory,
        isCreating,
        isUpdating,
    });

    if (isLoading) {
        return <CategoriesSkeleton />;
    }

    const mutationError = createError ?? updateError ?? deleteError;
    const modalError = createError ?? updateError;

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className={styles.categories}>
            <div className={styles.container}>
                <CategoriesHeader
                    isSubmitting={isSubmitting}
                    onAddCategory={handleOpenCreate}
                />

                {error && (
                    <div className={styles.error}>
                        <ApiErrorMessage error={error} />
                    </div>
                )}

                {mutationError && (
                    <div className={styles.error}>
                        <ApiErrorMessage error={mutationError} />
                    </div>
                )}

                <CategoriesList
                    categories={categories}
                    isDeleting={isDeleting}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                />
            </div>

            <CategoryModal
                key={editingCategory?.id ?? 'create'}
                isOpen={isModalOpen}
                isSubmitting={isSubmitting}
                error={modalError}
                category={editingCategory}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </main>
    );
};
