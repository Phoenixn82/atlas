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
    tags: ['WEB DESIGN', 'SEO'] as const,
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
    tags: ['WEB DESIGN', 'SEO'] as const,
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
    tags: ['WEB DESIGN'] as const,
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
    tags: ['SEO'] as const,
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
    tags: ['WEB DESIGN', 'SEO'] as const,
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
    tags: ['WEB DESIGN'] as const,
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
    description: "Every site we build is architected to rank. SEO isn't bolted on — it's baked in.",
  },
  {
    number: '04',
    headline: 'YOU OWN EVERYTHING',
    description: "Code, content, domain. No lock-in. No hostage-taking. It's yours.",
  },
] as const
