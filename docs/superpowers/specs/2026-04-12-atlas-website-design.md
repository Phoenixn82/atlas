# ATLAS Website — Design Specification
**Date:** 2026-04-12  
**Status:** Approved  
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, Resend

---

## 1. Project Context

ATLAS is a real web design & SEO agency. The site is the primary sales tool — it must convert visitors into booked calls. The name references the Greek Titan Atlas; the mythology (carrying the world) runs through every design decision.

**Aesthetic:** NASA Graphics Standards Manual × Swiss International Style × Editorial White Space.  
**Feel:** Precision instrument. Not a portfolio. Not a brochure. A closing argument.

---

## 2. Tech Setup

### Scaffold
- `create-next-app` with TypeScript, App Router, Tailwind CSS, ESLint
- Additional packages: `framer-motion`, `react-hook-form`, `resend`, `@hookform/resolvers`, `zod`

### Fonts
- IBM Plex Mono loaded via `next/font/google` (Regular 400, Medium 500, SemiBold 600, Bold 700)
- Entire site is monospaced — no exceptions

### Tailwind Config
Extended with:
- Atlas color tokens (`atlas-white`, `atlas-black`, `atlas-red`, `atlas-red-bright`)
- Gray scale (`gray-100` through `gray-900`)
- Custom border widths: `hairline` (1px), `thin` (2px), `medium` (3px), `thick` (4px), `heavy` (6px), `ultra` (8px)
- Spacing additions: `18` (72px), `30` (120px), `40` (160px), `50` (200px)
- Max width: `site` (1440px)
- Font family: `mono` stack

### Global CSS
- CSS custom properties for all design tokens
- `border-radius: 0` base reset (rectangles are always sharp)
- Base transition: `border-color 150ms ease, color 150ms ease, background-color 150ms ease`

### next.config.js
- Image optimization enabled
- Strict mode on

---

## 3. Design System Rules

### Color
- Page at rest: black (`#0A0A0A`) on white (`#FFFFFF`). No other colors.
- Red (`#E50000`) appears ONLY on hover/focus/active states.
- Only exception: a single resting red dot on the "recommended" pricing tier badge.
- No gradients. No shadows. No background colors except white and rare `gray-100`.

### Typography
- Every piece of text uses the IBM Plex Mono stack.
- Display/Hero: 72–96px, 700, letter-spacing -0.02em, uppercase
- H1: 48–64px, 700, letter-spacing -0.01em, uppercase
- H2: 32–40px, 600, uppercase
- H3: 24–28px, 600, uppercase or mixed
- Body: 16–18px, 400, line-height 1.7
- Caption/Meta: 12–14px, 400, uppercase, letter-spacing 0.1em

### Shapes
- Rectangles: sharp corners only, `border-radius: 0`
- Circles: `border-radius: 50%`, perfect rounds only
- Border hierarchy: 1px hairline → 2px standard → 3–4px emphasized → 6–8px structural
- On hover: border/stroke transitions to red at 150ms

### Spacing
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200px
- Section vertical padding: 120–160px desktop, 64–80px mobile
- Container: max-width 1440px, 64px margins desktop, 24px mobile
- White space is sacred — 30–40% of any viewport should be empty

### Animation
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, smooth deceleration
- Duration: 300–600ms
- Stagger: 50–100ms between sequential elements
- Never: bounce, spring with high bounce, elastic, playful
- Page entrance: slide up 20–40px + fade in
- Lines draw themselves: `width: 0 → 100%`
- Page transition: clip-path wipe `inset(0 0 100% 0) → inset(0 0 0 0)`, 400ms

---

## 4. Shared UI Components

### `HorizontalRule`
Props: `weight` (hairline|thin|medium|thick|heavy), `animate` (boolean), `color` (black|red), `className`  
Used everywhere. Separates every section. Animates width 0→100% on scroll when `animate={true}`.

