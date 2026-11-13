import { writeFileSync } from 'fs'
import { allRoutes } from '../src/data/routes.js'

const BASE = 'https://bitvion.in'
const today = new Date().toISOString().split('T')[0]

const priorityFor = (path) => {
  if (path === '/') return '1.0'
  if (
    path === '/technologies' ||
    path === '/business' ||
    path === '/trading' ||
    path === '/consultancy' ||
    path === '/travels' ||
    path === '/ventures' ||
    path === '/imports-exports' ||
    path === '/bitvion-products' ||
    path === '/company/about' ||
    path === '/company/founder' ||
    path === '/products/yatrikerp'
  ) return '0.9'
  if (path.startsWith('/solutions') || path.startsWith('/products')) return '0.8'
  if (path === '/privacy-policy' || path === '/terms' || path === '/cookie-policy' || path === '/disclaimer') return '0.3'
  return '0.6'
}

const freqFor = (path) => {
  if (path === '/') return 'weekly'
  if (path.startsWith('/insights')) return 'monthly'
  if (path === '/privacy-policy' || path === '/terms' || path === '/cookie-policy' || path === '/disclaimer') return 'yearly'
  return 'monthly'
}

const urls = allRoutes.map((path) => {
  const loc = path === '/' ? `${BASE}/` : `${BASE}${path}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freqFor(path)}</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`
}).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

writeFileSync('public/sitemap.xml', sitemap)
console.log(`Sitemap generated with ${allRoutes.length} URLs`)
