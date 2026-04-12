# ATLAS — Web Design & SEO Agency Website

## Project Overview

ATLAS is a web design and SEO agency website. The name references the Greek Titan Atlas — the figure who holds up the world. This mythology is central to the brand identity: ATLAS holds up its clients' digital presence.

The website must feel like a NASA technical document crossed with a high-end editorial magazine. Every pixel should feel intentional. The site should communicate: "We are precise, we are bold, and we will carry your business."

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS custom properties for the design system
- **Animation:** Framer Motion (preferred) or GSAP for scroll-driven and interaction animations
- **Fonts:** IBM Plex Mono (primary), Space Mono (accent/alternate)
- **Hosting:** Vercel
- **Form handling:** React Hook Form + server actions or API route
- **Booking:** Cal.com or Calendly embed (iframe)
- **SEO:** Next.js metadata API, structured data (JSON-LD), sitemap.xml, robots.txt

---

## Design System

### Philosophy

The design is inspired by three sources, fused into one system:

1. **NASA Graphics Standards Manual (1976)** — Rigid grid systems, systematic use of horizontal rules at varying weights, modular content blocks, Helvetica-driven typography hierarchy, technical precision in every layout decision. Content presented like mission-critical documentation.

2. **Swiss International Style** — Mathematical grid divisions, stark contrast between thick and thin rules, asymmetric balance, typography as the primary visual element, generous negative space as a design tool.

3. **Editorial White Space** — Magazine-level breathing room, content islands floating in white, small areas of dense craft that reward close inspection, the contrast between vast emptiness and intricate detail.

### Color Palette

```
--atlas-white:       #FFFFFF    /* Primary background — this IS the brand */
--atlas-black:       #0A0A0A    /* Primary text, borders, structural lines */
--atlas-red:         #E50000    /* Accent — ONLY appears on hover/click/active states */
--atlas-red-bright:  #FF0000    /* Intense red for critical interactive moments */
--atlas-gray-100:    #F5F5F5    /* Subtle section differentiation (use sparingly) */
--atlas-gray-300:    #D4D4D4    /* Secondary borders, thin structural lines */
--atlas-gray-500:    #737373    /* Secondary text, captions, metadata */
--atlas-gray-900:    #171717    /* Near-black for headings when needed */
```

**Critical rules:**
- Red NEVER appears in the default/resting state of the page. It only activates through user interaction (hover, click, focus, active states).
- When a user hovers over or clicks interactive geometric shapes, borders, buttons, or links — they flash or transition to `--atlas-red`.
- The page at rest is strictly black and white. This makes the red moments feel electric.
- No gradients. No shadows. No background colors except white and the rare `gray-100`.

### Typography

```
Font stack:
  --font-mono: 'IBM Plex Mono', 'Space Mono', 'Courier New', monospace;

Hierarchy:
  Display/Hero:     72–96px, font-weight: 700, letter-spacing: -0.02em, uppercase
  H1:               48–64px, font-weight: 700, letter-spacing: -0.01em, uppercase
  H2:               32–40px, font-weight: 600, uppercase
  H3:               24–28px, font-weight: 600, uppercase or mixed case
  Body:             16–18px, font-weight: 400, line-height: 1.7
  Caption/Meta:     12–14px, font-weight: 400, uppercase, letter-spacing: 0.1em
  Code/Technical:   14px, font-weight: 400
```

- ALL headings are monospaced. This is non-negotiable.
- Body text uses the same mono stack — the entire site is monospaced.
- Use uppercase + wide letter-spacing for labels, section markers, and navigation.
- Use tight letter-spacing on large display text to maintain visual density.

### Geometric Shape System

Shapes are not decoration — they ARE the layout structure. They define boundaries, create hierarchy, and guide the eye.

**Rectangles:**
- Sharp corners only. Never rounded. `border-radius: 0` everywhere.
- Border thickness varies to create hierarchy:
  - `1px` — hairline rules, subtle section dividers, grid lines
  - `2px` — standard content borders, card outlines
  - `3–4px` — emphasized sections, key content blocks
  - `6–8px` — major structural borders, hero section frames
- Rectangles can be filled (black) or outlined (stroke only).

**Circles:**
- Always perfectly round (`border-radius: 50%`).
- Used as: status indicators, bullet replacements, decorative accents, logo container, interactive elements.
- Same varying border thickness system as rectangles.
- Filled circles are small (8–24px) — used as dots/markers.
- Outlined circles can be large (200–600px) — used as compositional elements.

