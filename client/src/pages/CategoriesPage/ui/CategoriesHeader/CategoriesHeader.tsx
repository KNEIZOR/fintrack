import { useTranslation } from 'react-i18next';

import styles from './CategoriesHeader.module.scss';

interface CategoriesHeaderProps {
    isSubmitting: boolean;
    onAddCategory: () => void;
}

export const CategoriesHeader = ({
    isSubmitting,
    onAddCategory,
}: CategoriesHeaderProps) => {
    const { t } = useTranslation();

    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>{t('categories.title')}</h1>

                <p className={styles.subtitle}>{t('categories.subtitle')}</p>
            </div>

            <button
                type="button"
                className={styles.addButton}
                onClick={onAddCategory}
                disabled={isSubmitting}
            >
                {t('categories.addCategory')}
            </button>
        </header>
    );
};
