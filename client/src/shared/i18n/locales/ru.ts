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
            editAccount: 'Изменить счет',
            editAccountDescription: 'Обновите данные счета',
            balance: 'Баланс',
            saveChanges: 'Сохранить изменения',
            deleteConfirmation: 'Вы уверены, что хотите удалить этот счет?',
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
            editCategory: 'Изменить категорию',
            editCategoryDescription: 'Обновить сведения о категории',
            saveChanges: 'Сохранить изменения',
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

            name: 'Имя',
            confirmPassword: 'Повторите пароль',
            register: 'Зарегистрироваться',
            registering: 'Создание аккаунта...',
            registerSubtitle: 'Создайте аккаунт FinTrack',
            noAccount: 'Нет аккаунта?',
            haveAccount: 'Уже есть аккаунт?',
            passwordsDoNotMatch: 'Пароли не совпадают',
            namePlaceholder: 'Введите ваше имя',
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
            categoriesTitle: 'Аналитика по категориям',
            categoriesSubtitle: 'Распределение доходов и расходов',
            categoriesChartLabel: 'График аналитики по категориям',
            total: 'Всего',
            changePositive: 'Рост по сравнению с предыдущим периодом',
            changeNegative: 'Снижение по сравнению с предыдущим периодом',
            noChange: 'Без изменений по сравнению с предыдущим периодом',
            improved: 'Улучшение',
            decreased: 'Снижение',

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

        errors: {
            default: 'Произошла ошибка',
            unauthorized: 'Вы не авторизованы',
            forbidden: 'Доступ запрещён',
            notFound: 'Ресурс не найден',
            validation: 'Проверьте введённые данные',
            server: 'Ошибка сервера. Попробуйте ещё раз позже',

            authenticationRequired: 'Необходимо войти в аккаунт',
            validationFailed: 'Ошибка валидации данных',

            accountNotFound: 'Счёт не найден',
            accountHasTransactions:
                'Нельзя удалить счёт, потому что он используется в транзакциях',
            failedToCreateAccount: 'Не удалось создать счёт',
            failedToGetAccounts: 'Не удалось загрузить счета',
            failedToUpdateAccount: 'Не удалось обновить счёт',
            failedToDeleteAccount: 'Не удалось удалить счёт',

            categoryNotFound: 'Категория не найдена',
            categoryNameAlreadyExists:
                'Категория с таким названием уже существует для этого типа операции',
            categoryHasTransactions:
                'Нельзя удалить категорию, потому что она используется в транзакциях',
            invalidCategoryId: 'Некорректный идентификатор категории',
            failedToCreateCategory: 'Не удалось создать категорию',
            failedToGetCategories: 'Не удалось загрузить категории',
            failedToUpdateCategory: 'Не удалось обновить категорию',
            failedToDeleteCategory: 'Не удалось удалить категорию',

            transactionNotFound: 'Транзакция не найдена',
            categoryTypeMismatch:
                'Тип категории не соответствует типу транзакции',
            failedToCreateTransaction: 'Не удалось создать транзакцию',
            failedToGetTransactions: 'Не удалось загрузить транзакции',
            failedToUpdateTransaction: 'Не удалось обновить транзакцию',
            failedToDeleteTransaction: 'Не удалось удалить транзакцию',

            internalServerError: 'Внутренняя ошибка сервера',
            unknown: 'Произошла неизвестная ошибка',

            invalidToken: 'Недействительный токен',
            invalidOrExpiredToken: 'Недействительный или просроченный токен',

            USER_ALREADY_EXISTS: 'Пользователь с таким email уже существует',
            INVALID_CREDENTIALS: 'Неверный email или пароль',
            USER_NOT_FOUND: 'Пользователь не найден',
            AUTHENTICATION_REQUIRED: 'Необходимо войти в аккаунт',
        },
    },
};