**Lines (horizontal rules):**
- The backbone of the layout. Thin and thick lines separate every major section.
- Pattern: thin line (1px) → content → thick line (4–8px) → content → thin line (1px)
- Lines always span the full width of their container or the viewport.
- Occasional vertical lines for column divisions.

**On hover/interaction:**
- Shape borders transition to `--atlas-red` with a sharp, fast transition: `transition: border-color 150ms ease, color 150ms ease`
- Filled shapes can invert: black fill → red fill
- Circles can pulse subtly on hover (scale 1 → 1.05)

### The Atlas Figure

The Atlas figure (the Titan holding up the sphere) is integrated directly into the site layout. It is NOT a traditional logo sitting in a corner — it is a compositional element woven into the page structure.

**Rendering approach:**
- Create the Atlas figure as an SVG illustration in a clean, line-art style (similar to the reference images: classical engraving/woodcut aesthetic with clean black strokes).
- The figure should work at multiple scales and crop levels.

**How it appears across the site:**

| Section | Atlas Treatment |
|---------|----------------|
| Navigation/Header | Small Atlas silhouette mark (just the figure, no sphere) as the home link — approximately 32–40px tall |
| Hero Section | Large Atlas figure (cropped or full) integrated into the grid layout — the sphere he holds can frame or contain the hero headline |
| Services Section | The sphere alone (circle motif) used as a section marker or container |
| Portfolio Section | Atlas figure partially visible at the edge/border of the section, as if supporting the portfolio grid from below |
| Footer | Full Atlas figure, small, centered — the "carrying the weight" metaphor as a closing statement |
| Loading/Transition | Minimal Atlas silhouette as a loading indicator |

- The figure's line weight should match the section's border weight system.
- On hover interactions near the Atlas figure, its strokes can transition to `--atlas-red`.

### Layout Grid

```
Container max-width: 1440px (content), full-bleed for structural lines
Column grid: 12-column, 24px gutter
Margin: 64px on desktop, 24px on mobile
Section padding: 120–160px vertical on desktop, 64–80px on mobile
```

- Use asymmetric layouts. Not everything is centered.
- Content blocks should feel "placed" on the grid with intention, not stacked.
- Leave at least 30–40% of any viewport as white space.
- The NASA manual uses a 3-column text layout — reference this for text-heavy sections.

### Spacing Scale

```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 200px
```

Use large jumps between elements. Don't be afraid of 160px or 200px gaps between sections. White space is the brand.

---

## Animation Specifications

Use Framer Motion. All animations should feel precise and mechanical — not bouncy, not organic. Think: engineering equipment moving into position.

### Global Animation Principles

```
Easing: [0.16, 1, 0.3, 1] (custom cubic-bezier — fast start, smooth deceleration)
Duration: 300–600ms for most transitions
Stagger: 50–100ms between sequential elements

NEVER use:
- Bounce effects
- Spring physics with high bounce
- Elastic easing
- Anything that feels "fun" or "playful"

DO use:
- Sharp ease-out curves
- Opacity fades paired with subtle transforms
- Clip-path reveals (rectangles wiping in)
- Border-color transitions on hover
```

### Specific Animations

**Page load / Section entrance:**
- Elements slide up 20–40px while fading in
- Structural lines draw themselves horizontally (width: 0 → 100%)
- Stagger content blocks within a section by 50–100ms

**Hover states:**
- Border color: black → red, 150ms
- Text elements: subtle translateX(4px) shift
- Geometric shapes: borderColor transition + optional subtle scale(1.02)
- Cursor: use default cursor everywhere except on interactive elements

**Scroll-triggered:**
- Sections fade in as they enter viewport (threshold: 0.2)
- Horizontal rules animate their width as they scroll into view
- The Atlas figure can have a subtle parallax offset (translateY at 0.1 speed)

**Page transitions:**
- Clip-path wipe: `inset(0 0 100% 0)` → `inset(0 0 0 0)` — a rectangular reveal
- Duration: 400ms
- Background: white (maintaining the white space philosophy even during transitions)

---

## Site Architecture & Pages

### Global Components

