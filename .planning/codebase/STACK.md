# Technology Stack

**Analysis Date:** 2026-09-21

## Languages

**Primary:**
- TypeScript 5 (`strict: true`, `noEmit: true`) - All application pages, API routes, Sanity schemas, and utility libraries.
- TSX / React 19.2.8 - Component presentation and layout layer.

**Secondary:**
- JavaScript (ES Modules / CommonJS) - Legacy/draft schemas in `content/schemas/`, build & styling configurations (`eslint.config.mjs`, `postcss.config.mjs`).
- CSS (Vanilla CSS & CSS Custom Properties) - Design system tokens, responsive utilities, and global layouts in `app/globals.css`.

## Runtime

**Environment:**
- Node.js >= 20.x (`@types/node: ^20`)
- Browser runtime: Modern evergreen browsers (Chrome, Edge, Safari, Firefox), mobile-first touch optimization.

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (npm v7+ lockfile format).
- Status: `node_modules` not checked in and not yet installed locally.

## Frameworks

**Core:**
- Next.js 16.3.5 (App Router with Server Components & Client Components (`"use client"`), `next/font/google`, `next/image`, route handlers).
- React 19.2.8 & React DOM 19.2.8 (`@types/react: ^19`, `@types/react-dom: ^19`).

**Content Management & Studio:**
- Sanity Studio v5.31.2 (`sanity`, `next-sanity: ^13.3.4`, `@sanity/vision: ^5.31.2`, `@sanity/client: ^8.6.2`, `@sanity/image-url: ^2.1.1`, `@sanity/icons: ^5.2.2`).

**Animation & Styling:**
- Tailwind CSS v4 (`tailwindcss: ^4`, `@tailwindcss/postcss: ^4`, `postcss.config.mjs`).
- Framer Motion 13.3.0 (`framer-motion`) for layout transitions, scroll triggers (`useInView`), and section reveals.
- styled-components 6.5.3 (installed dependency, primarily for Sanity Studio custom tooling compatibility).
- Lucide React 1.46.0 (`lucide-react`) for SVG icons.

**Testing:**
- None installed or configured (zero test runner, no Jest/Vitest/Playwright).

**Build/Dev:**
- Next.js Compiler / Turbopack integration.
- PostCSS 8 with `@tailwindcss/postcss`.
- TypeScript Compiler (`tsc`) via `tsconfig.json`.
- ESLint 9 with `eslint-config-next` 16.3.5.

## Key Dependencies

**Critical:**
- `next` (16.3.5) - App Router framework providing page rendering, routing, static optimization, and serverless API endpoints.
- `react` & `react-dom` (19.2.8) - Core UI rendering engine.
- `next-sanity` (13.3.4) & `@sanity/client` (8.6.2) - CMS content fetching, Live Content API (`defineLive`), Studio mounting (`NextStudio`), and mutation client (`writeClient`).
- `framer-motion` (13.3.0) - Micro-interactions, animated mobile drawer, and dynamic scroll reveal effects.
- `lucide-react` (1.46.0) - Standard church interface iconography.

**Infrastructure:**
- `@sanity/image-url` (2.1.1) - Dynamic image CDN transformation helper (`urlFor`).
- `@sanity/vision` (5.31.2) - In-studio GROQ query debugging tool.
- `@netlify/plugin-nextjs` - Netlify deployment adapter configured in `netlify.toml`.

## Configuration

**Environment:**
- Configured via system environment variables and `netlify.toml` build environment.
- Required keys:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` (currently set to `"0vl0p2sp"`)
  - `NEXT_PUBLIC_SANITY_DATASET` (defaults to `"production"`)
  - `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to `"2026-09-15"`)
  - `SANITY_WRITE_TOKEN` (server-side secret required for `app/api/submit-form` form submissions)

**Build:**
- `next.config.ts` - Remote image pattern allowed for `cdn.sanity.io`.
- `tsconfig.json` - Target `ES2017`, `strict: true`, path alias `@/*` mapped to `./*`.
- `postcss.config.mjs` - Configured with `@tailwindcss/postcss`.
- `sanity.cli.ts` - Sanity CLI integration pointing to project ID and dataset.
- `sanity.config.ts` - Studio mounted on `/studio` route.
- `netlify.toml` - Netlify build command (`npm run build`), publish directory (`.next`), and Next.js plugin.

## Platform Requirements

**Development:**
- Cross-platform: Windows, macOS, Linux with Node.js >= 20.x and npm.
- Requires running `npm install` before build or typecheck can execute.

**Production:**
- Target: Netlify (`@netlify/plugin-nextjs`) or Vercel edge/serverless platform.
- Static HTML export possible for public pages, with dynamic Serverless Function for `/api/submit-form` and client-side SPA for `/studio`.
