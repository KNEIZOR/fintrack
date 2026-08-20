import { useTranslation } from 'react-i18next';

import type { Account } from '@/api/accounts.api';
import type { Category } from '@/api/categories.api';

import styles from './TransactionsFilters.module.scss';

export type TransactionTypeFilter = 'ALL' | 'INCOME' | 'EXPENSE';

export type TransactionSort =
    'DATE_DESC' | 'DATE_ASC' | 'AMOUNT_DESC' | 'AMOUNT_ASC';

interface TransactionsFiltersProps {
    search: string;
    type: TransactionTypeFilter;
    accountId: string;
    categoryId: string;
    sort: TransactionSort;

    accounts: Account[];
    categories: Category[];

    onSearchChange: (value: string) => void;
    onTypeChange: (value: TransactionTypeFilter) => void;
    onAccountChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: TransactionSort) => void;
}

export const TransactionsFilters = ({
    search,
    type,
    accountId,
    categoryId,
    sort,
    accounts,
    categories,
    onSearchChange,
    onTypeChange,
    onAccountChange,
    onCategoryChange,
    onSortChange,
}: TransactionsFiltersProps) => {
    const { t } = useTranslation();

    const filteredCategories =
        type === 'ALL'
            ? categories
            : categories.filter((category) => category.type === type);

    return (
        <div className={styles.filters}>
            <div className={styles.search}>
                <input
                    type="search"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={t('transactions.searchPlaceholder')}
                    aria-label={t('transactions.search')}
                />
            </div>

            <div className={styles.controls}>
                <select
                    value={type}
                    onChange={(event) =>
                        onTypeChange(
                            event.target.value as TransactionTypeFilter,
                        )
                    }
                    aria-label={t('transactions.type')}
                >
                    <option value="ALL">
                        {t('transactions.allTransactions')}
                    </option>

                    <option value="INCOME">{t('transactions.income')}</option>

                    <option value="EXPENSE">{t('transactions.expense')}</option>
                </select>

                <select
                    value={accountId}
                    onChange={(event) => onAccountChange(event.target.value)}
                    aria-label={t('transactions.account')}
                >
                    <option value="">{t('transactions.allAccounts')}</option>

                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                            {account.name}
                        </option>
                    ))}
                </select>

                <select
                    value={categoryId}
                    onChange={(event) => onCategoryChange(event.target.value)}
                    aria-label={t('transactions.category')}
                >
                    <option value="">{t('transactions.allCategories')}</option>

                    {filteredCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(event) =>
                        onSortChange(event.target.value as TransactionSort)
                    }
                    aria-label={t('transactions.sort')}
                >
                    <option value="DATE_DESC">
                        {t('transactions.newestFirst')}
                    </option>

                    <option value="DATE_ASC">
                        {t('transactions.oldestFirst')}
                    </option>

                    <option value="AMOUNT_DESC">
                        {t('transactions.highestAmount')}
                    </option>

                    <option value="AMOUNT_ASC">
                        {t('transactions.lowestAmount')}
                    </option>
                </select>
            </div>
        </div>
    );
};