**Navigation (top, fixed):**
- Left: Atlas silhouette mark (home link)
- Center or Right: NAV ITEMS — `SERVICES` `PORTFOLIO` `PRICING` `CONTACT`
- All caps, 12–14px, letter-spacing: 0.1em
- Separated by thin vertical lines or generous spacing (not bullets, not slashes)
- On hover: text color → red, with a subtle underline or border-bottom appearing
- Mobile: hamburger icon made of two thin horizontal lines (not three) — opens a full-screen overlay with large navigation text
- A thin 1px horizontal line runs beneath the entire nav bar
- Phone number and/or email visible in nav on desktop: small, right-aligned, caption style

**Footer:**
- Full-width thick top border (6–8px black line)
- Three columns: Company info + Atlas figure | Quick links | Contact info (phone, email, address)
- Bottom bar: thin 1px line, then copyright text in caption style
- "Back to top" as a small circle with an up arrow, positioned right

### Page 1: HOME

**Section 1 — Hero**
- Full viewport height (100vh)
- Large display headline: provocative, bold statement about what ATLAS does
  - Example copy direction: `YOUR WEBSITE IS COSTING YOU MONEY.` or `WE BUILD WHAT OTHERS CAN'T.` or `ATLAS CARRIES THE WEIGHT.`
- Subtitle: one line of body text explaining the value prop
- CTA button: sharp rectangle, black fill, white text → on hover: red fill, white text
- The Atlas figure integrated on one side of the hero — large, partially cropped, holding the sphere which frames or overlaps with the headline
- Thin horizontal lines above and below the hero text block
- Section number marker in top corner: `01` in caption style

**Section 2 — Services Overview**
- Section marker: `02 — SERVICES`
- Brief intro paragraph (2–3 lines max)
- 2–3 service cards in a grid:
  - Card 1: WEB DESIGN — sharp rectangle border, icon (geometric), short description (2 lines)
  - Card 2: SEO — same card format
  - Card 3: WEB + SEO BUNDLE — same format, slightly emphasized border (thicker)
- Cards on hover: border → red, subtle translateY(-4px)
- CTA: `VIEW ALL SERVICES →` link, text style with arrow
- Separated by thin horizontal lines above and below

**Section 3 — Portfolio Preview**
- Section marker: `03 — SELECTED WORK`
- 2–3 portfolio items displayed as large rectangular blocks
- Each item: full-width or half-width image/placeholder + project name + client industry
- On hover: a thin red border appears around the project, project name shifts slightly
- CTA: `VIEW ALL PROJECTS →`
- Atlas figure partially visible at the bottom edge of this section (compositional element)

**Section 4 — Why ATLAS**
- Section marker: `04 — WHY US`
- 3–4 key differentiators in a tight grid or stacked layout
- Each differentiator: a large number (`01`, `02`, `03`) + short bold headline + one line of description
- Numbers styled large (48–64px) in light gray or thin stroke
- This section demonstrates "intricate in small areas" — tight spacing, dense information, precise alignment

**Section 5 — CTA / Contact Teaser**
- Full-width section with a thick top and bottom border
- Large headline: `READY TO LAUNCH?` or similar
- Subtext + two CTAs: `BOOK A CALL` (primary button) and `SEND A MESSAGE` (text link)
- Generous white space above and below (160px+)

### Page 2: SERVICES

- Hero: Section title `SERVICES` in display type, with a thin horizontal line below
- Detailed breakdown of each service offering:

**Web Design service block:**
- What's included (design, development, revisions, responsive, etc.)
- Process steps: `DISCOVER → DESIGN → DEVELOP → DEPLOY` — shown as a horizontal flow with thin connecting lines and circle markers at each step
- Timeline and deliverables

**SEO service block:**
- What's included (audit, keyword research, on-page, technical, reporting)
- Similar process visualization
- Timeline and deliverables

**Bundle block:**
- Combined offering with pricing
- "Most popular" or "Recommended" marker (a small filled red circle — the ONE place red appears at rest, as a badge)

**Pricing table:**
- 2–3 columns (tiers), sharp rectangle borders
- Header row with tier name + price
- Feature list with small circle markers (filled = included, outlined = not)
- CTA button at the bottom of each column
- Recommended tier has a thicker border (4px vs 2px)
- On hover: entire column border → red

### Page 3: PORTFOLIO

- Grid of 4–6 placeholder project cards
- Each card: rectangular image placeholder (16:9 or 4:3), project title below, industry tag
- Filter bar at top: `ALL` | `WEB DESIGN` | `SEO` | `BUNDLES` — text links, active state underlined in red
- On hover: image placeholder gets a red border overlay, title text → red
- Clicking opens a brief case study view (can be a modal or expanded section):
  - Client name, industry, challenge, solution, results
  - Before/after or key metrics
  - 2–3 mockup images

