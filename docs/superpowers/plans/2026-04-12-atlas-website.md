# ATLAS Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full ATLAS web design & SEO agency website in Next.js 14 with TypeScript, Tailwind CSS, and Framer Motion.

**Architecture:** Foundation-first — scaffold and configure, then shared design system components, then global layout, then pages in order (Home → Services → Portfolio → Contact), then SEO layer. Each layer builds on the previous.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, Resend

---

## File Map

```
atlas/ (repo root)
├── .env.example
├── .env.local                         (gitignored, created manually)
├── next.config.mjs
├── tailwind.config.ts
├── jest.config.ts
├── jest.setup.ts
├── public/
│   ├── favicon.ico
│   ├── og-image.png                   (placeholder — 1200x630 black rect)
│   └── robots.txt                     (via app/robots.ts)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   ├── services/page.tsx
    │   ├── portfolio/page.tsx
    │   ├── contact/page.tsx
    │   └── api/contact/route.ts
    ├── components/
    │   ├── atlas/
    │   │   ├── AtlasMark.tsx
    │   │   ├── AtlasFigure.tsx
    │   │   └── AtlasSphere.tsx
    │   ├── ui/
    │   │   ├── HorizontalRule.tsx
    │   │   ├── SectionReveal.tsx
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Circle.tsx
    │   │   ├── Input.tsx
    │   │   └── SectionMarker.tsx
    │   ├── layout/
    │   │   ├── Navigation.tsx
    │   │   └── Footer.tsx
    │   ├── home/
    │   │   ├── HeroSection.tsx
    │   │   ├── ServicesOverview.tsx
    │   │   ├── PortfolioPreview.tsx
    │   │   ├── WhyAtlas.tsx
    │   │   └── CTASection.tsx
    │   ├── services/
    │   │   ├── ServiceBlock.tsx
    │   │   ├── ProcessFlow.tsx
    │   │   └── PricingTable.tsx
    │   ├── portfolio/
    │   │   ├── FilterBar.tsx
    │   │   ├── ProjectCard.tsx
    │   │   ├── CaseStudyModal.tsx
    │   │   └── ProjectGrid.tsx
    │   └── contact/
    │       ├── ContactForm.tsx
    │       └── ContactInfo.tsx
    └── lib/
        ├── animations.ts
        ├── constants.ts
        ├── contactSchema.ts
        └── utils.ts
```

---

## Task 1: Scaffold Next.js and install dependencies

**Files:**
- Create: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `package.json` (via scaffold)
- Create: `jest.config.ts`, `jest.setup.ts`

- [ ] **Step 1: Scaffold the app**

```bash
cd "C:/Users/thero/OneDrive/Desktop/atlas"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

When prompted about existing files (CLAUDE.md, docs/), choose to keep them. Answer `No` to any "initialize git" prompt.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion react-hook-form @hookform/resolvers zod resend
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Create jest.config.ts**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create jest.setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Run tests to confirm setup works**

```bash
npx jest --passWithNoTests
```
Expected: `Test Suites: 0 passed`

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 app with jest setup"
```

---

## Task 2: Configure Tailwind and globals.css

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/styles/globals.css` (create if it doesn't exist at this path; Next.js may place it at `src/app/globals.css`)

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        mono: ['var(--font-ibm-plex-mono)', 'Space Mono', 'Courier New', 'monospace'],
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '40': '10rem',
        '50': '12.5rem',
      },
      maxWidth: {
        site: '1440px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --atlas-white: #FFFFFF;
  --atlas-black: #0A0A0A;
  --atlas-red: #E50000;
  --atlas-red-bright: #FF0000;
  --atlas-gray-100: #F5F5F5;
  --atlas-gray-300: #D4D4D4;
  --atlas-gray-500: #737373;
  --atlas-gray-900: #171717;
}

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    border-radius: 0;
  }

  .is-circle {
    border-radius: 50% !important;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--atlas-white);
    color: var(--atlas-black);
    font-family: var(--font-ibm-plex-mono), 'Space Mono', 'Courier New', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
}

@layer utilities {
  .transition-interactive {
    transition: border-color 150ms ease, color 150ms ease, background-color 150ms ease;
  }
}
```

- [ ] **Step 3: Verify build compiles**

```bash
npx next build 2>&1 | tail -5
```
Expected: `✓ Compiled` (warnings OK, errors not OK)

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind design tokens and global CSS reset"
```

---

## Task 3: Shared lib — animations, constants, utils, contact schema

**Files:**
- Create: `src/lib/animations.ts`
- Create: `src/lib/constants.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/contactSchema.ts`
- Create: `src/lib/__tests__/contactSchema.test.ts`

- [ ] **Step 1: Create src/lib/animations.ts**

```typescript
import type { Variants } from 'framer-motion'

export const EASE_ATLAS = [0.16, 1, 0.3, 1] as const

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_ATLAS },
  },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const lineDrawVariants: Variants = {
  hidden: { scaleX: 0, originX: '0%' },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: EASE_ATLAS },
  },
}

export const clipRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.4, ease: EASE_ATLAS },
  },
}

export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_ATLAS },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}
```

- [ ] **Step 2: Create src/lib/constants.ts**

```typescript
export const SITE_NAME = 'ATLAS'
export const SITE_DESCRIPTION =
  'ATLAS is a web design and SEO agency. We build websites that convert and search rankings that compound.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com'

export const NAV_LINKS = [
  { label: 'SERVICES', href: '/services' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'PRICING', href: '/services#pricing' },
  { label: 'CONTACT', href: '/contact' },
] as const

export const PORTFOLIO_PROJECTS = [
  {
    id: 'meridian-coffee',
    name: 'Meridian Coffee Co.',
    industry: 'LOCAL CAFÉ',
    tags: ['WEB DESIGN', 'SEO'],
    result: '340% organic traffic increase',
    challenge:
      'Outdated website with zero local SEO presence. Ranking on page 4 for core search terms.',
    solution:
      'Full redesign with conversion-focused layout, local SEO buildout, and Google Business Profile optimization.',
    metrics: [
      { label: 'Organic Traffic', value: '+340%' },
      { label: 'Local Rankings', value: 'Top 3' },
      { label: 'Online Orders', value: '+180%' },
    ],
  },
  {
    id: 'apex-fitness',
    name: 'Apex Fitness Supply',
    industry: 'E-COMMERCE',
    tags: ['WEB DESIGN', 'SEO'],
    result: '2.1x conversion rate',
    challenge: 'High traffic but poor conversion. Cluttered UI and no SEO strategy.',
    solution:
      'Redesigned product pages, streamlined checkout, and comprehensive on-page SEO across 300+ product listings.',
    metrics: [
      { label: 'Conversion Rate', value: '2.1x' },
      { label: 'Revenue', value: '+95%' },
      { label: 'Bounce Rate', value: '-41%' },
    ],
  },
  {
    id: 'hartwell-associates',
    name: 'Hartwell & Associates',
    industry: 'LAW FIRM',
    tags: ['WEB DESIGN'],
    result: 'Modern rebrand, 60% more contact form submissions',
    challenge: 'Decade-old website eroding client trust before the first consultation.',
    solution:
      'Clean, authoritative redesign communicating expertise and trustworthiness. Mobile-first build.',
    metrics: [
      { label: 'Contact Forms', value: '+60%' },
      { label: 'Time on Site', value: '+2.4min' },
      { label: 'Mobile Traffic', value: '+88%' },
    ],
  },
  {
    id: 'bloom-botanicals',
    name: 'Bloom Botanicals',
    industry: 'E-COMMERCE',
    tags: ['SEO'],
    result: 'Ranked #1 for 12 target keywords',
    challenge: 'Strong products but invisible online. No keyword strategy or technical SEO.',
    solution:
      'Full SEO audit and rebuild — technical fixes, content strategy, backlink campaign.',
    metrics: [
      { label: '#1 Rankings', value: '12 keywords' },
      { label: 'Organic Revenue', value: '+220%' },
      { label: 'Domain Authority', value: '+34pts' },
    ],
  },
  {
    id: 'crosspoint-construction',
    name: 'CrossPoint Construction',
    industry: 'LOCAL CONTRACTOR',
    tags: ['WEB DESIGN', 'SEO'],
    result: 'Dominant local search presence',
    challenge: 'No website. Missing entirely from local search.',
    solution:
      'Ground-up build with local SEO foundation, project portfolio, and lead capture forms.',
    metrics: [
      { label: 'Leads per Month', value: '+14' },
      { label: 'Local Pack', value: 'Top 3' },
      { label: 'Quote Requests', value: '+300%' },
    ],
  },
  {
    id: 'verity-skincare',
    name: 'Verity Skincare',
    industry: 'DTC E-COMMERCE',
    tags: ['WEB DESIGN'],
    result: '67% bounce rate reduction',
    challenge: 'Luxury brand with a discount-looking website. High traffic, poor retention.',
    solution:
      'Premium redesign matching brand positioning. Improved product discovery and storytelling.',
    metrics: [
      { label: 'Bounce Rate', value: '-67%' },
      { label: 'AOV', value: '+$28' },
      { label: 'Return Visitors', value: '+55%' },
    ],
  },
] as const

