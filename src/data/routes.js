export const staticRoutes = [
  '/',
  '/technologies',
  '/business',
  '/trading',
  '/consultancy',
  '/travels',
  '/ventures',
  '/imports-exports',
  '/bitvion-products',
  '/solutions',
  '/products',
  '/products/yatrikerp',
  '/industries',
  '/global',
  '/company',
  '/company/about',
  '/company/founder',
  '/company/technology',
  '/company/careers',
  '/insights',
  '/contact',
  '/pricing',
  '/checkout',
  '/request-demo',
  '/request-proposal',
  '/careers',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/disclaimer',
  '/refund-policy',
  '/shipping-policy',
]

export const solutionSlugs = [
  'artificial-intelligence',
  'software-development',
  'intelligent-automation',
  'cloud-technology',
  'digital-transformation',
  'data-analytics',
  'ui-ux',
]

export const industrySlugs = [
  'transportation',
  'logistics',
  'enterprise',
  'education',
  'healthcare',
  'financial-services',
]

export const globalSlugs = [
  'netherlands',
  'united-kingdom',
  'scotland',
  'europe',
]

export const articleSlugs = [
  'engineering-ai-into-business-workflows',
  'software-architecture-for-growing-teams',
  'from-manual-process-to-automation',
]

export const allRoutes = [
  ...staticRoutes,
  ...solutionSlugs.map((s) => `/solutions/${s}`),
  ...industrySlugs.map((s) => `/industries/${s}`),
  ...globalSlugs.map((s) => `/global/${s}`),
  ...articleSlugs.map((s) => `/insights/${s}`),
]
