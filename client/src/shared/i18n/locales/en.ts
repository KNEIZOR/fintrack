export const en = {
    translation: {
        common: {
            loading: 'Loading...',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            create: 'Create',
            edit: 'Edit',
            close: 'Close',
        },

        navigation: {
            dashboard: 'Dashboard',
            accounts: 'Accounts',
            categories: 'Categories',
            transactions: 'Transactions',
        },

        dashboard: {
            title: 'Dashboard',
            subtitle: 'Overview of your finances',
            totalBalance: 'Total balance',
            income: 'Income',
            expenses: 'Expenses',
            net: 'Net',
            recentTransactions: 'Recent transactions',
            noTransactions: 'No transactions yet.',
            loading: 'Loading dashboard...',
            error: 'Failed to load dashboard',
        },

        accounts: {
            title: 'Accounts',
            subtitle: 'Manage your financial accounts',
            addAccount: 'Add account',
            yourAccounts: 'Your accounts',

            name: 'Name',
            type: 'Type',
            currency: 'Currency',

            noAccounts: 'No accounts yet.',

            bank: 'Bank',
            cash: 'Cash',
            savings: 'Savings',
            investment: 'Investment',

            error: 'Failed to load accounts',

            addAccountDescription: 'Add a new account to track your finances',
            accountName: 'Account name',
            accountType: 'Account type',
            initialBalance: 'Initial balance',
            creating: 'Creating...',
            createAccount: 'Create account',
            editAccount: 'Edit account',
            editAccountDescription: 'Update account details',
            balance: 'Balance',
            saveChanges: 'Save changes',
            deleteConfirmation: 'Are you sure you want to delete this account?',
        },

        categories: {
            title: 'Categories',
            subtitle: 'Manage your income and expense categories',
            income: 'Income',
            expense: 'Expense',
            addCategory: 'Add category',
            noCategories: 'No categories yet.',
            error: 'Failed to load categories',
            addDescription: 'Add description',
            categoryName: 'Category name',
            namePlaceholder: 'Enter name',
            categoryType: 'Category type',
            creating: 'Creating...',
            deleting: 'Deleting...',
            deleteConfirmation:
                'Are you sure you want to delete this category?',
            yourCategories: 'Your categories',
            addCategoryDescription: 'Register a new category',
            createCategory: 'Create category',
            editCategory: 'Edit category',
            editCategoryDescription: 'Update category details',
            saveChanges: 'Save changes',
        },

        language: {
            label: 'Language',
            english: 'English',
            russian: 'Русский',
        },

        auth: {
            login: 'Login',
            loggingIn: 'Logging in...',
            email: 'Email',
            password: 'Password',
            loginSubtitle: 'Sign in to your FinTrack account',
            loginError: 'Failed to login',
            logout: 'Log out',

            name: 'Name',
            confirmPassword: 'Confirm password',
            register: 'Register',
            registering: 'Creating account...',
            registerSubtitle: 'Create your FinTrack account',
            noAccount: "Don't have an account?",
            haveAccount: 'Already have an account?',
            passwordsDoNotMatch: 'Passwords do not match',
            namePlaceholder: 'Enter your name',
        },

        transactions: {
            title: 'Transactions',
            subtitle: 'Manage your income and expenses',

            addTransaction: 'Add transaction',
            addTransactionDescription: 'Record a new financial transaction',

            editTransaction: 'Edit transaction',
            editTransactionDescription: 'Update your financial transaction',

            history: 'Transactions history',
            historyDescription: 'Your recent financial activity',

            income: 'Income',
            expense: 'Expense',

            type: 'Type',

            amount: 'Amount',
            account: 'Account',
            category: 'Category',
            description: 'Description',
            descriptionPlaceholder: 'What was this transaction for?',
            date: 'Date',

            selectAccount: 'Select account',
            selectCategory: 'Select category',

            creating: 'Creating...',
            updating: 'Updating...',

            createTransaction: 'Create transaction',
            saveChanges: 'Save changes',

            noTransactions: 'No transactions yet.',
            noFilteredTransactions: 'No transactions match your filters.',

            error: 'Failed to load transactions',
            invalidAmount: 'Amount must be greater than zero',
            createError: 'Failed to create transaction',
            updateError: 'Failed to update transaction',
            deleteError: 'Failed to delete transaction',

            deleting: 'Deleting...',

            search: 'Search transactions',
            searchPlaceholder: 'Search by description, category or account...',

            allTransactions: 'All transactions',
            allAccounts: 'All accounts',
            allCategories: 'All categories',

            sort: 'Sort',
            newestFirst: 'Newest first',
            oldestFirst: 'Oldest first',
            highestAmount: 'Highest amount',
            lowestAmount: 'Lowest amount',

            deleteConfirmation:
                'Are you sure you want to delete this transaction?',
            recent: 'Recent',
        },

        analytics: {
            title: 'Analytics',
            subtitle: 'Income and expenses overview',
            noData: 'No analytics data yet',
            chartLabel: 'Financial analytics chart',
            categoriesTitle: 'Analytics by category',
            categoriesSubtitle: 'Distribution of income and expenses',
            categoriesChartLabel: 'Analytics by category chart',
            total: 'Total',
            changePositive: 'Increase compared to previous period',
            changeNegative: 'Decrease compared to previous period',
            noChange: 'No change compared to previous period',
            improved: 'Improved',
            decreased: 'Decreased',
            other: 'Other',

            last3Months: '3 months',
            last6Months: '6 months',
            last12Months: '12 months',

            income: 'Income',
            expenses: 'Expenses',
            net: 'Net',

            incomeByCategory: 'Income by category',
            expensesByCategory: 'Expenses by category',
            updating: 'Updating analytics',

            noIncome: 'No income yet',
            noExpenses: 'No expenses yet',
        },

        errors: {
            default: 'Something went wrong',
            unauthorized: 'You are not authorized',
            forbidden: 'Access denied',
            notFound: 'Resource not found',
            validation: 'Please check the entered data',
            server: 'Server error. Please try again later',

            authenticationRequired: 'Authentication required',
            validationFailed: 'Validation failed',

            accountNotFound: 'Account not found',
            accountHasTransactions:
                'Account cannot be deleted because it is used by transactions',
            failedToCreateAccount: 'Failed to create account',
            failedToGetAccounts: 'Failed to get accounts',
            failedToUpdateAccount: 'Failed to update account',
            failedToDeleteAccount: 'Failed to delete account',

            categoryNotFound: 'Category not found',
            categoryNameAlreadyExists:
                'Category name already exists for this transaction type',
            categoryHasTransactions:
                'Category cannot be deleted because it is used by transactions',
            invalidCategoryId: 'Invalid category id',
            failedToCreateCategory: 'Failed to create category',
            failedToGetCategories: 'Failed to get categories',
            failedToUpdateCategory: 'Failed to update category',
            failedToDeleteCategory: 'Failed to delete category',

            transactionNotFound: 'Transaction not found',
            categoryTypeMismatch:
                'Category type does not match transaction type',
            failedToCreateTransaction: 'Failed to create transaction',
            failedToGetTransactions: 'Failed to get transactions',
            failedToUpdateTransaction: 'Failed to update transaction',
            failedToDeleteTransaction: 'Failed to delete transaction',

            internalServerError: 'Internal server error',
            unknown: 'An unknown error occurred',

            invalidToken: 'Invalid token',
            invalidOrExpiredToken: 'Invalid or expired token',

            USER_ALREADY_EXISTS: 'User with this email already exists',
            INVALID_CREDENTIALS: 'Invalid email or password',
            USER_NOT_FOUND: 'User not found',
            AUTHENTICATION_REQUIRED: 'Authentication required',

            passwordMinLength: 'Password must contain at least 8 characters',
            passwordsDoNotMatch: 'Passwords do not match',
        },
    },
};
