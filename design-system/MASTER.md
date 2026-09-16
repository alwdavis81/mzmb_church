# Design System — Mt Zion Church (Bold Contemporary / Accessible & Ethical)

From `ui-ux-pro-max` searches: `--design-system` (church service, bold) + `--domain ux` (nav, forms) + `--domain typography` (bold editorial).

## Direction
Bold Contemporary: dark navy/near-black (`#0F172A`) + warm cream (`#F8F5F0`) + gold accent (`#C89F5E`). High contrast, large type, editorial hierarchy.

## Pattern
Hero > Service Info > Ministries Preview > CTA. Social proof (testimonials/quotes) after problem statement.

## Colors
- Primary (nav/heading): `#0F172A` (dark navy)
- Primary Dark: `#162033` (secondary navy)
- Secondary (accent): `#C89F5E` (gold)
- Secondary Dark: `#A87D45` (gold hover)
- Background: `#F8F5F0` (warm cream)
- Background Dark: `#0F172A` (dark navy sections)
- Card/Surface: `#FFFFFF`
- Foreground/Text: `#1A1A2E` (near-black)
- Foreground Light: `#FFFFFF`
- Muted: `#6B6358`
- Border: `#E8DCC4`
- Focus ring: `#C89F5E`

## Gradients
- Navy Gradient: `linear-gradient(135deg, #0F172A 0%, #162033 100%)`
- Gold Gradient: `linear-gradient(135deg, #C89F5E 0%, #D4A85A 100%)`
- Cream Gradient: `linear-gradient(180deg, #F8F5F0 0%, #F0EAE0 100%)`

## Typography
- Heading: Inter (900 for hero, 700 for H2, 600 for H3) — letter-spacing `-0.03em` on heroes
- Body: Inter (400, 500, 600) — clean and contemporary
- Pull quotes: Playfair Display (400 italic) for editorial feel
- Scale: 64px hero, 48px H2, 36px H3, 20px sub, 16px body, 14px label, 12px small

## Spacing Rhythm (8px base)
- xs: 0.5rem (4px)
- sm: 1rem (8px)
- md: 1.5rem (12px)
- lg: 2rem (16px)
- xl: 3rem (24px)
- 2xl: 4rem (32px)
- 3xl: 6rem (48px)
- 4xl: 8rem (64px)

## Shadows
- Shadow Card: `0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.06)`
- Shadow Card Hover: `0 10px 25px rgba(15, 23, 42, 0.1), 0 4px 10px rgba(15, 23, 42, 0.08)`
- Shadow Deep: `0 20px 40px rgba(15, 23, 42, 0.15), 0 8px 16px rgba(15, 23, 42, 0.1)`
- Shadow Gold: `0 8px 24px rgba(200, 159, 94, 0.3)`

## Radius
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px

## Motion
- Spring: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, slightly bouncy)
- Ease Out Expo: `cubic-bezier(0.16, 1, 0.3, 1)` (used for entrance animations)
- Duration: 400ms (standard), 600ms (dramatic), 200ms (quick)
- Stagger: 80ms between children

## Key Effects (from search)
- Focus: 3-4px gold ring
- Skip link: visible on focus only (already added)
- Touch: ≥44px (targeting 48px)
- Reduced motion: respected (already added)
- Card hover: translateY(-4px) + shadow deepen + border color shift
- Button hover: translateY(-2px) + shadow deepen
- Link hover: underline from center (scaleX transform)

## Checklist (Pre-Delivery)
- [x] Skip link
- [x] Active nav state CSS
- [x] Theme-color meta
- [ ] Unify inline styles → tokens
- [ ] Form validation / error summary
- [ ] Breadcrumb / back link
- [ ] Service times banner
- [ ] Emoji → Lucide icons (ministry cards use emojis — replace with Lucide icons)
