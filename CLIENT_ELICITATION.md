# Mt. Zion MBC — Website Review & Content Elicitation Document

**Prepared for:** Mt. Zion Missionary Baptist Church
**Prepared by:** Alfred Davis
**Date:** September 2026

**Purpose:** This document reviews the current state of the website and collects the decisions, content, and approvals needed before launch. Please answer the questions in each section — even a "no change" or "keep as-is" is helpful.

---

## How to Use This Document

- Each section corresponds to a page or feature on the current site.
- **Bold questions** need your input. Where a placeholder value is currently shown, that value is fabricated until you confirm it.
- Where a feature is marked **[PLACEHOLDER]**, it currently does nothing — we need your decision on how to make it work.
- You don't have to answer everything at once. Prioritize Section 1 (critical content) and Section 3 (functional decisions).

---

## Section 1 — Critical Content Confirmations

These items appear on the site now but use placeholder or assumed values. Please confirm or correct each one.

### 1.1 Church Identity
| Field | Currently shown | Correct? |
|---|---|---|
| Church name | "Mt. Zion Missionary Baptist Church" | ☐ Yes ☐ No → __________ |
| Address | 12741 E Rd, Burt, MI 48417 | ☐ Yes ☐ No → __________ |
| Phone | (989) 770-4630 | ☐ Yes ☐ No → __________ |
| Email | info@mtzionburt.org (on Contact page) | ☐ Yes ☐ No → __________ |
| Website domain | mzmbchurch.org | ☐ Yes ☐ No → __________ |

### 1.2 Pastor & Leadership (currently placeholder names)
- **Senior Pastor:** Currently listed as "Rev. Dr. James Smith" — is this the real name? __________
- **First Lady:** Currently listed as "Mrs. Sarah Smith" — correct? __________
- **Pastor bio:** The current bio ("…served Mt. Zion for over 20 years…") is generic. Please provide a real bio (1–3 sentences).
- **First Lady bio:** Same — please provide real text or let us remove this card.

### 1.3 Church Board (currently fictional placeholder names)
- **Deacon Board:** Currently "John Doe (Chairman), Michael Johnson, Robert Williams"
  → Please provide the **real deacon names and roles** (or say "remove this section"):
- **Trustee Board:** Currently "Emily Davis, David Wilson, Mary Brown"
  → Please provide real trustee names and roles:

### 1.4 History Page
- The History page currently contains placeholder text, including a line that literally reads `"[Insert historical narrative here]"`.
- **Question:** Can you provide the real church history? Suggested format:
  - Founding year and founders
  - Key milestones (building projects, anniversaries, past pastors)
  - Notable community impact / programs
  - Current vision / "Today"
- The footer on the History page says "serving our community since 1925" and the Events page references "98 years" (≈2023), while event dates are in 2025. **What is the actual founding year?** __________

---

## Section 2 — Page-by-Page Review

### 2.1 Home Page (`index.html`)
**What's there:** Hero with mission statement, welcome section, service times, upcoming events preview, full footer.

**Questions:**
1. The hero image is a photo (`assets/hero.jpg`, ~970 KB). Is this the final image, or would you prefer a photo of the actual church exterior/congregation?
2. Mission statement: "Exalting the Savior, Equipping the Saint, Evangelizing the Sinner." — Confirm this is the official church mission statement. ☐ Yes ☐ No → __________
3. Service times shown:
   - Sunday School 9:30 AM
   - Sunday Morning Worship 11:00 AM
   - Wednesday Bible Study 7:00 PM
   
   Are these correct? ☐ Yes ☐ No → Please provide the current schedule:
4. The two "Upcoming Events" on the home page (Fall Community Harvest, Choir Rehearsal) — keep these, or replace with real upcoming events? "Learn more" links currently go nowhere (`href="#"`).

### 2.2 Leadership Page (`leadership.html`)
**What's there:** Pastor card with photo, First Lady card with a "Photo Placeholder" box, Deacon/Trustee lists.

**Questions:**
1. Will you provide a real photo of the pastor? (Current: `pastor_placeholder.png`) ☐ Yes ☐ No
2. Do you want the First Lady included on the leadership page? Some Baptist churches include this, some don't.
3. Are there other leaders to feature? (e.g., choir director, youth minister, church clerk, usher board president)
4. Should photos of deacons/trustees be shown, or is a text list preferred?

### 2.3 History Page (`history.html`)
See Section 1.4. Additionally:
1. Are there historical photos you'd like to include (old building, past pastors, anniversary celebrations)?
2. Would you like a timeline-style layout instead of the current text paragraphs?

### 2.4 Events & Schedule Page (`events.html`)
**What's there:** Weekly schedule + 3 hardcoded upcoming events (Oct 15, Nov 12, Dec 24).

