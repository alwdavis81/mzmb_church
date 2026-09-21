# Codebase Structure

**Analysis Date:** 2026-09-21

## Directory Layout

```
mzmb_church/
├── .planning/                  # Project roadmap, state, and codebase maps
│   └── codebase/               # Architectural and system documentation
├── app/                        # Next.js App Router root
│   ├── api/
│   │   └── submit-form/        # Serverless form submission route handler
│   ├── studio/
│   │   └── [[...tool]]/        # Sanity Studio embedded catch-all route
│   ├── beliefs/                # What We Believe page
│   ├── contact/                # Contact page & submission form
│   ├── editorial/              # Pastor's Editorial page
│   ├── events/                 # Church Events & Calendar page
│   ├── giving/                 # Tithes, Offerings & Stewardship page
│   ├── history/                # Church History & Heritage page
│   ├── leadership/             # Pastoral & Lay Leadership bios
│   ├── ministries/             # Auxiliary & Community Ministries page
│   ├── prayer/                 # Prayer Requests submission page
│   ├── sermons/                # Audio/Video Sermons library page
│   ├── visit/                  # Plan a Visit page
│   ├── favicon.ico             # Site favicon
│   ├── globals.css             # Design tokens, variables & base styles
│   ├── layout.tsx              # Root HTML shell, fonts, navbar & footer
│   └── page.tsx                # Homepage hero, highlights & CTA
├── components/                 # Shared UI presentation components
│   ├── Breadcrumbs.tsx         # Page path navigation breadcrumbs
│   ├── EmergencyBanner.tsx     # Urgent announcements / closing banner
│   ├── Footer.tsx              # Site-wide footer & service information
│   ├── InteractiveCard.tsx     # Animated card wrapper
│   └── Navbar.tsx              # Sticky header, dropdowns & mobile drawer
├── content/                    # Legacy JavaScript content schemas
│   └── schemas/                # JS schema files (deprecated by sanity/schemas)
├── design-system/              # Design specs, color tokens & typography rules
│   └── MASTER.md               # Master design system specification
├── lib/                        # General helper utilities
│   └── sanity.ts               # Standalone sanityClient instance
├── public/                     # Static media and assets
│   ├── assets/                 # Brand assets (logo.svg, hero.jpg, placeholders)
│   └── *.svg                   # System vector assets
├── sanity/                     # Sanity CMS integration core
│   ├── lib/                    # Sanity clients (read, write, image, live)
│   ├── schemas/                # TypeScript document schemas (13 types)
│   ├── schemaTypes/            # Root schema index definition
│   ├── env.ts                  # Sanity environment variable validator
│   ├── sanity.config.ts        # Alternate/internal studio config
│   └── structure.ts            # Sanity Studio desk structure customizer
├── specs/                      # Technical specifications and architecture
│   └── tech-architecture/      # Stack & technical decision records
├── netlify.toml                # Netlify deployment configuration
├── next.config.ts              # Next.js engine configuration
├── package.json                # Project manifest, scripts & dependencies
├── package-lock.json           # Exact dependency lockfile
├── postcss.config.mjs          # PostCSS configuration for Tailwind v4
├── sanity.cli.ts               # Sanity CLI configuration
├── sanity.config.ts            # Root Sanity Studio configuration
└── tsconfig.json               # TypeScript compiler options & path mappings
```

## Directory Purposes

**`app/`:**
- Purpose: Application routing, server-rendered views, client islands, and serverless handlers.
- Contains: `layout.tsx`, `page.tsx`, nested route directories with `page.tsx`, and `app/api/` route handlers.
- Key files: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/api/submit-form/route.ts`.

**`components/`:**
- Purpose: Reusable, accessible UI components shared across multiple routes.
- Contains: React components written in TSX (`Navbar.tsx`, `Footer.tsx`, `EmergencyBanner.tsx`, `Breadcrumbs.tsx`, `InteractiveCard.tsx`).

**`sanity/`:**
- Purpose: Complete content modeling and Studio orchestration layer.
- Contains:
  - `schemas/`: 13 TypeScript schemas defining CMS entities.
  - `lib/`: `client.ts` (public queries), `writeClient.ts` (mutations), `image.ts` (asset builder), `live.ts` (live subscriptions).
  - `structure.ts`: Studio desk structure customization.

**`design-system/`:**
- Purpose: Living documentation of design tokens, aesthetic direction, color swatches, typography scales, and UI checklist.
- Key files: `design-system/MASTER.md`.

**`content/`:**
- Purpose: Earlier JavaScript schema prototypes. Retained for historical reference, but superseded by `sanity/schemas/*.ts`.

**`public/assets/`:**
- Purpose: Static image assets including church logo, hero banner, pastor placeholder, and community photos.

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout provider (fonts, metadata, navigation, footer).
- `app/page.tsx`: Web application home view.
- `app/studio/[[...tool]]/page.tsx`: CMS Studio single-page application.
- `app/api/submit-form/route.ts`: Form submission POST handler.

**Configuration:**
- `tsconfig.json`: TypeScript compiler options with `@/*` path mapping.
- `next.config.ts`: Remote image domains and Next.js settings.
- `sanity.config.ts`: Sanity Studio plugins, workspace name, and schemas.
- `sanity.cli.ts`: Sanity CLI credentials and project bindings.
- `netlify.toml`: Deployment build scripts, plugins, and production environment settings.
- `postcss.config.mjs`: Tailwind CSS v4 PostCSS plugin declaration.

**Documentation & Planning:**
- `CLIENT_ELICITATION.md`: Comprehensive audit of real vs. placeholder content needing church leadership approval.
- `UI_UX_FINDINGS.md`: Mobile responsiveness, touch target, and UX improvement log.
- `Church Website Complete Outline.md`: Content roadmap and site outline.
- `AGENTS.md`: Agent execution protocol and operational guidelines.

## Naming Conventions

**Files:**
- React Components: `PascalCase.tsx` (`Navbar.tsx`, `Breadcrumbs.tsx`).
- Next.js Route Files: `page.tsx`, `layout.tsx`, `route.ts`.
- Sanity Schemas: `camelCase.ts` (`contactSubmission.ts`, `prayerRequest.ts`, `sermonSeries.ts`).
- Documentation: `UPPER_SNAKE_CASE.md` or `PascalCase.md` (`CLIENT_ELICITATION.md`, `MASTER.md`).

**Directories:**
- Route Segments: `kebab-case` / lowercase (`app/sermons/`, `app/submit-form/`).
- Catch-all routes: Next.js bracket notation (`app/studio/[[...tool]]/`).

## Where to Add New Code

- **New Page/Route:** Add directory in `app/<feature-name>/page.tsx`.
- **New Shared Component:** Add `components/<ComponentName>.tsx`.
- **New CMS Content Type:**
  1. Create schema file in `sanity/schemas/<typeName>.ts`.
  2. Register in `sanity/schemas/index.ts`.
- **New API Endpoint:** Add directory and handler in `app/api/<endpoint-name>/route.ts`.
- **New Styling Utility/Token:** Add variable to `:root` in `app/globals.css`.

## Special Directories

- `.planning/`: GSD workflow state and codebase mapping documentation.
- `app/studio/[[...tool]]/`: Dedicated NextStudio catch-all mounting route.
- `legacy/`: Reserved directory for legacy static HTML/migration assets.