**Placeholder projects to include:**
1. "Meridian Coffee Co." — Local café, web design + SEO, 340% organic traffic increase
2. "Apex Fitness Supply" — E-commerce, full redesign + SEO, 2.1x conversion rate
3. "Hartwell & Associates" — Law firm, web design, modern rebrand
4. "Bloom Botanicals" — E-commerce, SEO-focused, ranked #1 for 12 target keywords
5. "CrossPoint Construction" — Local contractor, web design + SEO bundle
6. "Verity Skincare" — DTC e-commerce, full redesign, 67% bounce rate reduction

### Page 4: CONTACT

- Split layout: left side = contact form, right side = contact info + booking
- Contact form fields:
  - Name (text input)
  - Email (email input)
  - Company/Website (text input)
  - Service interested in (dropdown: Web Design / SEO / Bundle / Not sure)
  - Message (textarea)
  - Submit button: sharp rectangle, black → red on hover
- All form inputs: bottom-border only (no full rectangle), monospaced text, 1px border that thickens to 2px on focus and turns red
- Right side:
  - Phone number (clickable)
  - Email address (clickable)
  - Office hours
  - Cal.com or Calendly embed for booking
  - Small map or address (optional)

---

## Content & Copy Direction

### Voice & Tone

- **Bold and provocative.** Not aggressive, but unapologetically direct.
- **Confident.** Speak as if results are inevitable, not aspirational.
- **Technical precision.** Use specific numbers and metrics, never vague promises.
- **Short sentences.** Punchy. Declarative. No fluff.

### Copy Examples (direction, not final)

```
Hero headline options:
  "YOUR WEBSITE IS LEAVING MONEY ON THE TABLE."
  "WE DON'T BUILD WEBSITES. WE BUILD REVENUE."
  "ATLAS CARRIES THE WEIGHT. YOU REAP THE RESULTS."

Services intro:
  "Two things separate businesses that grow from businesses that don't: 
   a website that converts and search rankings that compound. 
   We deliver both."

CTA:
  "BOOK YOUR FREE STRATEGY CALL"
  "LET'S BUILD SOMETHING THAT WORKS"

Portfolio intro:
  "RESULTS SPEAK. METRICS DON'T LIE."
```

---

## SEO Implementation

Since this is an SEO agency, the site itself must be a flawless example of technical SEO.

- **Metadata:** Unique title + description for every page using Next.js `generateMetadata`
- **Open Graph & Twitter cards:** For every page, with proper og:image
- **Structured data (JSON-LD):** Organization, LocalBusiness, Service, WebSite schemas
- **Semantic HTML:** Proper heading hierarchy (single H1 per page), landmark elements, aria labels
- **Performance:** Target 95+ Lighthouse score across all categories
- **Sitemap:** Auto-generated `sitemap.xml`
- **Robots.txt:** Properly configured
- **Image optimization:** Next.js `<Image>` component, WebP/AVIF, lazy loading
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Internal linking:** Every page links to every other page naturally
- **URL structure:** Clean, descriptive slugs (`/services`, `/portfolio`, `/contact`)

---

## File Structure

