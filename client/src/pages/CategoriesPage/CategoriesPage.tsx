import { type FormEvent, useEffect, useState } from 'react';

import {
    createCategory,
    deleteCategory,
    getCategories,
    type Category,
    type CategoryType,
} from '@/api/categories.api';

export const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const [name, setName] = useState('');
    const [type, setType] = useState<CategoryType>('EXPENSE');

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.error(error);

            setError('Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsCreating(true);
            setError(null);

            await createCategory({
                name,
                type,
            });

            setName('');
            setType('EXPENSE');

            await loadCategories();
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create category',
            );
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setError(null);

            await deleteCategory(id);

            await loadCategories();
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete category',
            );
        }
    };

    if (isLoading) {
        return <div>Loading categories...</div>;
    }

    return (
        <main>
            <h1>Categories</h1>

            <section>
                <h2>Add category</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Food"
                            required
                        />
                    </div>

                    <div>
                        <label>Type</label>

                        <select
                            value={type}
                            onChange={(event) =>
                                setType(event.target.value as CategoryType)
                            }
                        >
                            <option value="EXPENSE">Expense</option>

                            <option value="INCOME">Income</option>
                        </select>
                    </div>

                    <button type="submit" disabled={isCreating}>
                        {isCreating ? 'Creating...' : 'Add category'}
                    </button>
                </form>
            </section>

            {error && <p>{error}</p>}

            <section>
                <h2>Income categories</h2>

                {categories
                    .filter((category) => category.type === 'INCOME')
                    .map((category) => (
                        <article key={category.id}>
                            <strong>{category.name}</strong>

                            <button
                                type="button"
                                onClick={() => handleDelete(category.id)}
                            >
                                Delete
                            </button>
                        </article>
                    ))}
            </section>

            <section>
                <h2>Expense categories</h2>

                {categories
                    .filter((category) => category.type === 'EXPENSE')
                    .map((category) => (
                        <article key={category.id}>
                            <strong>{category.name}</strong>

                            <button
                                type="button"
                                onClick={() => handleDelete(category.id)}
                            >
                                Delete
                            </button>
                        </article>
                    ))}
            </section>
        </main>
    );
};
