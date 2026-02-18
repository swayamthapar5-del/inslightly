# InsightExchange

InsightExchange is a scalable feedback marketplace where users share anonymized insights and earn rewards while companies purchase validated feedback at scale.

## Tech Stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, Radix UI, Framer Motion
- Backend: NestJS, PostgreSQL (Prisma), Redis (queues + caching)
- Auth: JWT + Google OAuth
- Payments: Stripe payouts and wallet system

## Monorepo Structure

- `apps/web` Next.js client
- `apps/api` NestJS API
- `apps/api/prisma` database schema and seed
- `docs` architecture notes

## Quick Start

1. Copy `.env.example` to `.env` and fill secrets.
2. Install deps: `pnpm install`
3. Start infrastructure: `docker-compose up -d postgres redis`
4. Generate Prisma client: `pnpm db:generate`
5. Run migrations: `pnpm db:migrate`
6. Seed data: `pnpm db:seed`
7. Start dev servers: `pnpm dev`

## Local Setup (Windows)

Use PostgreSQL on `5433` to avoid conflict with local PostgreSQL service on `5432`.

1. Copy env files:
   - `Copy-Item .env.example .env -Force`
   - `Copy-Item .env apps/api/.env -Force`
2. Start infra:
   - `docker compose up -d postgres redis`
3. Prepare DB:
   - `pnpm db:generate`
   - `pnpm db:migrate`
   - `pnpm db:seed`
4. Start apps in separate terminals:
   - API: `pnpm --filter api dev`
   - Web: `pnpm --filter web dev`

URLs:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`

## API Overview

- `POST /auth/register` register user
- `POST /auth/login` login
- `POST /auth/refresh` rotate access token using refresh token
- `GET /auth/google/redirect` Google OAuth start
- `GET /auth/google/callback` Google OAuth callback
- `POST /campaigns` create campaign
- `GET /campaigns` list campaigns
- `GET /surveys/:campaignId` fetch survey
- `POST /responses` submit response
- `GET /wallet` wallet + transactions
- `GET /analytics/campaigns/:id` analytics summary
- `POST /payments/webhook` Stripe webhook endpoint

## Rewards Calculation

Rewards are tied to the campaign budget per response:

- Base reward = `budgetPerResponse` cents
- Quality multiplier based on response completeness and fraud signals
- `reward = base * multiplier` where multiplier is between `0.7` and `1.3`
- Credited to wallet with a corresponding transaction record

## Anonymization Pipeline

- PII fields are stripped from answers before storage
- User IDs are hashed using SHA-256 with a rotating salt
- Responses store only the anonymized identifier
- Optional async queue job enriches with sentiment and summaries

## Data Privacy

- Explicit consent recorded in `Consent`
- Account deletion soft deletes user + scrubs email
- Responses remain anonymized for aggregate analytics

## Scalability Considerations

- Stateless API containers behind a load balancer
- Redis-backed queues for analysis and payout workflows
- Prisma connection pooling in production
- Pagination + caching for analytics and dashboard data
- Separation of PII and anonymized response data

## Docker

Use `docker-compose.yml` for local Postgres, Redis, API, and Web containers.

## Deployment Notes

- Deploy API and web as separate services
- Use managed Postgres and Redis
- Enable Stripe webhooks
- Configure Google OAuth and JWT secret rotation
