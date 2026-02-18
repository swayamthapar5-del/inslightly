# Architecture

## High-level
- Users and companies interact with the Next.js web app.
- The NestJS API handles auth, campaigns, responses, rewards, and admin.
- PostgreSQL stores relational data and analytics snapshots.
- Redis backs queue jobs for AI analysis and payouts.

## Data Flow
1. User submits response to `/responses`.
2. API strips PII and creates anonymized response record.
3. Rewards are calculated and credited to the wallet.
4. Background job triggers sentiment + insight summary.
5. Company analytics read aggregated anonymized data.

## Modules
- Auth: JWT + Google OAuth
- Campaigns: creation, status, targeting
- Surveys: question delivery
- Responses: anonymization + rewards
- Analytics: aggregated stats
- Admin: approvals and moderation

## Security
- Rate limiting via `@nestjs/throttler`
- JWT guards and roles guard
- Basic bot detection middleware
- Validation pipe with whitelist
