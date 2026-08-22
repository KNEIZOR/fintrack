# FinTrack

**FinTrack** — fullstack-приложение для управления личными финансами.

Пользователь может создавать финансовые счета, управлять категориями и транзакциями, отслеживать баланс и анализировать финансовую активность за разные периоды.

Проект разработан с разделением frontend и backend и развернут в production-среде.

## Demo

**Live:** https://fintrack-tracker.vercel.app

**API:** https://fintrack-api-id42.onrender.com

## Features

### Authentication

* регистрация и авторизация пользователей;
* JWT authentication;
* HTTP-only cookies;
* защищённые маршруты;
* получение текущего пользователя;
* logout;
* обработка и локализация ошибок авторизации.

### Accounts

* создание финансовых счетов;
* редактирование счетов;
* удаление счетов;
* поддержка банковских, наличных, накопительных и инвестиционных счетов;
* поддержка нескольких валют;
* отображение текущего баланса.

### Categories

* создание категорий;
* редактирование категорий;
* удаление категорий;
* защита от удаления категорий, используемых транзакциями.

### Transactions

* создание транзакций;
* редактирование транзакций;
* удаление транзакций;
* типы доходов и расходов;
* поиск по описанию, категории и счёту;
* фильтрация по типу;
* фильтрация по счёту;
* фильтрация по категории;
* сортировка по дате и сумме.

### Dashboard

* общий баланс;
* доходы и расходы;
* сводная финансовая статистика;
* последние транзакции;
* данные в реальном времени после CRUD-операций.

### Analytics

* анализ финансовой активности;
* статистика по категориям;
* динамика доходов и расходов;
* выбор периода анализа;
* поддержка нескольких временных диапазонов.

### UI / UX

* адаптивный интерфейс;
* loading, empty и error states;
* skeleton-компоненты;
* модальные окна для CRUD-операций;
* локализация интерфейса;
* поддержка русского и английского языков;
* responsive layout для desktop, tablet и mobile.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* React Query
* SCSS Modules
* react-i18next
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Zod
* JWT
* bcrypt
* cookie-parser
* CORS

### Infrastructure

* PostgreSQL — Neon
* Backend — Render
* Frontend — Vercel

## Architecture

Проект разделён на frontend и backend:

```text
fintrack/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── widgets/
│   │   ├── layouts/
│   │   └── shared/
│   ├── public/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── schemas/
│   │   └── lib/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── ...
│
└── README.md
```

Frontend использует компонентный подход и разделение ответственности между страницами, UI-компонентами, hooks и API-слоем.

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

## Data Flow

```text
React
   ↓
React Query
   ↓
API layer
   ↓
Express REST API
   ↓
Controllers
   ↓
Services
   ↓
Prisma ORM
   ↓
PostgreSQL
```

Authentication:

```text
Login
   ↓
Express
   ↓
JWT
   ↓
HTTP-only cookie
   ↓
Auth middleware
   ↓
Protected API routes
```

## API

Основные endpoints:

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Accounts

```text
GET    /api/accounts
POST   /api/accounts
PATCH  /api/accounts/:id
DELETE /api/accounts/:id
```

### Categories

```text
GET    /api/categories
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

### Transactions

```text
GET    /api/transactions
POST   /api/transactions
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
```

### Dashboard

```text
GET /api/dashboard
```

### Analytics

```text
GET /api/analytics
```

## Error Handling

Backend возвращает структурированные ошибки с `code`.

Пример:

```json
{
    "status": "error",
    "code": "ACCOUNT_USED_BY_TRANSACTIONS",
    "message": "Account cannot be deleted because it is used by transactions"
}
```

Frontend преобразует API-ошибки в локализованные сообщения через общий `ApiErrorMessage`.

Это позволяет отделить технические сообщения API от текста интерфейса.

## Database

Проект использует PostgreSQL и Prisma ORM.

История миграций хранится в:

```text
server/prisma/migrations
```

Production migration flow:

```bash
npx prisma migrate deploy
```

Для локальной разработки:

```bash
npx prisma migrate dev
```

## Local Development

### Requirements

* Node.js 20+
* PostgreSQL или доступ к PostgreSQL
* npm

### Clone

```bash
git clone <repository-url>
cd fintrack
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend запускается на:

```text
http://localhost:5173
```

### Backend

```bash
cd server
npm install
npm run dev
```

Backend запускается на:

```text
http://localhost:4000
```

## Environment Variables

### Client

```env
VITE_API_URL=http://localhost:4000
```

### Server

```env
DATABASE_URL=postgresql://...
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret
JWT_EXPIRES_IN=7d
```

Production environment variables задаются непосредственно в Vercel и Render.

## Production

Production architecture:

```text
Vercel
Frontend
   ↓
Render
Express API
   ↓
Neon
PostgreSQL
```

Frontend:

```text
https://fintrack-tracker.vercel.app
```

Backend:

```text
https://fintrack-api-id42.onrender.com
```

## Production Commands

Backend build:

```bash
npm run build
```

Production start:

```bash
npm run start:prod
```

Production start command применяет Prisma migrations перед запуском сервера:

```text
prisma migrate deploy
        ↓
node dist/server.js
```

## Quality

Current Lighthouse results:

```text
Performance       98
Accessibility    100
Best Practices    96
SEO               82
```

Основные показатели производительности и доступности были оптимизированы с учётом responsive UI, lazy loading, skeleton states и разделения страниц на независимые части.

## Responsive Design

Интерфейс адаптирован под:

* desktop;
* tablet;
* mobile.

Особое внимание уделено:

* таблицам и спискам;
* фильтрам транзакций;
* модальным окнам;
* dashboard;
* analytics;
* authentication forms.

## Project Highlights

В проекте реализованы:

* fullstack architecture;
* REST API;
* JWT authentication;
* HTTP-only cookies;
* Prisma migrations;
* PostgreSQL;
* React Query;
* CRUD operations;
* analytics;
* internationalization;
* responsive UI;
* centralized API error handling;
* protected routes;
* production deployment.

## Future Improvements

Планируемые улучшения:

* recurring transactions;
* financial goals;
* budgets;
* export transactions;
* CSV import/export;
* richer analytics;
* custom themes;
* notifications;
* automated tests;
* CI/CD pipeline.

## Author

**Denis Stuk**

Frontend / Fullstack Developer

GitHub: <github-profile>

Portfolio: <portfolio-url>
