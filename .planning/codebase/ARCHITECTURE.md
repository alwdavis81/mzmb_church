# Architecture

**Analysis Date:** 2026-09-21

## Pattern Overview

**Overall:** Headless Content-Driven Jamstack Web Application with Embedded CMS Studio (Next.js 16 App Router + Sanity CMS).

**Key Characteristics:**
- **Hybrid Rendering Model**: React Server Components (RSC) architecture in Next.js 16 with client components (`"use client"`) isolated to interactive islands (dynamic navigation, form states, Framer Motion viewport triggers).
- **Embedded Studio Co-location**: Sanity Studio authoring suite mounted as an in-app catch-all route at `/studio/[[...tool]]`, allowing site administrators to edit content directly within the same deployment.
- **Decoupled Content Layer**: All core church assets (sermons, beliefs, leadership bios, events, ministries) originate in the Sanity Content Lake, queried via GROQ queries on page load.
- **Serverless Ingestion Route**: A dedicated API route (`/api/submit-form`) handles form mutations with write token protection.

## Layers

**1. Presentation & Shell Layer (`app/layout.tsx`, `components/`):**
- Purpose: Delivers global layout chrome, accessible navigation, emergency alerts, breadcrumb paths, and footer.
- Components:
  - `Navbar.tsx`: Responsive top bar with mobile menu modal, dropdown navigation, and scroll elevation.
  - `EmergencyBanner.tsx`: High-priority operational alert bar for weather cancellations or service adjustments.
  - `Breadcrumbs.tsx`: Navigational breadcrumb trail for subpages.
  - `Footer.tsx`: Church contact information, service schedule, giving link, and CMS login gateway.
  - `InteractiveCard.tsx`: Reusable animated card container.

**2. Route & Feature Page Layer (`app/`):**
- Purpose: Feature pages mapped to canonical church functions:
  - `app/page.tsx`: Home page hero, service times preview, upcoming events, and core values.
  - `app/visit/page.tsx`: Visitor orientation, parking, childcare, and attire guidelines.
  - `app/beliefs/page.tsx`: Doctrinal statement and biblical foundations.
  - `app/events/page.tsx`: Upcoming events calendar and community gatherings.
  - `app/sermons/page.tsx`: Sermon archive and series library.
  - `app/ministries/page.tsx`: Ministries and auxiliary groups.
  - `app/leadership/page.tsx`: Pastoral leadership, ministerial staff, and deacon/trustee boards.
  - `app/giving/page.tsx`: Stewardship information and giving mechanisms.
  - `app/prayer/page.tsx`: Interactive prayer request submission form.
  - `app/contact/page.tsx`: Contact information and inquiry submission form.
  - `app/history/page.tsx`: Historical timeline of Mt. Zion Missionary Baptist Church.
  - `app/editorial/page.tsx`: Pastor's monthly column and editorial letters.

**3. API & Mutation Layer (`app/api/`):**
- Purpose: Serverless endpoint handling visitor submissions.
- Contains:
  - `app/api/submit-form/route.ts`: Receives POST payloads for contact inquiries or prayer requests and writes them to Sanity via `writeClient`.

**4. CMS & Schema Layer (`sanity/`):**
- Purpose: Content model declarations, validation rules, studio structure, and Sanity client instances.
- Contains:
  - `sanity/schemas/`: 13 distinct schema definitions (`beliefs`, `contactSubmission`, `editorial`, `events`, `giving`, `history`, `leader`, `ministry`, `prayerRequest`, `sermon`, `sermonSeries`, `siteSettings`, `visitorPage`).
  - `sanity/lib/`: Read client (`client.ts`), mutation client (`writeClient.ts`), image url builder (`image.ts`), and live subscription handler (`live.ts`).

## Data Flow

**Public Content Consumption Flow (Read):**
1. User requests page URL (e.g. `/events` or `/sermons`).
2. Client/Server component executes GROQ query via Sanity client:
   `client.fetch('*[_type == "event"] | order(date asc)')`
3. Fallback or fetched Sanity JSON document array returns to component state.
4. Component maps records to UI cards with Framer Motion enter animations and image transformations (`urlFor(img).url()`).

**Form Submission Flow (Write):**
1. User enters data into `Contact` or `Prayer` form fields.
2. Client component dispatches `fetch('/api/submit-form', { method: 'POST', body: JSON.stringify({ type: 'prayer', ...data }) })`.
3. Server route handler verifies `process.env.SANITY_WRITE_TOKEN`.
4. Route handler invokes `writeClient.create({ _type: 'prayerRequest', ...data, submittedAt: new Date().toISOString() })`.
5. Success response returns to client; UI displays confirmation state.

**State Management:**
- Stateless server architecture.
- Local React component state (`useState`, `useEffect`) for form fields, modal toggles, and fetched data caching.
- No heavy global client state store (no Redux or Zustand needed).

## Key Abstractions

- **Sanity Document Schema (`defineType`, `defineField`):** Declarative content models defining validation rules, localized fields, and studio presentation.
- **SectionReveal Component:** Encapsulated Framer Motion reveal wrapper using `useInView` to trigger entrance transitions when scrolling.
- **Client Factory (`createClient`):** Singleton client configurations separating read-only cached CDN queries from authenticated write operations.

## Entry Points

- **Web Application Entry:** `app/layout.tsx` (wraps all routes) and `app/page.tsx` (home route `/`).
- **CMS Studio Entry:** `app/studio/[[...tool]]/page.tsx` (mounted on `/studio`).
- **API Entry:** `app/api/submit-form/route.ts` (mounted on `/api/submit-form`).

## Error Handling

- Form submissions utilize try/catch in `route.ts`, returning HTTP 400 for bad payloads and HTTP 500 for missing write tokens or network failures.
- Public pages use `.catch(() => {})` fallbacks on GROQ fetches to gracefully degrade when CMS credentials are absent during development.

## Cross-Cutting Concerns

- **Accessibility:** Skip link (`#main-content`), ARIA role labels on navigation and banner, WCAG-compliant touch targets (min 44px), high color contrast.
- **Typography & Theming:** Custom CSS properties `--color-primary`, `--color-secondary`, `--gradient-navy` mapped to mobile-first responsive scale in `app/globals.css`.
