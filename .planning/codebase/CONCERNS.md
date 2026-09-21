# Codebase Concerns

**Analysis Date:** 2026-09-21

## Tech Debt

**1. Styling Strategy Fragmentation:**
- **Issue**: Three distinct styling approaches coexist across the application:
  1. CSS Custom Properties in `app/globals.css`.
  2. Tailwind CSS v4 utility classes.
  3. Extensive raw inline `style={{ ... }}` objects on almost every JSX element.
- **Impact**: Maintenance friction, difficulty enforcing responsive breakpoints consistently, and large component file sizes.
- **Remediation**: Migrate inline styling objects to semantic Tailwind classes and established design tokens documented in `design-system/MASTER.md`.

**2. Duplicate & Dead Schema Artifacts [RESOLVED]:**
- **Status**: Removed obsolete `content/schemas/` directory. All active schemas are typed in `sanity/schemas/`.

**3. Duplicate Configuration & Client Definitions [RESOLVED]:**
- **Status**: Removed redundant `sanity/sanity.config.ts` and `lib/sanity.ts`. Root `sanity.config.ts` and `sanity/lib/client.ts` are canonical.

**4. Layout Duplication [RESOLVED]:**
- **Status**: Removed redundant second `<SanityLive />` invocation from `app/layout.tsx`. Single root subscription now active.

## Known Bugs & Functional Gaps

**1. Local Dependencies (`node_modules`) [RESOLVED]:**
- **Status**: Dependencies restored via `npm install`. Typechecking passes with zero errors.

**2. Incomplete Public Form Hookup:**
- **Issue**: While `app/api/submit-form/route.ts` was implemented to accept `contact` and `prayer` requests, the client-side forms on `/contact` and `/prayer` require full validation to guarantee error handling and loading feedback when `SANITY_WRITE_TOKEN` is unset.
- **Remediation**: Add client-side validation, error toast/summary display, and ensure environment variables are documented.

## Security Considerations

**1. Public Form Endpoint Abuse & Spam:**
- **Issue**: `/api/submit-form` does not enforce rate limiting or captcha verification (Cloudflare Turnstile or reCAPTCHA). Anyone can submit arbitrary JSON payloads directly into the Sanity dataset if the write token is active.
- **Remediation**: Implement IP-based rate limiting or a honeypot field / captcha check before writing to Sanity.

**2. Production Write Token Security:**
- **Issue**: `netlify.toml` contains `SANITY_WRITE_TOKEN = "add-your-token-here"` committed into source control.
- **Remediation**: Ensure production write tokens are only stored in Netlify environment variables, never hardcoded in repository files.

## Performance Bottlenecks

**1. Heavy Client-Side Rendering Islands:**
- **Issue**: Several major content pages (`app/page.tsx`, `app/events/page.tsx`, etc.) are marked `"use client"` primarily for Framer Motion scroll triggers, executing client-side GROQ queries via `useEffect` instead of leveraging React Server Components (RSC) with streaming or static pre-rendering.
- **Impact**: Slower initial content paint, increased client JS bundle, and lost SEO pre-rendering benefits.
- **Remediation**: Move data fetching to Server Components and isolate Framer Motion animations to small leaf client components.

## Fragile Areas

**1. Placeholder Content in Live Views:**
- **Issue**: Extensive placeholder content remains on public routes as documented in `CLIENT_ELICITATION.md`:
  - Senior Pastor name ("Rev. Dr. James Smith") and generic bio.
  - Fictional deacon and trustee board rosters.
  - History page timeline with literal `[Insert historical narrative here]` placeholders.
  - Inconsistent founding year references (1925 vs. 98 years vs. 2025 event dates).
- **Remediation**: Complete client content approvals following `CLIENT_ELICITATION.md`.

## Scaling Limits

**1. Sanity CDN Quotas & Live Fetch:**
- Currently sufficient for church traffic; however, client-side fetches on every mount will burn CDN API request quotas faster than Server Component ISR caching (`sanityFetch` with tags).

## Dependencies at Risk

- React 19.2.8 and Next.js 16.3.5 are very modern; some older Sanity plugins or community React libraries can throw peer dependency warnings during install (`--legacy-peer-deps` might be needed in some environments).

## Missing Critical Features

- Automated test suite (unit, integration, and E2E).
- Integrated giving portal (Stripe, Tithe.ly, or Givelify integration).
- Live audio/video streaming integration on sermons page.

## Test Coverage Gaps

- 0% automated test coverage across all features, routes, and schemas.