**Questions:**
1. Is the weekly schedule correct and complete? Should anything be added (e.g., youth group, Sunday evening service, prayer line)?
2. The 3 upcoming events are static text. How do you want to manage future events?
   - ☐ I'll email you updates whenever there's a new event (manual updates)
   - ☐ Connect to Google Calendar (you edit a shared calendar, site auto-updates)
   - ☐ A simple admin page where I can add/edit events (requires hosting + small backend)
3. Should events have a "Add to Calendar" button for visitors?

### 2.5 Pastor's Editorial Page (`editorial.html`)
**What's there:** A single static article with a "CMS Integration" hook (commented out in the code) for Contentful.

**Questions:**
1. Is the current welcome message from the pastor acceptable as a launch post, or do you want to write a fresh first editorial?
2. How will the pastor publish new editorials going forward?
   - ☐ Manual — I email you the text, you update the page (no ongoing cost)
   - ☐ Contentful CMS — I log in, type a new post, it appears automatically (small monthly fee, code is already stubbed in)
   - ☐ Other: __________
3. How frequently do you plan to publish? (weekly / monthly / occasional) — this affects whether we set up automation.

### 2.6 Prayer & Giving Page (`giving.html`)
**What's there:** A prayer request form (does nothing), a "Ways to Give" section with a "Give Now" button (does nothing) and a placeholder CashApp tag.

**Questions — Prayer Request Form:**
1. Where should submitted prayer requests go?
   - ☐ Sent to a church email address (e.g., pastor@mzmbchurch.org)
   - ☐ Sent to a prayer team distribution list
   - ☐ Stored for review in a dashboard
   - ☐ Remove the form entirely for now
2. Should prayer requests be **private** (email only) or **public** (a visible prayer wall on the site)?

**Questions — Giving:**
3. Which online giving method do you want to use?
   - ☐ Givelify (popular for churches)
   - ☐ Tithe.ly
   - ☐ Vanco / Pushpay
   - ☐ CashApp / Venmo (a QR code + handle)
   - ☐ Stripe (custom checkout — more setup)
   - ☐ Mail/in-person only for now (remove "Give Now" button)
4. If using CashApp/Venmo, what is the real handle? (Currently `$MtZionPlaceholder`)
5. Do you want a separate "Give" page later with recurring/tithe tracking, or is this single page enough?

### 2.7 Contact Page (`contact.html`)
**What's there:** Address/phone/email, a Google Map embed, and a contact form.

**Questions:**
1. The map embed currently uses **fake coordinates** and does not show the real church location. To fix this, I need a real Google Maps embed link (or permission to generate one from the address). ☐ I'll provide ☐ Generate from the address above
2. Contact form — same question as prayer form: where should submissions go?
   - ☐ Church email: __________
   - ☐ Form service (Formspree, Netlify Forms) → recommend __________
3. Is the email `info@mtzionburt.org` or `info@mzmbchurch.org`? (See Section 1.1)
4. Do you want to add:
   - ☐ Service times on the contact page
   - ☐ A "Plan Your Visit" section (what to expect, parking, attire)
   - ☐ Social media links (Facebook? YouTube?)

---

## Section 3 — Functional Decisions Needed

These features currently exist in the code but **do not work** because they're stubbed out. We need a decision on each before launch.

| # | Feature | Current state | Decision needed |
|---|---|---|---|
| 1 | Contact form | `action="#"`, does nothing | Where do submissions go? |
| 2 | Prayer request form | `action="#"`, does nothing | Where do submissions go? |
| 3 | "Give Now" button | No link | What giving platform? |
| 4 | Google Map | Fake coordinates | Real embed URL needed |
| 5 | Pastor's Editorial CMS | Commented-out Contentful code | Use CMS or stay manual? |
| 6 | Event dates | Hardcoded in HTML | Manual updates or calendar sync? |
| 7 | CashApp handle | `$MtZionPlaceholder` | Real handle or remove |

---

## Section 4 — Additional Features to Consider

These aren't in the current site but are common and valuable for church websites. Mark the ones you'd like added (now or in a future phase):

### Worship & Media
- ☐ **Live stream of Sunday services** (YouTube Live or Facebook Live embed)
- ☐ **Sermon archive** — audio/video recordings, searchable by date or scripture
- ☐ **Podcast feed** of sermons
- ☐ **Sermon series** landing pages

### Community & Outreach
- ☐ **Photo gallery** (fellowship events, building, community service)
- ☐ **Newsletters** — signup form + past editions archive
- ☐ **Ministry groups** page (men's, women's, youth, choir, usher board)
- ☐ **Food pantry / community services** info & hours
- ☐ **New members / "Join our church"** page