### `SectionReveal`
Framer Motion wrapper. `whileInView` fade + translateY(20px→0). Threshold: 0.2. Wraps every major section.

### `Button`
Variants: `primary` (black fill, white text → red fill on hover), `ghost` (outlined → red border + text on hover).  
Sharp rectangle. No border-radius. 150ms transition.

### `Card`
2px border, no radius. Hover: border → red, translateY(-4px).

### `Input`
Bottom-border only (no full rectangle). 1px border → 2px + red on focus. Monospaced text.

### `SectionMarker`
Format: `01 — SERVICES`. 12–14px, uppercase, letter-spacing 0.1em. Used at top of every section.

### `Circle`
Sizes: sm (8–24px filled) to xl (200–600px outlined). Hover: subtle scale(1.05) pulse.

### Atlas SVGs (inline, stroke-animatable)
- `AtlasFigure` — props: `variant` (full|silhouette|sphere-only|partial-crop), `size` (sm|md|lg|xl), `interactive`
- `AtlasMark` — small silhouette for nav (~36px tall), home link
- `AtlasSphere` — standalone circle/sphere element

Line-art style, classical engraving aesthetic, clean black strokes matching section border weight. Stroke transitions to red on hover when `interactive={true}`.

---

## 5. Global Layout

### Navigation (fixed top)
- Left: `AtlasMark` as home link
- Right: `SERVICES` `PORTFOLIO` `PRICING` `CONTACT` — 12px, uppercase, letter-spacing 0.1em
- Hover: text → red, border-bottom appears
- 1px `HorizontalRule` beneath full nav bar
- Desktop: phone/email visible right-aligned in caption style
- Mobile: two-line hamburger → full-screen overlay, large nav text, Framer Motion clip-path reveal
- Background: white, no blur/shadow

### Footer
- 6–8px top `HorizontalRule`
- Three columns: ATLAS info + small `AtlasFigure` centered | Quick links | Contact (phone, email, hours)
- Bottom: 1px `HorizontalRule` + copyright caption
- "Back to top" circle with up arrow, right-aligned

---

## 6. Pages

### Home (`/`)

**Section 01 — Hero (100vh)**
- Display headline (provocative, uppercase): e.g. `WE DON'T BUILD WEBSITES. WE BUILD REVENUE.`
- One-line subtitle explaining value prop
- Primary CTA button: `BOOK YOUR FREE STRATEGY CALL`
- `AtlasFigure` (full, large) integrated into grid on one side — sphere frames/overlaps headline
- Thin `HorizontalRule` above and below headline block
- Section number marker `01` top corner

**Section 02 — Services Overview**
- `SectionMarker`: `02 — SERVICES`
- 2-line intro paragraph
- 3 `Card` components: WEB DESIGN | SEO | WEB + SEO BUNDLE (bundle has thicker border)
- Each card: geometric icon, short 2-line description
- CTA: `VIEW ALL SERVICES →` text link
- `HorizontalRule` above and below

**Section 03 — Portfolio Preview**
- `SectionMarker`: `03 — SELECTED WORK`
- 3 project blocks (large rectangles): image placeholder + project name + industry tag
- Hover: thin red border overlay, name text → red
- CTA: `VIEW ALL PROJECTS →`
- `AtlasFigure` (partial-crop) at bottom edge of section

**Section 04 — Why ATLAS**
- `SectionMarker`: `04 — WHY US`
- 4 differentiators: large number (`01`–`04` at 48–64px in light gray) + bold headline + 1-line description
- Dense, tight grid — "intricate in small areas" moment

**Section 05 — CTA Strip**
- Full-width, thick top + bottom `HorizontalRule`
- Large headline: `READY TO LAUNCH?`
- Two CTAs: `BOOK A CALL` (primary button) + `SEND A MESSAGE` (text link)
- 160px+ vertical padding

---

### Services (`/services`)

**Hero:** `SERVICES` in display type, thin `HorizontalRule` below.