export type Project = (typeof PORTFOLIO_PROJECTS)[number]

export const SERVICES = [
  {
    id: 'web-design',
    label: 'WEB DESIGN',
    description: 'Precision-built websites that convert visitors into clients.',
    included: [
      'Custom design — no templates',
      'Mobile-first responsive build',
      'Next.js or WordPress delivery',
      '3 revision rounds',
      'Performance optimization',
      'Basic on-page SEO',
    ],
    process: ['DISCOVER', 'DESIGN', 'DEVELOP', 'DEPLOY'],
    timeline: '4–6 weeks',
  },
  {
    id: 'seo',
    label: 'SEO',
    description: 'Search rankings that compound month over month.',
    included: [
      'Full technical SEO audit',
      'Keyword research & mapping',
      'On-page optimization',
      'Technical fixes',
      'Monthly reporting',
      'Backlink strategy',
    ],
    process: ['AUDIT', 'STRATEGY', 'EXECUTE', 'REPORT'],
    timeline: 'Ongoing (3-month minimum)',
  },
  {
    id: 'bundle',
    label: 'WEB + SEO BUNDLE',
    description: 'The complete system. A site built to rank, and the strategy to make it happen.',
    included: [
      'Everything in Web Design',
      'Everything in SEO',
      'Integrated SEO architecture from day one',
      'Priority turnaround',
      'Quarterly strategy calls',
      'Dedicated account manager',
    ],
    process: ['DISCOVER', 'DESIGN', 'DEVELOP', 'DEPLOY'],
    timeline: '4–6 weeks + ongoing',
  },
] as const

export const PRICING_TIERS = [
  {
    id: 'web-design',
    name: 'WEB DESIGN',
    price: '$3,500',
    period: 'one-time',
    recommended: false,
    features: [
      { label: 'Custom design', included: true },
      { label: 'Mobile responsive', included: true },
      { label: 'Up to 8 pages', included: true },
      { label: '3 revision rounds', included: true },
      { label: 'Basic on-page SEO', included: true },
      { label: 'Ongoing SEO', included: false },
      { label: 'Monthly reporting', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    id: 'bundle',
    name: 'WEB + SEO BUNDLE',
    price: '$5,500',
    period: 'setup + $800/mo',
    recommended: true,
    features: [
      { label: 'Custom design', included: true },
      { label: 'Mobile responsive', included: true },
      { label: 'Up to 8 pages', included: true },
      { label: '3 revision rounds', included: true },
      { label: 'Basic on-page SEO', included: true },
      { label: 'Ongoing SEO', included: true },
      { label: 'Monthly reporting', included: true },
      { label: 'Priority support', included: true },
    ],
  },
  {
    id: 'seo',
    name: 'SEO ONLY',
    price: '$800',
    period: 'per month',
    recommended: false,
    features: [
      { label: 'Custom design', included: false },
      { label: 'Mobile responsive', included: false },
      { label: 'Up to 8 pages', included: false },
      { label: '3 revision rounds', included: false },
      { label: 'Basic on-page SEO', included: true },
      { label: 'Ongoing SEO', included: true },
      { label: 'Monthly reporting', included: true },
      { label: 'Priority support', included: false },
    ],
  },
] as const

export const WHY_ATLAS = [
  {
    number: '01',
    headline: 'RESULTS-ONLY FOCUS',
    description: 'We measure success in revenue, leads, and rankings. Not in awards.',
  },
  {
    number: '02',
    headline: 'TECHNICAL PRECISION',
    description: 'Sub-2s load times. 95+ Lighthouse scores. Built to perform, not just look good.',
  },
  {
    number: '03',
    headline: 'SEO FROM DAY ONE',
    description: 'Every site we build is architected to rank. SEO isn\'t bolted on — it\'s baked in.',
  },
  {
    number: '04',
    headline: 'YOU OWN EVERYTHING',
    description: 'Code, content, domain. No lock-in. No hostage-taking. It\'s yours.',
  },
] as const
```

- [ ] **Step 3: Create src/lib/utils.ts**

```typescript
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

- [ ] **Step 4: Create src/lib/contactSchema.ts**

```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.enum(['web-design', 'seo', 'bundle', 'not-sure'], {
    errorMap: () => ({ message: 'Please select a service' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

- [ ] **Step 5: Write failing tests**

Create `src/lib/__tests__/contactSchema.test.ts`:

```typescript
import { contactSchema } from '../contactSchema'

const valid = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  company: 'ACME',
  service: 'web-design' as const,
  message: 'This is a long enough message for the test.',
}

describe('contactSchema', () => {
  it('accepts valid data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts valid data without company', () => {
    const { company, ...noCompany } = valid
    expect(contactSchema.safeParse(noCompany).success).toBe(true)
  })

  it('rejects name shorter than 2 chars', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'J' }).success).toBe(false)
  })

  it('rejects invalid email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects message shorter than 10 chars', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'Short' }).success).toBe(false)
  })

  it('rejects invalid service enum', () => {
    expect(contactSchema.safeParse({ ...valid, service: 'invalid' }).success).toBe(false)
  })

  it('accepts all four service values', () => {
    for (const service of ['web-design', 'seo', 'bundle', 'not-sure'] as const) {
      expect(contactSchema.safeParse({ ...valid, service }).success).toBe(true)
    }
  })
})
```

- [ ] **Step 6: Run tests — expect PASS (schema is already written)**

```bash
npx jest src/lib/__tests__/contactSchema.test.ts --no-coverage
```
Expected: `7 passed`

- [ ] **Step 7: Commit**

```bash
git add src/lib/
git commit -m "feat: add animations, constants, contact schema with tests"
```

---

## Task 4: Atlas SVG components

**Files:**
- Create: `src/components/atlas/AtlasMark.tsx`
- Create: `src/components/atlas/AtlasFigure.tsx`
- Create: `src/components/atlas/AtlasSphere.tsx`

- [ ] **Step 1: Create src/components/atlas/AtlasMark.tsx**

```tsx
interface AtlasMarkProps {
  className?: string
  interactive?: boolean
}

