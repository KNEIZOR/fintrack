import { useState } from 'react';

import type {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from '@/api/categories.api';

interface UseCategoryModalProps {
    createCategory: (data: CreateCategoryInput) => Promise<unknown>;
    updateCategory: (params: {
        id: string;
        data: UpdateCategoryInput;
    }) => Promise<unknown>;
    isCreating: boolean;
    isUpdating: boolean;
}

export const useCategoryModal = ({
    createCategory,
    updateCategory,
    isCreating,
    isUpdating,
}: UseCategoryModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );
    const isSubmitting = isCreating || isUpdating;

    const handleOpenCreate = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        if (isSubmitting) {
            return;
        }

        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleSubmit = async (
        data: CreateCategoryInput | UpdateCategoryInput,
    ) => {
        if (editingCategory) {
            await updateCategory({
                id: editingCategory.id,
                data: data as UpdateCategoryInput,
            });
            handleCloseModal();
            return;
        }
        await createCategory(data as CreateCategoryInput);
        handleCloseModal();
    };

    return {
        isModalOpen,
        editingCategory,
        isSubmitting,

        handleOpenCreate,
        handleEditCategory,
        handleCloseModal,
        handleSubmit,
    };
};