**Three service blocks** (Web Design, SEO, Bundle):
- What's included list (circle markers)
- Process flow: `DISCOVER → DESIGN → DEVELOP → DEPLOY` — horizontal, circle markers at each step, thin connecting lines
- Timeline + deliverables

**Pricing Table:**
- 3 columns (tiers), sharp rectangle borders
- Feature rows: filled circle = included, outlined = not
- Recommended tier: 4px border (vs 2px), single resting red dot badge — the ONE place red appears at rest
- Hover: entire column border → red
- CTA button at bottom of each column

---

### Portfolio (`/portfolio`)

**Filter bar:** `ALL | WEB DESIGN | SEO | BUNDLES` — text links, active state underlined in red.

**6-card grid:**
1. Meridian Coffee Co. — Local café, Web Design + SEO, 340% organic traffic increase
2. Apex Fitness Supply — E-commerce, Full redesign + SEO, 2.1x conversion rate
3. Hartwell & Associates — Law firm, Web design, Modern rebrand
4. Bloom Botanicals — E-commerce, SEO-focused, #1 for 12 keywords
5. CrossPoint Construction — Local contractor, Web Design + SEO bundle
6. Verity Skincare — DTC e-commerce, Full redesign, 67% bounce rate reduction

Card hover: red border overlay, title → red.

**`CaseStudyModal`:** Framer Motion clip-path reveal. Contains: client name, industry, challenge, solution, results/metrics, 2–3 mockup image placeholders.

---

### Contact (`/contact`)

**Split layout:**

Left — Contact Form (React Hook Form + Zod):
- Fields: Name, Email, Company/Website, Service (dropdown), Message
- Bottom-border-only `Input` style
- Submit → `/api/contact` route → Resend API → email delivery
- Inline success/error states

Right — Contact Info:
- Phone (clickable `tel:` link)
- Email (clickable `mailto:` link)
- Office hours
- Booking section placeholder (ready for Cal.com/Calendly embed)

---

## 7. API Route: `/api/contact`

- Method: `POST`
- Validates request body with Zod schema
- Calls Resend `emails.send()` with form data
- Returns `{ success: true }` or `{ error: string }`
- Requires `RESEND_API_KEY` env var
- Sends to a configurable `CONTACT_EMAIL` env var

---

## 8. SEO Implementation

- `generateMetadata` for every page — unique title, description, OG image, Twitter card
- `sitemap.xml` via `/app/sitemap.ts` route
- `robots.txt` via `/app/robots.ts` route
- JSON-LD structured data on relevant pages:
  - Home: `WebSite`, `Organization`
  - Services: `Service` (x3)
  - Contact: `LocalBusiness`
- `next/image` for all images — WebP, lazy loading, explicit dimensions (prevents CLS)
- Fonts via `next/font/google` — zero layout shift
- Single `<h1>` per page, proper landmark elements, aria labels
- Internal linking: every page links to every other page
- Target: 95+ Lighthouse score across all categories

---

## 9. Build Order

1. Scaffold Next.js project, install dependencies
2. Configure Tailwind, globals.css, CSS tokens
3. Create Atlas SVGs (AtlasMark, AtlasFigure, AtlasSphere)
4. Build shared UI: HorizontalRule, SectionReveal, Button, Card, Input, SectionMarker, Circle
5. Build Navigation + Footer
6. Build Home page (all 5 sections)
7. Build Services page
8. Build Portfolio page + CaseStudyModal
9. Build Contact page + /api/contact Resend integration
10. Add SEO: metadata, sitemap, robots, JSON-LD
11. Review, optimize, Lighthouse audit
12. Commit + push to GitHub

---

## 10. Environment Variables

```
RESEND_API_KEY=        # Resend API key
CONTACT_EMAIL=         # Email address to receive form submissions
NEXT_PUBLIC_SITE_URL=  # Full URL e.g. https://atlasagency.com
```
