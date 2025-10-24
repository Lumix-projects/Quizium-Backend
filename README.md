# Quizium API (TypeScript + Prisma + Express)

This is a ready-to-run API skeleton for Quizium using PostgreSQL and Prisma.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your DATABASE_URL in `.env` (PostgreSQL). Example:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/quiziumdb"
   ```

3. Generate Prisma client and run migration:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Run in dev:
   ```bash
   npm run dev
   ```

## Endpoints
- `POST /api/quizzes` - create quiz with questions
- `POST /api/quizzes/:quizId/questions` - add question
- `GET /api/quizzes/:id` - get full quiz
- `POST /api/results` - submit result
- `GET /api/results/user/:userId` - get user results
- `POST /api/users` - create user
- `GET /api/users/:id` - get user profile
- `PUT /api/users/:id` - update user
- `DELETE /api/users/:id` - delete user