### Visitor Information
- ☐ **"Plan Your Visit"** page (what to expect, parking, dress code, childcare/nursery availability)
- ☐ **FAQ** page (common first-time visitor questions)
- ☐ **Weather/cancellation policy**
- ☐ **Accessibility info** (wheelchair access, hearing assistance)

### Engagement
- ☐ **Prayer wall** — public prayer requests visible to congregation
- ☐ **Event registration / RSVP** forms (e.g., for the anniversary banquet)
- ☐ **Mailing list signup** (for announcements, bulletins)
- ☐ **Weekly bulletin PDF** download
- ☐ **Bible study resources / reading plan** links

### Technical / Reach
- ☐ **Search** functionality (once content grows)
- ☐ **Social media integration** (Facebook page feed, YouTube channel embed)
- ☐ **Google Business Profile** sync (helps the church show up in local search/maps)
- ☐ **Spanish language version** (if the community would benefit)

---

## Section 5 — Branding & Visual Direction

1. **Logo:** The current `logo.svg` — is this the final approved logo? ☐ Yes ☐ No → Please provide final logo files (SVG + PNG, ideally with transparent background).
2. **Color palette:** Currently warm browns/terracotta/goldenrod on cream. Confirm this matches the church's branding. ☐ Yes ☐ Adjust → __________
3. **Photography:** The current hero and pastor images are ~2.6 MB total and may be placeholders.
   - Will you provide real, high-quality photos of the church, congregation, and events?
   - Do you want me to source stock photography as a stopgap, or wait for real photos?
4. **Favicon:** A favicon is set (`assets/logo.svg`). Confirm the logo works at small sizes, or provide a dedicated icon.
5. **Tone of voice:** The current copy is warm and welcoming. Is this the right tone, or should it be more formal / more contemporary?

---

## Section 6 — Technical & Hosting

1. **Where will the site be hosted?** (e.g., Netlify, Vercel, a traditional web host, the church's existing hosting)
2. **Domain:** `mzmbchurch.org` — is this registered and pointed at the host? Who manages DNS?
3. **SSL/HTTPS:** The site uses `https://www.mzmbchurch.org/` in meta tags. Is the SSL certificate active?
4. **Email hosting:** Where are church emails hosted? (Needed if forms send to a church address.)
5. **Analytics:** Would you like Google Analytics or a privacy-friendly alternative (e.g., Plausible) installed to track visitors?
6. **Backups/version control:** The site is in Git. Do you want a way to easily request updates (e.g., a simple process where you email changes)?

---

## Section 7 — Assets & Content Checklist

Please provide the following so we can replace placeholders:

- ☐ **Logo files** (final, high-resolution, transparent)
- ☐ **Hero image** (church exterior or congregation — high-res, landscape)
- ☐ **Pastor photo** (professional headshot preferred)
- ☐ **First Lady photo** (if including her on the leadership page)
- ☐ **Deacon/trustee photos** (optional — see Section 2.2)
- ☐ **Event photos** (for the events preview / gallery)
- ☐ **Real church history text** (Section 1.4)
- ☐ **Real pastor bio** (Section 1.2)
- ☐ **Confirmed weekly schedule** (Section 2.1)
- ☐ **First pastor's editorial** (Section 2.5)
- ☐ **Online giving platform decision** (Section 2.6)
- ☐ **Real Google Maps embed** (or permission to generate, Section 2.7)
- ☐ **Correct email address** (Section 1.1)

---

## Section 8 — Open Questions for the Client

1. **Is there a target launch date?** __________
2. **Who is the primary point of contact** for content and approvals? __________
3. **Who will maintain the site after launch?** (pastor, a church member, a volunteer, or ongoing contract with us?)
4. **Are there other churches or organizations you'd like linked** (denomination, sister churches, community partners)?
5. **Any legal/disclaimer requirements?** (e.g., 501(c)(3) disclosure, privacy policy, terms of use for the giving page)
6. **Anything you've seen on other church websites that you'd like ours to have?** __________

---

## Next Steps

Once you've reviewed this document:
1. Fill in the **content confirmations** in Section 1 — these unblock the most work.
2. Make the **functional decisions** in Section 3 — these determine whether we need a backend/form service.
3. Mark the **additional features** in Section 4 you want now vs. later.
4. Send the **assets** listed in Section 7.

After we receive your input, we'll:
- Replace all placeholders with real content
- Wire up the forms and giving based on your choices
- Replace the fake map with the real one
- Optimize the images for web (current images total ~2.6 MB and will slow the site)
- Fix a few accessibility and consistency issues we found during review
- Send you a final review before going live

**Estimated turnaround after content is received:** [X days]

---

*If anything in this document is unclear, or if a question doesn't apply to Mt. Zion, just write "N/A" — we'll review together on our next call.*

