# Project Context — MZMB Church Website

## Stack
- Next.js 16.3.5 (App Router, `next/font`, `next/image`)
- React 19.2.8 / react-dom 19.2.8
- TypeScript 5 (`strict: true`, `noEmit: true`)
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Framer Motion 13.3.0
- Lucide React 1.46.0
- ESLint 9 + `eslint-config-next` (core-web-vitals + TypeScript presets)

## Architecture
- **Pattern**: App Router (`app/`) with feature-folders (beliefs, contact, events, giving, history, leadership, ministries, prayer, sermons, visit). Root `layout.tsx` provides Navbar, Footer, fonts (`Inter` + `Merriweather`), and CSS variables.
- **Data Flow**: Static page components → React Server Components (pages default) / Client Components (`"use client"` for Navbar, Prayer, Contact forms). No backend service layer; forms handle submit via local `useState` only (no POST endpoint or validation library).
- **Business Logic vs I/O**: Business logic is thin; presentation logic (inline styles, grid templates) dominates each page. No repository/service/controller separation. No ORM or database connection.

## Conventions (Observed)
- **Error Handling**: None structured. Forms set `submitted = true` locally; no try/catch, no global error boundary, no structured error messages.
- **API Design**: No REST/GraphQL/RPC backend exposed. Static HTML output (`next build`). Forms are decorative (no `action` endpoint).
- **Type System**: Strict TypeScript (`strict: true`, `esModuleInterop`, `noEmit`). Props typed inline; no `any` observed in source. No external interfaces/DIP layer (everything is page-level).
- **Observability**: No structured logging, no health checks, no metrics, no tracing. No `console.log` usage observed in pages.
- **Testing**: Zero tests in repo. No `__tests__`, `.test.*`, or `.spec.*` files. No jest/vitest/playwright config.

## Signals / Active Considerations
- **Consistency Gap**: Heavy use of inline `style={{ ... }}` objects alongside Tailwind utility classes (`className="btn btn-primary"`) and CSS variables (`var(--color-primary)`). Three styling strategies coexist.
- **Debt Hotspot**: Form pages (`contact`, `prayer`) have no submission endpoint — mock behavior only. Any real data capture requires a new backend/service integration.
- **Integration Points**: No Stripe/payment wrapper (`giving` page is static), no CMS, no email/form handler (SendGrid, Formspree, etc.). No auth/session layer.
- **Conventions**: Team prefers functional components over classes. Mobile-first responsive design with CSS Grid (`grid-template-columns`) rather than pure Tailwind grid utilities.
- **Legacy**: `legacy/` directory exists but is empty (no migration artifacts present).