export function AtlasMark({ className = '', interactive = false }: AtlasMarkProps) {
  return (
    <svg
      viewBox="0 0 24 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="ATLAS home"
      className={`${interactive ? 'hover:text-atlas-red transition-interactive' : ''} ${className}`}
    >
      {/* Sphere */}
      <circle cx="12" cy="8" r="6" />
      {/* Head — peeking below sphere */}
      <circle cx="12" cy="18" r="2" />
      {/* Arms reaching up to sphere */}
      <path d="M4 24 L12 16 L20 24" />
      {/* Torso */}
      <line x1="12" y1="20" x2="12" y2="30" />
      {/* Legs */}
      <path d="M12 30 L7 39 M12 30 L17 39" />
    </svg>
  )
}
```

- [ ] **Step 2: Create src/components/atlas/AtlasFigure.tsx**

```tsx
'use client'

type AtlasFigureVariant = 'full' | 'silhouette' | 'sphere-only' | 'partial-crop'
type AtlasFigureSize = 'sm' | 'md' | 'lg' | 'xl'

interface AtlasFigureProps {
  variant?: AtlasFigureVariant
  size?: AtlasFigureSize
  interactive?: boolean
  className?: string
}

const sizeMap: Record<AtlasFigureSize, string> = {
  sm: 'w-24 h-40',
  md: 'w-40 h-64',
  lg: 'w-64 h-[420px]',
  xl: 'w-96 h-[600px]',
}

export function AtlasFigure({
  variant = 'full',
  size = 'lg',
  interactive = false,
  className = '',
}: AtlasFigureProps) {
  const interactiveClass = interactive
    ? 'hover:text-atlas-red transition-interactive cursor-default'
    : ''

  if (variant === 'sphere-only') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`${sizeMap[size]} ${interactiveClass} ${className}`}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="90" />
        <ellipse cx="100" cy="100" rx="90" ry="30" />
        <line x1="10" y1="100" x2="190" y2="100" />
        <line x1="100" y1="10" x2="100" y2="190" />
      </svg>
    )
  }

  if (variant === 'silhouette') {
    return (
      <svg
        viewBox="0 0 80 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${sizeMap[size]} ${interactiveClass} ${className}`}
        aria-hidden="true"
      >
        <circle cx="40" cy="22" r="18" />
        <circle cx="40" cy="56" r="7" />
        <path d="M14 76 C14 76 24 62 40 60 C56 62 66 76 66 76" />
        <line x1="40" y1="63" x2="40" y2="100" />
        <path d="M40 100 L24 130 M40 100 L56 130" />
      </svg>
    )
  }

  // 'full' and 'partial-crop' use the same base SVG
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${sizeMap[size]} ${interactiveClass} ${className}`}
      aria-hidden="true"
      style={variant === 'partial-crop' ? { clipPath: 'inset(40% 0 0 0)' } : undefined}
    >
      {/* Sphere at top */}
      <circle cx="100" cy="48" r="44" />
      {/* Latitude lines on sphere */}
      <ellipse cx="100" cy="48" rx="44" ry="14" />
      <line x1="56" y1="48" x2="144" y2="48" />
      {/* Head */}
      <circle cx="100" cy="112" r="12" />
      {/* Neck */}
      <line x1="100" y1="124" x2="100" y2="136" />
      {/* Left arm reaching up */}
      <path d="M100 150 C90 150 68 140 58 96" />
      {/* Right arm reaching up */}
      <path d="M100 150 C110 150 132 140 142 96" />
      {/* Torso */}
      <path d="M88 136 C86 160 85 185 84 210 M112 136 C114 160 115 185 116 210" />
      {/* Waist */}
      <path d="M84 210 C90 215 110 215 116 210" />
      {/* Left leg */}
      <path d="M88 212 C82 240 76 265 70 295" />
      {/* Right leg */}
      <path d="M112 212 C118 240 124 265 130 295" />
      {/* Feet */}
      <path d="M70 295 L58 300 M130 295 L142 300" />
    </svg>
  )
}
```

- [ ] **Step 3: Create src/components/atlas/AtlasSphere.tsx**

```tsx
interface AtlasSphereProps {
  size?: number
  strokeWidth?: number
  className?: string
  interactive?: boolean
}

export function AtlasSphere({
  size = 200,
  strokeWidth = 2,
  className = '',
  interactive = false,
}: AtlasSphereProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      width={size}
      height={size}
      className={`${interactive ? 'hover:text-atlas-red transition-interactive' : ''} ${className}`}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="90" />
      <ellipse cx="100" cy="100" rx="90" ry="28" />
      <line x1="10" y1="100" x2="190" y2="100" />
      <line x1="100" y1="10" x2="100" y2="190" />
    </svg>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/atlas/
git commit -m "feat: add Atlas SVG components (mark, figure, sphere)"
```

---

## Task 5: HorizontalRule and SectionReveal components

**Files:**
- Create: `src/components/ui/HorizontalRule.tsx`
- Create: `src/components/ui/SectionReveal.tsx`
- Create: `src/components/ui/__tests__/HorizontalRule.test.tsx`
- Create: `src/components/ui/__tests__/SectionReveal.test.tsx`

- [ ] **Step 1: Write failing tests for HorizontalRule**

Create `src/components/ui/__tests__/HorizontalRule.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { HorizontalRule } from '../HorizontalRule'

describe('HorizontalRule', () => {
  it('renders without crashing', () => {
    const { container } = render(<HorizontalRule />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies black color by default', () => {
    const { container } = render(<HorizontalRule />)
    expect(container.firstChild).toHaveClass('bg-atlas-black')
  })

  it('applies red color when specified', () => {
    const { container } = render(<HorizontalRule color="red" />)
    expect(container.firstChild).toHaveClass('bg-atlas-red')
  })

  it('accepts custom className', () => {
    const { container } = render(<HorizontalRule className="my-4" />)
    expect(container.firstChild).toHaveClass('my-4')
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest src/components/ui/__tests__/HorizontalRule.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../HorizontalRule'`

- [ ] **Step 3: Create src/components/ui/HorizontalRule.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { lineDrawVariants } from '@/lib/animations'

type HRWeight = 'hairline' | 'thin' | 'medium' | 'thick' | 'heavy'

const heightMap: Record<HRWeight, string> = {
  hairline: 'h-[1px]',
  thin: 'h-[2px]',
  medium: 'h-[3px]',
  thick: 'h-[4px]',
  heavy: 'h-[6px]',
}

interface HorizontalRuleProps {
  weight?: HRWeight
  animate?: boolean
  color?: 'black' | 'red'
  className?: string
}