```
atlas-website/
├── public/
│   ├── fonts/
│   │   ├── IBMPlexMono-Regular.woff2
│   │   ├── IBMPlexMono-Medium.woff2
│   │   ├── IBMPlexMono-SemiBold.woff2
│   │   └── IBMPlexMono-Bold.woff2
│   ├── images/
│   │   ├── atlas-figure-full.svg
│   │   ├── atlas-mark.svg          (small silhouette for nav)
│   │   ├── atlas-sphere.svg        (circle element)
│   │   └── portfolio/              (placeholder images)
│   ├── favicon.ico
│   ├── og-image.png
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx              (root layout, fonts, global styles)
│   │   ├── page.tsx                (home page)
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        (form submission handler)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SectionMarker.tsx   (the "01 — SERVICES" style markers)
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── HorizontalRule.tsx  (configurable thin/thick lines)
│   │   │   ├── Circle.tsx          (reusable circle element)
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx           (bottom-border-only form inputs)
│   │   │   └── SectionReveal.tsx   (scroll-triggered Framer Motion wrapper)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── PortfolioPreview.tsx
│   │   │   ├── WhyAtlas.tsx
│   │   │   └── CTASection.tsx
│   │   ├── services/
│   │   │   ├── ServiceBlock.tsx
│   │   │   ├── ProcessFlow.tsx     (the DISCOVER → DESIGN → DEVELOP → DEPLOY flow)
│   │   │   └── PricingTable.tsx
│   │   ├── portfolio/
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── CaseStudyModal.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── BookingEmbed.tsx
│   │   └── atlas/
│   │       ├── AtlasFigure.tsx     (the SVG Atlas illustration component)
│   │       ├── AtlasMark.tsx       (small nav mark)
│   │       └── AtlasSphere.tsx     (standalone sphere/circle element)
│   ├── lib/
│   │   ├── animations.ts          (shared Framer Motion variants)
│   │   ├── constants.ts           (site metadata, service data, portfolio data)
│   │   └── utils.ts
│   └── styles/
│       └── globals.css             (CSS custom properties, base resets, font-face)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Component Implementation Notes

### HorizontalRule Component
```
Props:
  weight: 'hairline' | 'thin' | 'medium' | 'thick' | 'heavy'
  // Maps to: 1px | 2px | 3px | 4px | 6-8px
  animate: boolean (draw-in animation on scroll)
  color: 'black' | 'red' (default: black)
  className: string

This is used EVERYWHERE. It separates every section, appears inside cards,
frames the navigation, and defines the structural rhythm of the entire site.
```

### SectionReveal Component
```
A Framer Motion wrapper that applies the standard entrance animation
(fade up 20px + opacity 0→1) when the section scrolls into viewport.
Uses IntersectionObserver via Framer Motion's whileInView.
All major sections should be wrapped in this.
```

### AtlasFigure Component
```
Props:
  variant: 'full' | 'silhouette' | 'sphere-only' | 'partial-crop'
  size: 'sm' | 'md' | 'lg' | 'xl'
  interactive: boolean (enables hover → red stroke transition)
  className: string

The SVG should be inline (not <img>) so strokes can be styled and animated.
```

---

## Tailwind Configuration

```typescript
// tailwind.config.ts — key customizations

theme: {
  extend: {
    colors: {
      atlas: {
        white: '#FFFFFF',
        black: '#0A0A0A',
        red: '#E50000',
        'red-bright': '#FF0000',
      },
      gray: {
        100: '#F5F5F5',
        300: '#D4D4D4',
        500: '#737373',
        900: '#171717',
      },
    },
    fontFamily: {
      mono: ['IBM Plex Mono', 'Space Mono', 'Courier New', 'monospace'],
    },
    borderWidth: {
      'hairline': '1px',
      'thin': '2px',
      'medium': '3px',
      'thick': '4px',
      'heavy': '6px',
      'ultra': '8px',
    },
    spacing: {
      '18': '4.5rem',   // 72px
      '30': '7.5rem',   // 120px
      '40': '10rem',    // 160px
      '50': '12.5rem',  // 200px
    },
    maxWidth: {
      'site': '1440px',
    },
  },
},
```

---

## Critical Implementation Rules

1. **White space is sacred.** When in doubt, add more space, not less. If a section feels "about right," add 20% more padding.

2. **Red is earned.** It appears ONLY on interaction. If you're about to put red on the page at rest, stop. The only exception is a single "recommended" badge on the pricing table.

3. **Every border has a purpose.** Don't add borders for visual flair. Each line should be separating content, framing a block, or creating grid structure.

4. **Monospace is the voice.** Every single piece of text — headings, body, captions, buttons, inputs — uses the mono stack. No exceptions.

5. **The Atlas figure is a layout participant, not a logo slapped on.** It should interact with the grid, overlap with content intentionally, and change form based on context.

6. **Sharp corners only.** Zero border-radius on all rectangles. The only round elements are intentional circles.

7. **Performance is credibility.** As an SEO agency, a slow site destroys trust. Optimize everything. Lazy load below-fold, preload fonts, minimize JS bundles.

8. **Animations are mechanical, not playful.** Think: a precision instrument clicking into place. Never bouncy, never elastic, never whimsical.

9. **Mobile is not an afterthought.** The grid system collapses gracefully. Shapes simplify. White space reduces proportionally but never disappears. The Atlas figure scales down but remains present.

10. **Copy is short and punchy.** No paragraph should exceed 3 lines on desktop. If it's longer, break it up or cut it down.
