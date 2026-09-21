# External Integrations

**Analysis Date:** 2026-09-21

## APIs & External Services

**Content Management System (Sanity):**
- Service: Sanity Headless CMS (`projectId: 0vl0p2sp`, dataset: `production`)
  - Read Client: `next-sanity` createClient (`sanity/lib/client.ts`) with CDN caching enabled (`useCdn: true`) and live content updates via `next-sanity/live` (`SanityLive`).
  - Write Client: `@sanity/client` createClient (`sanity/lib/writeClient.ts`) using `token: process.env.SANITY_WRITE_TOKEN` to mutate and create documents (`writeClient.create(...)`).
  - Studio: Embedded authoring studio hosted directly within Next.js at `/studio` route (`app/studio/[[...tool]]/page.tsx`).
  - Image Asset Pipeline: CDN-backed asset transforms via `sanity/lib/image.ts` (`@sanity/image-url`).

**Forms & Submissions Endpoint:**
- Internal API Route: `/api/submit-form` (`app/api/submit-form/route.ts`)
  - Dispatches validated payloads directly into Sanity datasets as `contactSubmission` or `prayerRequest` documents.
  - Required Header/Auth: Server-side `SANITY_WRITE_TOKEN`.

**Payment & Giving Integrations:**
- Service: In plan/mock state. The `/giving` page currently displays informational cards (Online Giving, In-Person, Mail-in, Text-to-Give). Direct payment processor SDK (e.g., Stripe, Tithe.ly, Givelify, or PayPal) is not yet wired up.

**External Media & Video Streams:**
- Service: YouTube / Video embed placeholders on `/sermons` page (YouTube/Vimeo embed URLs represented in Sanity schema `sermon.ts`).

## Data Storage

**Document Store:**
- Provider: Sanity Content Lake (cloud-hosted JSON document database)
  - Schema Types:
    - `siteSettings`: Global branding, alert toggles, service times, contact details.
    - `visitorPage`: Welcome copy, service information, what to expect.
    - `sermon` & `sermonSeries`: Audio/video recordings, speaker info, scripture references, dates.
    - `events`: Event dates, locations, recurring schedules, and banners.
    - `ministry`: Group listings, leaders, descriptions, meeting schedules.
    - `beliefs`: Core doctrinal statements and scripture references.
    - `history`: Church timeline, historical narratives, past pastoral milestones.
    - `leader`: Pastoral and deacon board leadership bios and photos.
    - `editorial`: Pastor's monthly/weekly letters and columns.
    - `giving`: Giving instructions, categories, and payment options.
    - `contactSubmission`: Ingested visitor and member contact forms.
    - `prayerRequest`: Ingested prayer requests with urgency and anonymity flags.

**Local / Relational Database:**
- None. No PostgreSQL, MySQL, SQLite, or Prisma/Drizzle ORM instances in the repository.

## Authentication & Identity

**CMS Authentication:**
- Sanity Studio Auth: Delegated to Sanity.io OAuth (Google, GitHub, email login) managed automatically via the embedded Studio interface at `/studio`.
- Public Site: Completely public-facing; no end-user registration or member session layer currently required.

## Monitoring & Observability

**Error Tracking:**
- None integrated (no Sentry, Datadog, or LogRocket).
- Server errors logged via `console.error` in `app/api/submit-form/route.ts`.

**Health Checks & Metrics:**
- Standard Next.js server health on Netlify; no dedicated `/api/health` probe endpoint.

## CI/CD & Deployment

**Host & Pipeline:**
- Netlify via `netlify.toml`.
  - Build command: `npm run build`
  - Publish folder: `.next`
  - Integration plugin: `@netlify/plugin-nextjs`
- Environment Variables in `netlify.toml`:
  - `NEXT_PUBLIC_SANITY_DATASET = "production"`
  - `NEXT_PUBLIC_SANITY_PROJECT_ID = "0vl0p2sp"`
  - `SANITY_WRITE_TOKEN = "add-your-token-here"` (Must be set securely in Netlify web UI, placeholder in file)

## Environment Configuration

**Required Variables:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Public project ID for Sanity CDN queries and studio routing.
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset environment name (default: `production`).
- `NEXT_PUBLIC_SANITY_API_VERSION`: API date versioning string (e.g., `2024-01-01` or `2026-09-15`).
- `SANITY_WRITE_TOKEN`: Secret write-scoped API token for `/api/submit-form`.

## Webhooks & Callbacks

**Sanity Webhooks:**
- Configured for Next.js Live Content API / ISR revalidation via `next-sanity/live` (`SanityLive`), keeping client and cached views synchronized when editors publish content in the Studio.