export function HorizontalRule({
  weight = 'thin',
  animate = false,
  color = 'black',
  className = '',
}: HorizontalRuleProps) {
  const colorClass = color === 'red' ? 'bg-atlas-red' : 'bg-atlas-black'
  const heightClass = heightMap[weight]
  const baseClass = `w-full ${heightClass} ${colorClass} ${className}`

  if (animate) {
    return (
      <motion.div
        className={baseClass}
        variants={lineDrawVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      />
    )
  }

  return <div className={baseClass} />
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx jest src/components/ui/__tests__/HorizontalRule.test.tsx --no-coverage
```
Expected: `4 passed`

- [ ] **Step 5: Write failing test for SectionReveal**

Create `src/components/ui/__tests__/SectionReveal.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { SectionReveal } from '../SectionReveal'

describe('SectionReveal', () => {
  it('renders children', () => {
    render(
      <SectionReveal>
        <p>Test content</p>
      </SectionReveal>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies className to wrapper', () => {
    const { container } = render(
      <SectionReveal className="test-class">
        <span>hi</span>
      </SectionReveal>
    )
    expect(container.firstChild).toHaveClass('test-class')
  })
})
```

- [ ] **Step 6: Create src/components/ui/SectionReveal.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 7: Run all UI tests — expect PASS**

```bash
npx jest src/components/ui/__tests__/ --no-coverage
```
Expected: `6 passed`

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/HorizontalRule.tsx src/components/ui/SectionReveal.tsx src/components/ui/__tests__/
git commit -m "feat: add HorizontalRule and SectionReveal components with tests"
```

---

## Task 6: Button, Card, Circle, Input, SectionMarker components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Circle.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/SectionMarker.tsx`
- Create: `src/components/ui/__tests__/Button.test.tsx`

- [ ] **Step 1: Write failing Button test**

Create `src/components/ui/__tests__/Button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders label text', () => {
    render(<Button>BOOK A CALL</Button>)
    expect(screen.getByText('BOOK A CALL')).toBeInTheDocument()
  })

  it('renders as a link when href provided', () => {
    render(<Button href="/contact">CONTACT</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/contact')
  })

  it('renders as button when no href', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies ghost variant class', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>)
    expect(container.firstChild).toHaveClass('border-atlas-black')
  })
})
```

- [ ] **Step 2: Create src/components/ui/Button.tsx**

```tsx
import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest transition-interactive disabled:opacity-50'
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-atlas-black text-white border-2 border-atlas-black hover:bg-atlas-red hover:border-atlas-red',
    ghost:
      'bg-transparent text-atlas-black border-2 border-atlas-black hover:border-atlas-red hover:text-atlas-red',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Run Button tests — expect PASS**

```bash
npx jest src/components/ui/__tests__/Button.test.tsx --no-coverage
```
Expected: `4 passed`

- [ ] **Step 4: Create src/components/ui/Card.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}

export function Card({ children, className = '', onClick, interactive = false }: CardProps) {
  if (interactive) {
    return (
      <motion.div
        className={`border-2 border-atlas-black p-8 cursor-pointer ${className}`}
        whileHover={{ borderColor: '#E50000', y: -4 }}
        transition={{ duration: 0.15 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <div className={`border-2 border-atlas-black p-8 ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Create src/components/ui/Circle.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'

type CircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type CircleVariant = 'filled' | 'outlined'

const sizeMap: Record<CircleSize, string> = {
  xs: 'w-2 h-2',
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-24 h-24',
  xl: 'w-48 h-48',
}

interface CircleProps {
  size?: CircleSize
  variant?: CircleVariant
  interactive?: boolean
  className?: string
  color?: 'black' | 'red'
}

export function Circle({
  size = 'sm',
  variant = 'filled',
  interactive = false,
  className = '',
  color = 'black',
}: CircleProps) {
  const colorClass =
    variant === 'filled'
      ? color === 'red'
        ? 'bg-atlas-red'
        : 'bg-atlas-black'
      : color === 'red'
        ? 'border-atlas-red'
        : 'border-atlas-black'
  const borderClass = variant === 'outlined' ? 'border-2' : ''
  const base = `is-circle ${sizeMap[size]} ${colorClass} ${borderClass} ${className}`

  if (interactive) {
    return (
      <motion.div
        className={base}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15 }}
      />
    )
  }
  return <div className={base} />
}
```

- [ ] **Step 6: Create src/components/ui/Input.tsx**

```tsx
'use client'

import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            w-full bg-transparent border-b border-atlas-black
            py-3 font-mono text-base text-atlas-black
            placeholder:text-gray-300
            focus:outline-none focus:border-b-2 focus:border-atlas-red
            transition-interactive
            ${error ? 'border-atlas-red' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs font-mono text-atlas-red uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">
          {label}
        </label>
        <textarea
          ref={ref}
          rows={5}
          className={`
            w-full bg-transparent border-b border-atlas-black
            py-3 font-mono text-base text-atlas-black resize-none
            placeholder:text-gray-300
            focus:outline-none focus:border-b-2 focus:border-atlas-red
            transition-interactive
            ${error ? 'border-atlas-red' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs font-mono text-atlas-red uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">
          {label}
        </label>
        <select
          ref={ref}
          className={`
            w-full bg-transparent border-b border-atlas-black
            py-3 font-mono text-base text-atlas-black
            focus:outline-none focus:border-b-2 focus:border-atlas-red
            transition-interactive appearance-none
            ${error ? 'border-atlas-red' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">Select a service</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs font-mono text-atlas-red uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
```

- [ ] **Step 7: Create src/components/ui/SectionMarker.tsx**

```tsx
interface SectionMarkerProps {
  number: string
  label: string
  className?: string
}

export function SectionMarker({ number, label, className = '' }: SectionMarkerProps) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 ${className}`}
    >
      <span>{number}</span>
      <span className="w-6 h-[1px] bg-gray-500" />
      <span>{label}</span>
    </div>
  )
}
```

- [ ] **Step 8: Run all tests to confirm no regressions**

```bash
npx jest --no-coverage
```
Expected: all tests pass

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add Button, Card, Circle, Input, SectionMarker components"
```

---

## Task 7: Navigation component

**Files:**
- Create: `src/components/layout/Navigation.tsx`

- [ ] **Step 1: Create src/components/layout/Navigation.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AtlasMark } from '@/components/atlas/AtlasMark'
import { NAV_LINKS } from '@/lib/constants'
import { clipRevealVariants } from '@/lib/animations'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 bg-atlas-white
          transition-all duration-150
          ${scrolled ? 'border-b border-atlas-black' : ''}
        `}
      >
        <div className="max-w-site mx-auto px-16 max-lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo mark */}
            <Link href="/" aria-label="ATLAS — Home" className="flex items-center">
              <AtlasMark className="h-9 w-auto text-atlas-black" interactive />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-widest text-atlas-black hover:text-atlas-red transition-interactive relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-atlas-red group-hover:w-full transition-all duration-150" />
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden flex flex-col gap-[7px] p-2"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="block w-7 h-[1.5px] bg-atlas-black transition-interactive" />
              <span className="block w-7 h-[1.5px] bg-atlas-black transition-interactive" />
            </button>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="h-[1px] bg-atlas-black" />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-atlas-white flex flex-col justify-center px-8"
            variants={clipRevealVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <nav className="flex flex-col gap-12" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-mono font-bold uppercase tracking-tight text-atlas-black hover:text-atlas-red transition-interactive"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navigation.tsx
git commit -m "feat: add Navigation component with mobile overlay"
```

---

## Task 8: Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create src/components/layout/Footer.tsx**

```tsx
import Link from 'next/link'
import { AtlasFigure } from '@/components/atlas/AtlasFigure'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <HorizontalRule weight="heavy" />
      <div className="max-w-site mx-auto px-16 max-lg:px-6 py-20">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: Brand + Atlas figure */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <div>
              <p className="text-2xl font-mono font-bold uppercase tracking-tight">ATLAS</p>
              <p className="mt-3 text-sm font-mono text-gray-500 leading-relaxed max-w-xs">
                We carry the weight of your digital presence so you can focus on your business.
              </p>
            </div>
            <div className="flex justify-start">
              <AtlasFigure variant="silhouette" size="sm" className="text-atlas-black opacity-20" />
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="col-span-6 lg:col-span-4">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
              Navigation
            </p>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-mono uppercase tracking-wider hover:text-atlas-red transition-interactive"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="col-span-6 lg:col-span-4">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+15551234567"
                className="text-sm font-mono hover:text-atlas-red transition-interactive"
              >
                +1 (555) 123-4567
              </a>
              <a
                href="mailto:hello@atlasagency.com"
                className="text-sm font-mono hover:text-atlas-red transition-interactive"
              >
                hello@atlasagency.com
              </a>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                Mon – Fri, 9AM – 6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <HorizontalRule weight="hairline" />
      <div className="max-w-site mx-auto px-16 max-lg:px-6 py-6 flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
        {/* Back to top */}
        <a
          href="#top"
          aria-label="Back to top"
          className="is-circle w-10 h-10 border border-atlas-black flex items-center justify-center hover:border-atlas-red hover:text-atlas-red transition-interactive"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M8 12 L8 4 M4 7 L8 3 L12 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 9: Root layout and IBM Plex Mono font

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ATLAS — Web Design & SEO Agency',
    template: '%s | ATLAS',
  },
  description:
    'ATLAS builds websites that convert and search rankings that compound. Web design and SEO for businesses that want results.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com'),
  openGraph: {
    type: 'website',
    siteName: 'ATLAS',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top">
      <body className={`${ibmPlexMono.variable} font-mono bg-atlas-white text-atlas-black`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Start dev server and confirm no errors**

```bash
npx next dev &
```
Open `http://localhost:3000` — should show default Next.js page with Navigation and Footer.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure root layout with IBM Plex Mono and global nav/footer"
```

---

## Task 10: Home page — Hero section

**Files:**
- Create: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: Create src/components/home/HeroSection.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { AtlasFigure } from '@/components/atlas/AtlasFigure'
import { Button } from '@/components/ui/Button'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { fadeUpVariants, staggerContainerVariants, EASE_ATLAS } from '@/lib/animations'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <div className="max-w-site mx-auto px-16 max-lg:px-6 w-full">
        <div className="grid grid-cols-12 gap-8 items-center min-h-[calc(100vh-4rem)]">

          {/* Left: Text content */}
          <motion.div
            className="col-span-12 lg:col-span-7 flex flex-col justify-center py-20 lg:py-0"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants}>
              <SectionMarker number="01" label="WEB DESIGN & SEO" className="mb-10" />
            </motion.div>

            <HorizontalRule weight="hairline" className="mb-10" />

            <motion.h1
              className="text-6xl lg:text-8xl font-bold uppercase leading-none tracking-tight text-atlas-black mb-8"
              variants={fadeUpVariants}
            >
              WE DON&apos;T BUILD
              <br />
              WEBSITES.
              <br />
              WE BUILD
              <br />
              REVENUE.
            </motion.h1>

            <HorizontalRule weight="hairline" className="mb-8" />

            <motion.p
              className="text-base lg:text-lg font-mono text-gray-500 leading-relaxed max-w-lg mb-12"
              variants={fadeUpVariants}
            >
              Two things separate businesses that grow from businesses that don&apos;t: a website
              that converts and search rankings that compound. We deliver both.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={fadeUpVariants}>
              <Button href="/contact">BOOK YOUR FREE STRATEGY CALL</Button>
              <Button variant="ghost" href="/services">VIEW SERVICES</Button>
            </motion.div>
          </motion.div>

          {/* Right: Atlas figure */}
          <motion.div
            className="hidden lg:flex col-span-5 items-center justify-center relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_ATLAS, delay: 0.3 }}
          >
            <AtlasFigure
              variant="full"
              size="xl"
              interactive
              className="text-atlas-black opacity-90"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <HorizontalRule weight="thick" className="mt-auto" />
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat: add HeroSection component"
```

---

## Task 11: Home page — ServicesOverview, WhyAtlas, CTASection

**Files:**
- Create: `src/components/home/ServicesOverview.tsx`
- Create: `src/components/home/WhyAtlas.tsx`
- Create: `src/components/home/CTASection.tsx`

- [ ] **Step 1: Create src/components/home/ServicesOverview.tsx**

```tsx
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { SectionReveal } from '@/components/ui/SectionReveal'

const services = [
  {
    label: 'WEB DESIGN',
    description: 'Precision-built sites that convert. No templates. No compromise.',
    href: '/services#web-design',
    borderWeight: 'border-2',
  },
  {
    label: 'SEO',
    description: 'Organic rankings that compound. Traffic you own, not rent.',
    href: '/services#seo',
    borderWeight: 'border-2',
  },
  {
    label: 'WEB + SEO BUNDLE',
    description: 'The complete system. Built to rank from day one.',
    href: '/services#bundle',
    borderWeight: 'border-4',
  },
]

export function ServicesOverview() {
  return (
    <section className="py-40 max-lg:py-20">
      <div className="max-w-site mx-auto px-16 max-lg:px-6">
        <SectionReveal>
          <SectionMarker number="02" label="SERVICES" className="mb-10" />
          <HorizontalRule weight="hairline" animate className="mb-10" />
        </SectionReveal>

        <div className="grid grid-cols-12 gap-8 mb-16">
          <SectionReveal className="col-span-12 lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight">
              WHAT WE
              <br />
              DO BEST
            </h2>
          </SectionReveal>
          <SectionReveal className="col-span-12 lg:col-span-5 lg:col-start-7 flex items-end">
            <p className="text-base font-mono text-gray-500 leading-relaxed">
              Every engagement is built around one question: what will move the needle for your
              business?
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-12">
          {services.map((service, i) => (
            <SectionReveal key={service.label} className="col-span-12 lg:col-span-4" delay={i * 0.1}>
              <Link href={service.href} className="block h-full">
                <Card interactive className="h-full flex flex-col gap-6 min-h-[200px]">
                  <div className="w-6 h-[2px] bg-atlas-black" />
                  <p className="text-lg font-bold uppercase tracking-tight">{service.label}</p>
                  <p className="text-sm font-mono text-gray-500 leading-relaxed mt-auto">
                    {service.description}
                  </p>
                </Card>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <Link
            href="/services"
            className="text-sm font-mono uppercase tracking-widest hover:text-atlas-red transition-interactive inline-flex items-center gap-3"
          >
            VIEW ALL SERVICES
            <span className="text-base">→</span>
          </Link>
        </SectionReveal>

        <HorizontalRule weight="hairline" animate className="mt-16" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create src/components/home/WhyAtlas.tsx**

```tsx
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { WHY_ATLAS } from '@/lib/constants'

export function WhyAtlas() {
  return (
    <section className="py-40 max-lg:py-20">
      <div className="max-w-site mx-auto px-16 max-lg:px-6">
        <SectionReveal>
          <SectionMarker number="04" label="WHY US" className="mb-10" />
          <HorizontalRule weight="hairline" animate className="mb-16" />
        </SectionReveal>

        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {WHY_ATLAS.map((item, i) => (
            <SectionReveal key={item.number} className="col-span-12 sm:col-span-6 lg:col-span-3" delay={i * 0.08}>
              <div className="flex flex-col gap-4">
                <span className="text-7xl font-bold font-mono text-gray-300 leading-none select-none">
                  {item.number}
                </span>
                <HorizontalRule weight="hairline" />
                <p className="text-base font-bold uppercase tracking-tight">{item.headline}</p>
                <p className="text-sm font-mono text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <HorizontalRule weight="hairline" animate className="mt-20" />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create src/components/home/CTASection.tsx**

```tsx
import { Button } from '@/components/ui/Button'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import Link from 'next/link'

export function CTASection() {
  return (
    <section>
      <HorizontalRule weight="heavy" />
      <div className="py-40 max-lg:py-24">
        <div className="max-w-site mx-auto px-16 max-lg:px-6 text-center">
          <SectionReveal>
            <h2 className="text-6xl lg:text-8xl font-bold uppercase tracking-tight leading-none mb-8">
              READY TO
              <br />
              LAUNCH?
            </h2>
            <p className="text-base font-mono text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">
              Let&apos;s talk about what you need and how we can build something that works.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button href="/contact">BOOK A CALL</Button>
              <Link
                href="/contact"
                className="text-sm font-mono uppercase tracking-widest hover:text-atlas-red transition-interactive"
              >
                SEND A MESSAGE →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
      <HorizontalRule weight="heavy" />
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/home/ServicesOverview.tsx src/components/home/WhyAtlas.tsx src/components/home/CTASection.tsx
git commit -m "feat: add ServicesOverview, WhyAtlas, CTASection home components"
```

---

## Task 12: Home page — PortfolioPreview and page assembly

**Files:**
- Create: `src/components/home/PortfolioPreview.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/home/PortfolioPreview.tsx**

```tsx
import Link from 'next/link'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { AtlasFigure } from '@/components/atlas/AtlasFigure'
import { PORTFOLIO_PROJECTS } from '@/lib/constants'

const preview = PORTFOLIO_PROJECTS.slice(0, 3)

export function PortfolioPreview() {
  return (
    <section className="py-40 max-lg:py-20 relative overflow-hidden">
      <div className="max-w-site mx-auto px-16 max-lg:px-6">
        <SectionReveal>
          <SectionMarker number="03" label="SELECTED WORK" className="mb-10" />
          <HorizontalRule weight="hairline" animate className="mb-16" />
        </SectionReveal>

        <div className="grid grid-cols-12 gap-6 mb-12">
          {preview.map((project, i) => (
            <SectionReveal key={project.id} className="col-span-12 lg:col-span-4" delay={i * 0.1}>
              <Link href={`/portfolio#${project.id}`} className="group block">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-gray-100 border-2 border-atlas-black mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-300">
                      {project.industry}
                    </span>
                  </div>
                  {/* Red border overlay on hover */}
                  <div className="absolute inset-0 border-4 border-atlas-red opacity-0 group-hover:opacity-100 transition-interactive" />
                </div>
                <p className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-2">
                  {project.industry}
                </p>
                <p className="text-lg font-bold uppercase tracking-tight group-hover:text-atlas-red transition-interactive">
                  {project.name}
                </p>
                <p className="text-sm font-mono text-gray-500 mt-2">{project.result}</p>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <Link
            href="/portfolio"
            className="text-sm font-mono uppercase tracking-widest hover:text-atlas-red transition-interactive inline-flex items-center gap-3"
          >
            VIEW ALL PROJECTS
            <span className="text-base">→</span>
          </Link>
        </SectionReveal>

        {/* Atlas figure peeking at bottom */}
        <div className="absolute bottom-0 right-16 opacity-[0.06] pointer-events-none hidden lg:block">
          <AtlasFigure variant="partial-crop" size="xl" />
        </div>
      </div>

      <HorizontalRule weight="hairline" animate className="mt-16" />
    </section>
  )
}
```

- [ ] **Step 2: Replace src/app/page.tsx**

```tsx
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { PortfolioPreview } from '@/components/home/PortfolioPreview'
import { WhyAtlas } from '@/components/home/WhyAtlas'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyAtlas />
      <CTASection />
    </>
  )
}
```

- [ ] **Step 3: Verify dev server renders home page without errors**

```bash
npx next build 2>&1 | grep -E "(error|Error|✓)"
```
Expected: `✓ Compiled` — no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/PortfolioPreview.tsx src/app/page.tsx
git commit -m "feat: complete home page with all 5 sections"
```

---

## Task 13: Services page components

**Files:**
- Create: `src/components/services/ProcessFlow.tsx`
- Create: `src/components/services/ServiceBlock.tsx`
- Create: `src/components/services/PricingTable.tsx`
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create src/components/services/ProcessFlow.tsx**

```tsx
import { Circle } from '@/components/ui/Circle'

interface ProcessFlowProps {
  steps: readonly string[]
}

export function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto py-4">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-3 min-w-[100px]">
            <Circle size="sm" variant="outlined" />
            <span className="text-xs font-mono uppercase tracking-widest whitespace-nowrap">
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="h-[1px] w-12 lg:w-20 bg-atlas-black flex-shrink-0 mx-0" />
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/services/ServiceBlock.tsx**

```tsx
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { Circle } from '@/components/ui/Circle'
import { ProcessFlow } from './ProcessFlow'
import { SectionReveal } from '@/components/ui/SectionReveal'

interface ServiceBlockProps {
  id: string
  label: string
  description: string
  included: readonly string[]
  process: readonly string[]
  timeline: string
}

export function ServiceBlock({
  id,
  label,
  description,
  included,
  process,
  timeline,
}: ServiceBlockProps) {
  return (
    <section id={id} className="py-24">
      <SectionReveal>
        <h2 className="text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">{label}</h2>
        <p className="text-base font-mono text-gray-500 leading-relaxed max-w-2xl mb-12">
          {description}
        </p>
        <HorizontalRule weight="hairline" className="mb-12" />
      </SectionReveal>

      <div className="grid grid-cols-12 gap-16 mb-16">
        <SectionReveal className="col-span-12 lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-4">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <Circle size="xs" variant="filled" />
                <span className="text-sm font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">
            The process
          </p>
          <ProcessFlow steps={process} />
          <div className="mt-10 pt-8 border-t border-gray-300">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
              Timeline
            </p>
            <p className="text-sm font-mono">{timeline}</p>
          </div>
        </SectionReveal>
      </div>

      <HorizontalRule weight="hairline" />
    </section>
  )
}
```

- [ ] **Step 3: Create src/components/services/PricingTable.tsx**

```tsx
import { Button } from '@/components/ui/Button'
import { Circle } from '@/components/ui/Circle'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { PRICING_TIERS } from '@/lib/constants'

export function PricingTable() {
  return (
    <section id="pricing" className="py-24">
      <SectionReveal>
        <h2 className="text-4xl font-bold uppercase tracking-tight mb-16">PRICING</h2>
      </SectionReveal>

      <div className="grid grid-cols-12 gap-6">
        {PRICING_TIERS.map((tier, i) => (
          <SectionReveal key={tier.id} className="col-span-12 lg:col-span-4" delay={i * 0.1}>
            <div
              className={`
                relative flex flex-col h-full p-8
                border transition-interactive hover:border-atlas-red
                ${tier.recommended ? 'border-4 border-atlas-black' : 'border-2 border-atlas-black'}
              `}
            >
              {/* Recommended badge — the ONE resting red element */}
              {tier.recommended && (
                <div className="absolute -top-3 left-8 flex items-center gap-2 bg-atlas-white px-3">
                  <Circle size="xs" variant="filled" color="red" />
                  <span className="text-xs font-mono uppercase tracking-widest text-atlas-red">
                    Recommended
                  </span>
                </div>
              )}

              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                {tier.name}
              </p>
              <div className="mb-8">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm font-mono text-gray-500 ml-2">{tier.period}</span>
              </div>

              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-4">
                    <Circle
                      size="xs"
                      variant={feature.included ? 'filled' : 'outlined'}
                      className="flex-shrink-0"
                    />
                    <span
                      className={`text-sm font-mono ${feature.included ? '' : 'text-gray-300'}`}
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Button href="/contact" className="w-full justify-center">
                GET STARTED
              </Button>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create src/app/services/page.tsx**

```tsx
import type { Metadata } from 'next'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ServiceBlock } from '@/components/services/ServiceBlock'
import { PricingTable } from '@/components/services/PricingTable'
import { CTASection } from '@/components/home/CTASection'
import { SERVICES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web design and SEO services built for results. Custom websites, organic search rankings, and bundle packages.',
}

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="max-w-site mx-auto px-16 max-lg:px-6 py-24">
        <SectionReveal>
          <h1 className="text-7xl lg:text-9xl font-bold uppercase tracking-tight leading-none">
            SERVICES
          </h1>
        </SectionReveal>
        <HorizontalRule weight="thick" animate className="mt-8" />
      </div>

      {/* Service blocks */}
      <div className="max-w-site mx-auto px-16 max-lg:px-6">
        {SERVICES.map((service) => (
          <ServiceBlock key={service.id} {...service} />
        ))}
        <PricingTable />
      </div>

      <CTASection />
    </div>
  )
}
```

- [ ] **Step 5: Confirm build**

```bash
npx next build 2>&1 | grep -E "(error|Error|✓)"
```
Expected: `✓ Compiled`

- [ ] **Step 6: Commit**

```bash
git add src/components/services/ src/app/services/page.tsx
git commit -m "feat: add Services page with ServiceBlock, ProcessFlow, PricingTable"
```

---

## Task 14: Portfolio page

**Files:**
- Create: `src/components/portfolio/FilterBar.tsx`
- Create: `src/components/portfolio/ProjectCard.tsx`
- Create: `src/components/portfolio/CaseStudyModal.tsx`
- Create: `src/components/portfolio/ProjectGrid.tsx`
- Create: `src/app/portfolio/page.tsx`

- [ ] **Step 1: Create src/components/portfolio/FilterBar.tsx**

```tsx
'use client'

type FilterTag = 'ALL' | 'WEB DESIGN' | 'SEO' | 'BUNDLES'

interface FilterBarProps {
  active: FilterTag
  onChange: (tag: FilterTag) => void
}

const filters: FilterTag[] = ['ALL', 'WEB DESIGN', 'SEO', 'BUNDLES']

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-8 mb-16">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`
            text-sm font-mono uppercase tracking-widest transition-interactive
            ${
              active === filter
                ? 'text-atlas-black border-b-2 border-atlas-black'
                : 'text-gray-500 hover:text-atlas-red border-b-2 border-transparent'
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/portfolio/ProjectCard.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/lib/constants'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.article
      className="group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15 }}
      onClick={() => onClick(project)}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-gray-100 border-2 border-atlas-black mb-5 overflow-hidden">
        <div className="absolute inset-0 flex items-end p-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-300">
            {project.industry}
          </span>
        </div>
        {/* Red border hover */}
        <div className="absolute inset-0 border-4 border-atlas-red opacity-0 group-hover:opacity-100 transition-interactive" />
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
            {project.tags.join(' · ')}
          </p>
          <h2 className="text-lg font-bold uppercase tracking-tight group-hover:text-atlas-red transition-interactive">
            {project.name}
          </h2>
          <p className="text-sm font-mono text-gray-500 mt-2">{project.result}</p>
        </div>
        <span className="text-xl group-hover:text-atlas-red transition-interactive mt-1 flex-shrink-0">
          →
        </span>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 3: Create src/components/portfolio/CaseStudyModal.tsx**

```tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { modalVariants, EASE_ATLAS } from '@/lib/animations'
import type { Project } from '@/lib/constants'

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-atlas-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-atlas-white overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-12 max-lg:p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="mb-12 text-xs font-mono uppercase tracking-widest hover:text-atlas-red transition-interactive flex items-center gap-3"
                aria-label="Close case study"
              >
                ← CLOSE
              </button>

              {/* Header */}
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                {project.industry}
              </p>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-3">{project.name}</h2>
              <p className="text-base font-mono text-atlas-red font-semibold mb-8">{project.result}</p>

              <HorizontalRule weight="thick" className="mb-12" />

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {project.metrics.map((m) => (
                  <div key={m.label} className="border border-atlas-black p-5">
                    <p className="text-2xl font-bold mb-2">{m.value}</p>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <HorizontalRule weight="hairline" className="mb-10" />

              {/* Challenge */}
              <div className="mb-10">
                <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                  The Challenge
                </p>
                <p className="text-base font-mono leading-relaxed">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-10">
                <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                  The Solution
                </p>
                <p className="text-base font-mono leading-relaxed">{project.solution}</p>
              </div>

              {/* Image placeholders */}
              <HorizontalRule weight="hairline" className="mb-10" />
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
                Project Visuals
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="aspect-video bg-gray-100 border border-atlas-black flex items-center justify-center"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-300">
                      Mockup {n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Create src/components/portfolio/ProjectGrid.tsx**

```tsx
'use client'

import { useState } from 'react'
import { FilterBar } from './FilterBar'
import { ProjectCard } from './ProjectCard'
import { CaseStudyModal } from './CaseStudyModal'
import { PORTFOLIO_PROJECTS } from '@/lib/constants'
import type { Project } from '@/lib/constants'

type FilterTag = 'ALL' | 'WEB DESIGN' | 'SEO' | 'BUNDLES'

const tagMap: Record<FilterTag, string | null> = {
  ALL: null,
  'WEB DESIGN': 'WEB DESIGN',
  SEO: 'SEO',
  BUNDLES: 'WEB DESIGN',  // bundle projects include both tags
}

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('ALL')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered =
    activeFilter === 'ALL'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) =>
          activeFilter === 'BUNDLES'
            ? p.tags.includes('WEB DESIGN') && p.tags.includes('SEO')
            : p.tags.includes(activeFilter as 'WEB DESIGN' | 'SEO')
        )

  return (
    <>
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      <div className="grid grid-cols-12 gap-x-8 gap-y-16">
        {filtered.map((project, i) => (
          <div key={project.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ProjectCard project={project} onClick={setSelectedProject} />
          </div>
        ))}
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
```

- [ ] **Step 5: Create src/app/portfolio/page.tsx**

```tsx
import type { Metadata } from 'next'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { CTASection } from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Real results from real clients. Web design and SEO projects with measurable outcomes.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-16">
      <div className="max-w-site mx-auto px-16 max-lg:px-6 py-24">
        <SectionReveal>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
            RESULTS SPEAK. METRICS DON&apos;T LIE.
          </p>
          <h1 className="text-7xl lg:text-9xl font-bold uppercase tracking-tight leading-none">
            PORTFOLIO
          </h1>
        </SectionReveal>
        <HorizontalRule weight="thick" animate className="mt-8 mb-20" />
        <ProjectGrid />
      </div>
      <CTASection />
    </div>
  )
}
```

- [ ] **Step 6: Confirm build**

```bash
npx next build 2>&1 | grep -E "(error|Error|✓)"
```
Expected: `✓ Compiled`

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/ src/app/portfolio/page.tsx
git commit -m "feat: add Portfolio page with filter, project cards, and case study modal"
```

---

## Task 15: Contact page and API route

**Files:**
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/ContactInfo.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`
- Create: `src/app/api/contact/__tests__/route.test.ts`

- [ ] **Step 1: Write failing API route test**

Create `src/app/api/contact/__tests__/route.test.ts`:

```typescript
import { POST } from '../route'
import { NextRequest } from 'next/server'

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
    },
  })),
}))

const makeRequest = (body: unknown) =>
  new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

const validBody = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  company: 'ACME',
  service: 'web-design',
  message: 'This is a test message that is long enough.',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key'
    process.env.CONTACT_EMAIL = 'hello@atlasagency.com'
  })

  it('returns 200 with valid body', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 with invalid body', async () => {
    const res = await POST(makeRequest({ name: 'J', email: 'bad' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
  })

  it('returns 400 for missing required fields', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest src/app/api/contact/__tests__/route.test.ts --no-coverage
```
Expected: FAIL — `Cannot find module '../route'`

- [ ] **Step 3: Create src/app/api/contact/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contactSchema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      )
    }

    const { name, email, company, service, message } = result.data
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'ATLAS Contact Form <noreply@atlasagency.com>',
      to: process.env.CONTACT_EMAIL ?? 'hello@atlasagency.com',
      replyTo: email,
      subject: `New inquiry from ${name} — ${service}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company ?? 'Not provided'}`,
        `Service: ${service}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx jest src/app/api/contact/__tests__/route.test.ts --no-coverage
```
Expected: `3 passed`

- [ ] **Step 5: Create src/components/contact/ContactForm.tsx**

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { contactSchema, type ContactFormData } from '@/lib/contactSchema'

const SERVICE_OPTIONS = [
  { value: 'web-design', label: 'Web Design' },
  { value: 'seo', label: 'SEO' },
  { value: 'bundle', label: 'Web Design + SEO Bundle' },
  { value: 'not-sure', label: "Not sure yet" },
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center min-h-[400px]">
        <div className="w-6 h-[4px] bg-atlas-black mb-8" />
        <p className="text-3xl font-bold uppercase tracking-tight mb-4">MESSAGE RECEIVED.</p>
        <p className="text-base font-mono text-gray-500">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      <Input
        label="Name"
        placeholder="Your full name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Company / Website"
        placeholder="acme.com"
        {...register('company')}
        error={errors.company?.message}
      />
      <Select
        label="Service"
        options={SERVICE_OPTIONS}
        {...register('service')}
        error={errors.service?.message}
      />
      <Textarea
        label="Message"
        placeholder="Tell us about your project..."
        {...register('message')}
        error={errors.message?.message}
      />

      {status === 'error' && (
        <p className="text-xs font-mono text-atlas-red uppercase tracking-wider">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
      </Button>
    </form>
  )
}
```

- [ ] **Step 6: Create src/components/contact/ContactInfo.tsx**

```tsx
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { Button } from '@/components/ui/Button'

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
          Get in touch
        </p>
        <div className="flex flex-col gap-5">
          <a
            href="tel:+15551234567"
            className="text-2xl font-bold hover:text-atlas-red transition-interactive"
          >
            +1 (555) 123-4567
          </a>
          <a
            href="mailto:hello@atlasagency.com"
            className="text-2xl font-bold hover:text-atlas-red transition-interactive"
          >
            hello@atlasagency.com
          </a>
        </div>
      </div>

      <HorizontalRule weight="hairline" />

      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
          Office hours
        </p>
        <p className="text-sm font-mono text-gray-500 leading-relaxed">
          Monday – Friday
          <br />
          9:00 AM – 6:00 PM EST
        </p>
      </div>

      <HorizontalRule weight="hairline" />

      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
          Prefer to book directly?
        </p>
        <p className="text-sm font-mono text-gray-500 leading-relaxed mb-6">
          Skip the back-and-forth. Book a free 30-minute strategy call.
        </p>
        {/* Booking embed placeholder */}
        <div className="border border-gray-300 p-8 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-300">
            BOOKING CALENDAR
          </p>
          <p className="text-xs font-mono text-gray-300 mt-2">Cal.com embed — coming soon</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Create src/app/contact/page.tsx**

```tsx
import type { Metadata } from 'next'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Book a free strategy call or send us a message. Let's talk about what you need.",
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="max-w-site mx-auto px-16 max-lg:px-6 py-24">
        <SectionReveal>
          <h1 className="text-7xl lg:text-9xl font-bold uppercase tracking-tight leading-none">
            CONTACT
          </h1>
        </SectionReveal>
        <HorizontalRule weight="thick" animate className="mt-8 mb-20" />

        <div className="grid grid-cols-12 gap-16 max-lg:gap-20">
          {/* Left: Form */}
          <SectionReveal className="col-span-12 lg:col-span-6">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-10">
              Send a message
            </p>
            <ContactForm />
          </SectionReveal>

          {/* Divider */}
          <div className="hidden lg:block col-span-1">
            <div className="h-full w-[1px] bg-gray-300 mx-auto" />
          </div>

          {/* Right: Info */}
          <SectionReveal className="col-span-12 lg:col-span-5" delay={0.1}>
            <ContactInfo />
          </SectionReveal>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Run all tests**

```bash
npx jest --no-coverage
```
Expected: all pass

- [ ] **Step 9: Confirm full build**

```bash
npx next build 2>&1 | grep -E "(error|Error|✓)"
```
Expected: `✓ Compiled`

- [ ] **Step 10: Commit**

```bash
git add src/components/contact/ src/app/contact/ src/app/api/contact/
git commit -m "feat: add Contact page, form, and Resend API route with tests"
```

---

## Task 16: SEO — metadata, sitemap, robots, JSON-LD

**Files:**
- Modify: `src/app/page.tsx` (add generateMetadata / export metadata)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` (JSON-LD Organization schema)
- Modify: `src/app/services/page.tsx` (JSON-LD Service schema)
- Modify: `src/app/contact/page.tsx` (JSON-LD LocalBusiness schema)

- [ ] **Step 1: Add JSON-LD Organization schema to layout.tsx**

In `src/app/layout.tsx`, add this script inside `<body>` before `<Navigation />`:

```tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ATLAS',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com'}/og-image.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    email: 'hello@atlasagency.com',
  },
  sameAs: [],
}
```

Add inside `<body>` tag:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

- [ ] **Step 2: Add WebSite schema to src/app/page.tsx**

Add to `src/app/page.tsx` (this is a Server Component, no 'use client'):

```tsx
import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ATLAS — Web Design & SEO Agency That Builds Revenue',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ATLAS',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyAtlas />
      <CTASection />
    </>
  )
}
```

Also add the necessary imports at top of `src/app/page.tsx`:
```tsx
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { PortfolioPreview } from '@/components/home/PortfolioPreview'
import { WhyAtlas } from '@/components/home/WhyAtlas'
import { CTASection } from '@/components/home/CTASection'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
```

- [ ] **Step 3: Add LocalBusiness schema to contact page**

In `src/app/contact/page.tsx`, add inside the exported default function before the JSX return:

```tsx
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ATLAS',
  description: 'Web design and SEO agency.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com',
  telephone: '+1-555-123-4567',
  email: 'hello@atlasagency.com',
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$$',
}
```

Add to JSX return:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

- [ ] **Step 4: Create src/app/sitemap.ts**

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ]
}
```

- [ ] **Step 5: Create src/app/robots.ts**

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Step 6: Confirm build**

```bash
npx next build 2>&1 | grep -E "(error|Error|✓)"
```
Expected: `✓ Compiled`

- [ ] **Step 7: Commit**

```bash
git add src/app/
git commit -m "feat: add SEO metadata, sitemap, robots.txt, and JSON-LD schemas"
```

---

## Task 17: Environment setup and final wiring

**Files:**
- Create: `.env.example`
- Create: `.env.local` (local only, gitignored)
- Modify: `.gitignore`

- [ ] **Step 1: Create .env.example**

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=hello@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

- [ ] **Step 2: Confirm .env.local is in .gitignore**

Check that `src/app/.gitignore` or root `.gitignore` includes `.env.local`. Next.js scaffold includes this by default. Verify:

```bash
grep -n ".env.local" .gitignore
```
Expected: output like `.env.local`

If missing, add `.env.local` to `.gitignore`.

- [ ] **Step 3: Create .env.local for local development**

```bash
RESEND_API_KEY=re_your_actual_key
CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

(Fill in real values — this file is gitignored.)

- [ ] **Step 4: Run full test suite**

```bash
npx jest --no-coverage
```
Expected: all tests pass.

- [ ] **Step 5: Final production build**

```bash
npx next build
```
Expected: `✓ Compiled` with no errors. Note any warnings about bundle size.

- [ ] **Step 6: Final commit**

```bash
git add .env.example .gitignore
git commit -m "feat: add env.example and finalize environment configuration"
```

- [ ] **Step 7: Push to GitHub**

```bash
export PATH="$PATH:/c/Program Files/GitHub CLI"
cd "C:/Users/thero/OneDrive/Desktop/atlas"
git push origin master
```
Expected: branch pushed to `https://github.com/Phoenixn82/atlas`

---

## Post-build checklist

- [ ] Open `http://localhost:3000` — confirm home page renders with all 5 sections
- [ ] Check `/services` — confirm service blocks, process flows, and pricing table
- [ ] Check `/portfolio` — confirm 6 cards, filter works, modal opens on click
- [ ] Check `/contact` — confirm form fields, focus states turn red, form submits
- [ ] Resize to mobile (375px) — confirm nav hamburger opens overlay, layout stacks
- [ ] Confirm no red appears at rest except the "Recommended" pricing badge
- [ ] Run `npx next build` — confirm `✓ Compiled` and review Lighthouse in browser DevTools
