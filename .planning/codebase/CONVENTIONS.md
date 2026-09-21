# Coding Conventions

**Analysis Date:** 2026-09-21

## Naming Patterns

**Files:**
- Component Files: `PascalCase.tsx` (`components/Navbar.tsx`, `components/EmergencyBanner.tsx`).
- Route Handlers & Pages: Next.js standard conventions (`app/<route>/page.tsx`, `app/api/<route>/route.ts`).
- Schema Files: `camelCase.ts` (`sanity/schemas/contactSubmission.ts`, `sanity/schemas/prayerRequest.ts`).
- Config Files: `kebab-case` or framework convention (`sanity.config.ts`, `eslint.config.mjs`, `next.config.ts`).

**Functions:**
- React Components: `PascalCase` exported as default or named function (`export default function HomePage()`, `function SectionReveal()`).
- Event Handlers: `handle*` or `toggle*` prefix (`handleScroll`, `toggleMobileMenu`, `closeMobileMenu`).
- Helpers: `camelCase` (`urlFor`, `fadeUp`, `assertValue`).

**Variables & Constants:**
- State & Local Variables: `camelCase` (`isScrolled`, `isMobileMenuOpen`, `serviceTimes`).
- Configs & Static Lookup Objects: `camelCase` or `UPPER_SNAKE_CASE` (`navLinks`, `aboutLinks`, `ease`, `overlayVariants`).
- Schema Definitions: `camelCase` default export objects (`export default { name: "belief", ... }`).

**Types & Interfaces:**
- Component Props: Inline type literals or `PascalCase` (`{ children: React.ReactNode; className?: string }`).
- Sanity Schema Types: Types imported from `sanity` (`defineType`, `defineField`, `SchemaTypeDefinition`).

## Code Style

**Formatting:**
- 2-space indentation throughout.
- Double quotes preferred in TSX/JSX attributes and imports, single quotes acceptable in config files.
- Semicolons used consistently.
- Trailing commas in multi-line object and array literals.

**Styling Architecture:**
- Three-tier styling approach:
  1. CSS Custom Properties in `:root` (`var(--color-primary)`, `var(--gradient-navy)`, `var(--shadow-card)`).
  2. Vanilla CSS utility classes defined in `app/globals.css` (`.btn`, `.btn-primary`, `.skip-link`, `.navbar`).
  3. Inline CSS styles (`style={{ ... }}`) for dynamic CSS variable interpolation, clamp sizing, and framer-motion values.
- Tailwind CSS v4 is configured via `@tailwindcss/postcss` and will progressively replace redundant inline styles.

**Linting:**
- ESLint 9 using Flat Config (`eslint.config.mjs`).
- Extends Next.js core web vitals and TypeScript configs (`eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`).
- Run command: `npm run lint`.

## Import Organization

**Order:**
1. React & Next.js Core (`react`, `next/link`, `next/image`, `next/navigation`, `next/server`).
2. Third-Party Libraries (`framer-motion`, `lucide-react`, `sanity`, `next-sanity`).
3. Internal Core & Utilities (`@/sanity/lib/client`, `@/sanity/lib/image`, `@/lib/sanity`).
4. UI Components (`@/components/Navbar`, `@/components/Footer`).
5. Styles & Types (`./globals.css`, `import type { Metadata } from 'next'`).

**Path Aliases:**
- Path alias `@/*` configured in `tsconfig.json` mapped to `./*`.

## Error Handling

**API Handlers:**
- Async route handlers wrap external I/O in `try / catch` blocks.
- Explicit HTTP status codes returned via `NextResponse.json()`:
  - `400 Bad Request` for invalid payload types.
  - `500 Internal Server Error` for missing environment tokens or Sanity mutation errors.

**Client-Side Queries:**
- GROQ queries against Sanity use `.then(...).catch(() => {})` promises to avoid unhandled rejections if credentials or network are offline.
- Form submissions maintain explicit local state: `submitting` (boolean), `submitted` (boolean), and `error` (string | null).

## Logging

- Minimal logging in production.
- Unexpected API failures logged with `console.error("Form submission error:", err)`.
- No extraneous `console.log` statements in client components.

## Comments

- Section header comments used in CSS files and major components to delineate architectural blocks:
  `/* ======================================================================== */`
- JSDoc explanatory blocks on route wrappers (e.g. `app/studio/[[...tool]]/page.tsx`).

## Function Design

- Functional components with React Hooks exclusively (no class components).
- Small inline helper components (`SectionReveal`) kept in-file when tightly coupled to a single page's animation hierarchy.
- Default export for pages and root layouts; named exports for schemas, library clients, and utilities.

## Module Design

- Feature-encapsulated route directories under `app/`.
- Central schema barrel exports via `sanity/schemas/index.ts` and `sanity/schemaTypes/index.ts`.
- Clear isolation between public reader client (`client.ts`) and privileged server mutation client (`writeClient.ts`).
