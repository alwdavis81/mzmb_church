# UI/UX Review Findings - Mt. Zion Missionary Baptist Church

## 🔴 Critical Issues

### 1. Broken / Missing Image Placeholder in Hero Image
- **Location**: `index.html` events preview section, second event card
- **Issue**: Uses `.event-imagePlaceholder` class with inline styles; no corresponding CSS in `styles.css`
- **Impact**: Visual inconsistency between event cards (first has real image with `object-fit: cover`, second is solid color)

### 2. Navigation Active State Not Dynamic
- **Location**: All HTML files (hardcoded `class="active"` on current page link)
- **Issue**: Missing CSS rule for `.nav-links li a.active` in `styles.css`
- **Impact**: Active navigation state is invisible to users, reducing wayfinding clarity

## 🟡 UX Issues

### 3. Forms Have No Validation / Feedback
- **Location**: Prayer request form (`giving.html`), Contact form (`contact.html`)
- **Issue**: 
  - Forms use `action="#"` (no submission endpoint)
  - No success/error messaging on submit
  - No visual feedback for form validation states

### 4. No Back Button / Breadcrumb
- **Location**: All sub-pages (contact, history, leadership, etc.)
- **Issue**: No way for users to navigate back to homepage without using browser back button
- **Impact**: Poor wayfinding, especially for users who land on sub-pages from search/social

### 5. Missing "Service Times" CTA on Non-Index Pages
- **Location**: All sub-pages except `index.html`
- **Issue**: Weekly service times (primary visitor need) only visible on homepage
- **Impact**: Users must navigate back to homepage to see service times

## 🟡 Accessibility Issues

### 6. No Skip-to-Content Link
- **Location**: All pages
- **Issue**: Keyboard/screen reader users must tab through full navbar before reaching main content
- **Impact**: Poor accessibility for assistive technology users

### 7. Missing ARIA Label on Hamburger Icon
- **Location**: `.nav-toggle` button in all headers
- **Issue**: Button uses `☰` character without `aria-label` or accessible name
- **Impact**: Screen readers may announce as "bullet" or unclear symbol

### 8. Touch Target Sizes (Mobile)
- **Location**: Mobile navigation menu (`.nav-links.active li a`)
- **Issue**: Nav links have `font-size: 1.5rem` with `gap: 2.5rem` but no explicit padding
- **Impact**: Clickable area may be too small (<44×44px WCAG minimum)

## 🟢 Minor Polish

| Item | Detail |
|------|--------|
| **Placeholder images** | Verify existence of `pastor_placeholder.png`, `community_placeholder.png` in `/assets/` |
| **Missing theme-color meta** | Add `<meta name="theme-color" content="#8B4513">` for browser tab customization |
| **No hero image loading state** | Add fallback/error handling for hero image load failures |
| **Missing prefers-reduced-motion** | Wrap `.reveal` animations in `@media (prefers-reduced-motion: no-preference)` |

---

## Recommended Priority Order

1. **Critical Fixes** (Immediate):
   - Add `.nav-links li a.active` styling
   - Fix/replace `.event-imagePlaceholder` with proper CSS class

2. **High Impact UX** (Next Sprint):
   - Add skip-to-content link
   - Add ARIA label to hamburger button
   - Improve mobile nav touch targets
   - Add breadcrumb/back link to sub-pages

3. **Accessibility Polish** (Ongoing):
   - Form validation feedback
   - Prefers-reduced-motion media query
   - Theme color meta tag
   - Loading states for images

4. **Content/Feature Enhancements** (Future):
   - Persistent service times banner/sidebar
   - CMS integration for dynamic content (already partially implemented in script.js)

---

**Next Steps**: Review these findings and select which issues to address in the next development cycle.