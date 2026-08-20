export const ru = {
    translation: {
        common: {
            loading: 'Загрузка...',
            save: 'Сохранить',
            cancel: 'Отмена',
            delete: 'Удалить',
            create: 'Создать',
            edit: 'Редактировать',
            close: 'Закрыть',
        },

        navigation: {
            dashboard: 'Главная',
            accounts: 'Счета',
            categories: 'Категории',
            transactions: 'Транзакции',
        },

        dashboard: {
            title: 'Главная',
            subtitle: 'Обзор ваших финансов',
            totalBalance: 'Общий баланс',
            income: 'Доходы',
            expenses: 'Расходы',
            net: 'Итог',
            recentTransactions: 'Последние транзакции',
            noTransactions: 'Транзакций пока нет.',
            loading: 'Загрузка главной страницы...',
            error: 'Не удалось загрузить данные',
        },

        accounts: {
            title: 'Счета',
            subtitle: 'Управляйте своими финансовыми счетами',
            addAccount: 'Добавить счёт',
            yourAccounts: 'Ваши счета',

            name: 'Название',
            type: 'Тип',
            currency: 'Валюта',

            noAccounts: 'Счетов пока нет.',

            bank: 'Банк',
            cash: 'Наличные',
            savings: 'Сбережения',
            investment: 'Инвестиции',

            error: 'Не удалось загрузить счета',

            addAccountDescription:
                'Добавьте новый счёт для управления финансами',
            accountName: 'Название счёта',
            accountType: 'Тип счёта',
            initialBalance: 'Начальный баланс',
            creating: 'Создание...',
            createAccount: 'Создать счёт',
        },

        categories: {
            title: 'Категории',
            subtitle: 'Управляйте категориями доходов и расходов',
            income: 'Доходы',
            expense: 'Расходы',
            addCategory: 'Добавить категорию',
            noCategories: 'Категорий пока нет.',
            error: 'Не удалось загрузить категории',
            addDescription: 'Добавить описание',
            categoryName: 'Название категории',
            namePlaceholder: 'Введите название',
            categoryType: 'Тип категории',
            creating: 'Создание...',
            deleting: 'Удаление...',
            deleteConfirmation: 'Вы уверены, что хотите удалить эту категорию?',
            yourCategories: 'Ваши категории',
            addCategoryDescription: 'Добавье описание категории',
            createCategory: 'Создать категорию',
        },

        language: {
            label: 'Язык',
            english: 'English',
            russian: 'Русский',
        },

        auth: {
            login: 'Войти',
            loggingIn: 'Вход...',
            email: 'Email',
            password: 'Пароль',
            loginSubtitle: 'Войдите в свой аккаунт FinTrack',
            loginError: 'Не удалось войти',
            logout: 'Выйти',
        },

        transactions: {
            title: 'Транзакции',
            subtitle: 'Управляйте доходами и расходами',

            addTransaction: 'Добавить транзакцию',
            addDescription: 'Добавьте новую финансовую операцию',

            history: 'История транзакций',
            historyDescription: 'Последние финансовые операции',
            createTransaction: 'Создать транзакцию',

            income: 'Доход',
            expense: 'Расход',

            amount: 'Сумма',
            account: 'Счёт',
            category: 'Категория',
            type: 'Тип',
            description: 'Описание',

            descriptionPlaceholder: 'На что была эта операция?',

            date: 'Дата',

            selectAccount: 'Выберите счёт',
            selectCategory: 'Выберите категорию',

            creating: 'Создание...',
            noTransactions: 'Транзакций пока нет.',
            noFilteredTransactions: 'По выбранным фильтрам транзакций нет.',

            error: 'Не удалось загрузить транзакции',
            invalidAmount: 'Сумма должна быть больше нуля',
            createError: 'Не удалось создать транзакцию',

            search: 'Поиск транзакций',
            searchPlaceholder: 'Поиск по описанию, категории или счёту...',

            allTransactions: 'Все транзакции',
            allAccounts: 'Все счета',
            allCategories: 'Все категории',

            sort: 'Сортировка',
            newestFirst: 'Сначала новые',
            oldestFirst: 'Сначала старые',
            highestAmount: 'Сначала большая сумма',
            lowestAmount: 'Сначала маленькая сумма',

            editTransaction: 'Редактировать транзакцию',
            editTransactionDescription: 'Измените данные финансовой операции',
            addTransactionDescription: 'Добавьте новую финансовую операцию',

            updating: 'Сохранение...',
            saveChanges: 'Сохранить изменения',

            deleteConfirmation:
                'Вы уверены, что хотите удалить эту транзакцию?',

            recent: 'Недавние',
        },

        analytics: {
            title: 'Аналитика',
            subtitle: 'Обзор доходов и расходов',
            noData: 'Пока нет данных для аналитики',
            chartLabel: 'График финансовой аналитики',

            last3Months: '3 месяца',
            last6Months: '6 месяцев',
            last12Months: '12 месяцев',

            income: 'Доходы',
            expenses: 'Расходы',
            net: 'Итог',

            incomeByCategory: 'Доходы по категориям',
            expensesByCategory: 'Расходы по категориям',

            noIncome: 'Доходов пока нет',
            noExpenses: 'Расходов пока нет',
            updating: 'Обновление аналитики',
        },
    },
};
