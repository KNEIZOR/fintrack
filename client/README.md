# FinTrack Client

Frontend-часть приложения FinTrack — SPA на React + TypeScript.

Клиент отвечает за пользовательский интерфейс, маршрутизацию, авторизацию, CRUD-операции, фильтрацию транзакций, аналитику и локализацию.

## Tech Stack

* React
* TypeScript
* Vite
* React Router
* TanStack React Query
* SCSS Modules
* react-i18next
* Lucide React

## Architecture

Frontend построен с разделением ответственности между страницами, widgets, API-слоем, layout и shared-компонентами.

```text
client/
├── src/
│   ├── api/
│   ├── layouts/
│   ├── pages/
│   ├── widgets/
│   ├── shared/
│   └── ...
├── public/
├── index.html
├── vercel.json
└── package.json
```

### Pages

```text
pages/
├── LoginPage/
├── RegisterPage/
├── DashboardPage/
├── AccountsPage/
├── CategoriesPage/
└── TransactionsPage/
```

Страницы используются как orchestration layer и не содержат всю бизнес-логику внутри JSX.

Например:

```text
TransactionsPage
├── TransactionsHeader
├── TransactionsFilters
├── TransactionsList
├── TransactionModal
│
├── useTransactions
├── useTransactionFilters
└── useTransactionModal
```

## Features

### Authentication

* login;
* registration;
* logout;
* получение текущего пользователя;
* protected routes;
* public routes;
* HTTP-only JWT authentication;
* локализованные ошибки.

### Dashboard

* общий баланс;
* доходы;
* расходы;
* последние транзакции;
* финансовая статистика.

### Accounts

* создание;
* редактирование;
* удаление;
* различные типы счетов;
* несколько валют.

### Categories

* создание;
* редактирование;
* удаление;
* защита от удаления используемых категорий.

### Transactions

* создание;
* редактирование;
* удаление;
* поиск;
* фильтрация;
* сортировка;
* доходы и расходы.

### Analytics

* статистика за различные периоды;
* доходы и расходы;
* аналитика по категориям;
* графики.

### Internationalization

Поддерживаются:

* Русский;
* English.

Переводы реализованы через `react-i18next`.

Переключатель языка доступен как в основном приложении, так и на публичных authentication pages.

## API Layer

Вызовы backend сосредоточены в `src/api`.

Пример:

```text
src/api/
├── accounts.api.ts
├── auth.api.ts
├── categories.api.ts
├── dashboard.api.ts
└── transactions.api.ts
```

Общий HTTP-клиент:

```text
src/shared/api/
├── api.ts
├── apiClient.ts
└── ApiErrorMessage.tsx
```

API errors преобразуются в `ApiError` и отображаются с учётом текущего языка.

## State Management

Server state управляется через TanStack React Query.

После mutations выполняется invalidation соответствующих query:

```text
Create / Update / Delete
        ↓
Mutation
        ↓
invalidateQueries
        ↓
Fresh server data
        ↓
UI update
```

## Routing

Используется React Router.

Public routes:

```text
/login
/register
```

Protected routes:

```text
/
/accounts
/categories
/transactions
```

Authentication guards:

```text
PublicRoute
ProtectedRoute
```

## Loading States

Для основных страниц используются специализированные skeleton-компоненты:

```text
DashboardSkeleton
AccountsSkeleton
CategoriesSkeleton
TransactionsSkeleton
PageSkeleton
```

Также предусмотрены empty и error states.

## Environment

Для локальной разработки:

```env
VITE_API_URL=http://localhost:4000
```

Для production URL backend задаётся через Vercel Environment Variables:

```env
VITE_API_URL=https://fintrack-api-id42.onrender.com
```

## Development

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Production

Frontend deployed to Vercel.

Live:

https://fintrack-tracker.vercel.app

## Quality

Latest Lighthouse results:

```text
Performance      98
Accessibility   100
Best Practices   96
SEO              82
```

## Routing on Vercel

SPA routing поддерживается через `vercel.json`.

Прямое открытие маршрутов:

```text
/login
/register
/accounts
/categories
/transactions
```

обрабатывается React Router после загрузки приложения.
