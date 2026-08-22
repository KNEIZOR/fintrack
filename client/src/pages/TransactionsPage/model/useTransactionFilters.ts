import { useMemo, useState } from 'react';

import type { Transaction } from '@/api/transactions.api';

import type {
    TransactionSort,
    TransactionTypeFilter,
} from '../ui/TransactionsFilters/TransactionsFilters';

interface UseTransactionFiltersProps {
    transactions: Transaction[];
}

export const useTransactionFilters = ({
    transactions,
}: UseTransactionFiltersProps) => {
    const [search, setSearch] = useState('');

    const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>('ALL');

    const [accountFilter, setAccountFilter] = useState('');

    const [categoryFilter, setCategoryFilter] = useState('');

    const [sort, setSort] = useState<TransactionSort>('DATE_DESC');

    const filteredTransactions = useMemo(() => {
        return [...transactions]
            .filter((transaction) => {
                if (typeFilter !== 'ALL' && transaction.type !== typeFilter) {
                    return false;
                }

                if (accountFilter && transaction.accountId !== accountFilter) {
                    return false;
                }

                if (
                    categoryFilter &&
                    transaction.categoryId !== categoryFilter
                ) {
                    return false;
                }

                if (search.trim()) {
                    const query = search.trim().toLowerCase();

                    const description =
                        transaction.description?.toLowerCase() ?? '';

                    const category = transaction.category.name.toLowerCase();

                    const account = transaction.account.name.toLowerCase();

                    if (
                        !description.includes(query) &&
                        !category.includes(query) &&
                        !account.includes(query)
                    ) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a, b) => {
                if (sort === 'DATE_DESC') {
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                }

                if (sort === 'DATE_ASC') {
                    return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                }

                if (sort === 'AMOUNT_DESC') {
                    return Number(b.amount) - Number(a.amount);
                }

                return Number(a.amount) - Number(b.amount);
            });
    }, [transactions, search, typeFilter, accountFilter, categoryFilter, sort]);

    return {
        search,
        typeFilter,
        accountFilter,
        categoryFilter,
        sort,

        setSearch,
        setTypeFilter,
        setAccountFilter,
        setCategoryFilter,
        setSort,

        filteredTransactions,
    };
};
