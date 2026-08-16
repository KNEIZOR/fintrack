import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getCategories } from '@/api/categories.api';
import { CategoryCard, type Category } from '@/widgets/categories/CategoryCard';

import { CategoriesSkeleton } from './CategoriesSkeleton/CategoriesSkeleton';

import styles from './CategoriesPage.module.scss';

export const CategoriesPage = () => {
    const { t } = useTranslation();

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getCategories();

                setCategories(data);
            } catch (error) {
                console.error(error);

                setError(t('categories.error'));
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
    }, [t]);

    if (isLoading) {
        return <CategoriesSkeleton />;
    }

    if (error) {
        return (
            <main className={styles.categories}>
                <div className={styles.container}>
                    <div className={styles.error}>{error}</div>
                </div>
            </main>
        );
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

                    <button type="button" className={styles.addButton}>
                        {t('categories.addCategory')}
                    </button>
                </header>

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
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};
