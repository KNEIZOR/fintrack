# FinTrack Server

Backend-часть приложения FinTrack на Node.js + Express + TypeScript.

Server предоставляет REST API, выполняет authentication, бизнес-логику, CRUD-операции, аналитику и работу с PostgreSQL через Prisma ORM.

## Tech Stack

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
* dotenv

## Architecture

Backend разделён на routes, controllers, services, middleware, schemas и database layer.

```text
server/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── schemas/
│   ├── lib/
│   └── server.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── package.json
└── tsconfig.json
```

## API Architecture

Основной поток запроса:

```text
HTTP Request
     ↓
Route
     ↓
Middleware
     ↓
Controller
     ↓
Service
     ↓
Prisma
     ↓
PostgreSQL
```

## Authentication

Authentication реализована через JWT и HTTP-only cookies.

```text
Login
  ↓
Auth service
  ↓
JWT
  ↓
HTTP-only cookie
  ↓
Auth middleware
  ↓
Protected route
```

Поддерживаются:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

Cookie:

```text
httpOnly: true
secure: true in production
sameSite: none in production
```

## API Endpoints

### Health

```text
GET /api/health
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

## Validation

Входящие данные валидируются через Zod schemas.

Например:

```text
src/schemas/
├── auth.schema.ts
├── account.schema.ts
├── category.schema.ts
└── transaction.schema.ts
```

Invalid requests возвращают `400 Bad Request` со структурированным ответом.

## Error Handling

API использует структурированные error responses:

```json
{
    "status": "error",
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
}
```

Для validation errors:

```json
{
    "status": "error",
    "code": "VALIDATION_FAILED",
    "message": "Validation failed",
    "errors": {
        "password": [
            "Password must contain at least 8 characters"
        ]
    }
}
```

Коды ошибок позволяют frontend независимо от текста backend отображать локализованные сообщения.

## Database

Используется PostgreSQL через Prisma ORM.

Schema:

```text
prisma/schema.prisma
```

Migration history:

```text
prisma/migrations/
```

Production database:

```text
Neon PostgreSQL
```

## Prisma

Generate Prisma Client:

```bash
npm run prisma:generate
```

Create development migration:

```bash
npm run prisma:migrate
```

Check migration status:

```bash
npx prisma migrate status
```

Apply production migrations:

```bash
npx prisma migrate deploy
```

## Environment Variables

Локально:

```env
DATABASE_URL=postgresql://...
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret
JWT_EXPIRES_IN=7d
```

Production values задаются через Render Environment Variables.

## Development

```bash
npm install
npm run dev
```

API:

```text
http://localhost:4000
```

## Build

```bash
npm run build
```

TypeScript output:

```text
dist/
```

## Production

Production backend deployed to Render.

```text
https://fintrack-api-id42.onrender.com
```

Production start:

```bash
npm run start:prod
```

Command выполняет:

```text
prisma migrate deploy
        ↓
node dist/server.js
```

Таким образом новые Prisma migrations применяются перед запуском приложения.

## CORS

Production frontend:

```text
https://fintrack-tracker.vercel.app
```

Backend использует:

```env
CLIENT_URL=https://fintrack-tracker.vercel.app
```

CORS настроен с поддержкой credentials для HTTP-only cookies.

## Database Flow

```text
Express
   ↓
Prisma Client
   ↓
Neon PostgreSQL
```

Все изменения структуры базы контролируются через Prisma migrations.

## Production Architecture

```text
                  ┌─────────────────────┐
                  │        Vercel       │
                  │      React SPA      │
                  └──────────┬──────────┘
                             │
                             │ HTTPS
                             ▼
                  ┌─────────────────────┐
                  │       Render        │
                  │   Express REST API  │
                  └──────────┬──────────┘
                             │
                             │ Prisma
                             ▼
                  ┌─────────────────────┐
                  │        Neon         │
                  │     PostgreSQL      │
                  └─────────────────────┘
```

## Scripts

```text
npm run dev
npm run build
npm start
npm run start:prod
npm run prisma:studio
npm run prisma:migrate
npm run prisma:migrate:deploy
npm run prisma:generate
```

## Security

Backend использует:

* JWT;
* HTTP-only cookies;
* secure cookies в production;
* CORS;
* Zod validation;
* bcrypt password hashing;
* protected routes;
* environment variables для секретов.

Секретные значения не хранятся в Git.

## Production Checklist

Перед production deployment:

```text
✓ DATABASE_URL configured
✓ JWT_SECRET configured
✓ CLIENT_URL configured
✓ NODE_ENV=production
✓ Prisma migrations applied
✓ TypeScript build passes
✓ CORS configured
✓ HTTP-only cookies enabled
```
