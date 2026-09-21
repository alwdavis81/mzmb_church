# Testing Patterns

**Analysis Date:** 2026-09-21

## Test Framework

**Runner:**
- Currently unconfigured (no Jest, Vitest, or Playwright installed in `package.json`).
- Zero test configuration files currently present (`vitest.config.ts`, `jest.config.js`, or `playwright.config.ts` do not exist).

**Run Commands:**
- Currently missing from `package.json` scripts (`"scripts": { "dev": "next dev", "build": "next build", "start": "next start", "lint": "eslint" }`).

## Test File Organization

**Location:**
- No test files currently exist in the repository (`0` files matching `*.test.*` or `*.spec.*`).

**Recommended Future Location:**
- Unit & Component Tests: Collocated with source files (`components/Navbar.test.tsx`, `app/api/submit-form/route.test.ts`).
- E2E Tests: Dedicated root `e2e/` directory using Playwright.

## Test Structure

**Recommended Test Suite Structure for Future Tests:**
```typescript
import { describe, it, expect, vi } from "vitest";

describe("SubmitFormAPI", () => {
  it("rejects invalid submission type", async () => {
    // Arrange & Act
    // Assert status 400
  });
});
```

## Mocking

**CMS & Network Mocking Strategy:**
- In client components, Sanity `client.fetch` returns promises which should be mocked using standard module mocks (`vi.mock("@/sanity/lib/client")` or `msw`).
- In API route testing, `writeClient.create` should be mocked to avoid mutating the live production Sanity dataset during test runs.

## Fixtures and Factories

- **Sanity Documents**: Future fixtures should provide sample documents for:
  - `siteSettings`: Standard church name, contact info, service hours.
  - `event`: Upcoming service and conference fixtures with ISO dates.
  - `sermon`: Video URL, speaker, and series references.
  - `prayerRequest` and `contactSubmission`: Valid payload objects.

## Coverage

**Requirements:**
- Enforced target: None currently configured.
- Recommended targets once test harness is initialized:
  - Critical I/O paths (`app/api/submit-form/route.ts`): 100% branch coverage.
  - Schema integrity (`sanity/schemas/*`): Validation rule checks.
  - Interactive forms (`app/contact/page.tsx`, `app/prayer/page.tsx`): Submission flow verification.

## Test Types

**Unit Tests:**
- Not implemented yet. Priority candidates: Form payload validators, utility helpers, schema validation rules.

**Integration Tests:**
- Not implemented yet. Priority candidates: Next.js API route handlers interacting with Sanity mutation client mock.

**E2E Tests:**
- Not implemented yet. Priority candidates: Desktop and mobile navigation walkthroughs, prayer request submission form, accessibility tab navigation and skip-link execution.

## Common Patterns & Next Steps

**Recommended Testing Setup:**
1. Install Vitest and React Testing Library:
   `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
2. Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json`.
3. Add Playwright for E2E user verification.
