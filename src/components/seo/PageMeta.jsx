import { useEffect } from 'react'
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL, entity } from '../../data/entity'

const PageMeta = ({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
  image,
  imageAlt,
  keywords,
  siteName,
}) => {
  const fullTitle = title || HOME_TITLE
  const desc = description || HOME_DESCRIPTION
  const canonical = path === '/' || !path ? `${SITE_URL}/` : `${SITE_URL}${path}`
  const ogImage = image || entity.organization.image
  const ogAlt = imageAlt || `${entity.organization.name} logo`
  const brand = siteName || entity.organization.name

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      const selector = attr === 'http-equiv' ? `meta[http-equiv="${name}"]` : `meta[${attr}="${name}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', desc)
    setMeta('author', 'Akhil Shijo')
    setMeta('keywords', keywords)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:type', type, 'property')
    setMeta('content-language', 'en-IN', 'http-equiv')
    setMeta('geo.region', 'IN')
    setMeta('geo.placename', 'Kerala, Bangalore, India')
    setMeta('og:locale', 'en_IN', 'property')
    setMeta('og:site_name', brand, 'property')
    setMeta('og:image', ogImage, 'property')
    setMeta('og:image:alt', ogAlt, 'property')
    if (String(ogImage).includes('bitvion-groups-seal') || String(ogImage).includes('bitvion-groups-ecosystem')) {
      setMeta('og:image:width', '1536', 'property')
      setMeta('og:image:height', '1536', 'property')
    }
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    setMeta('twitter:image', ogImage)
    setMeta('twitter:image:alt', ogAlt)

    const ensureAlternate = (hreflang) => {
      let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
      if (!el) {
        el = document.createElement('link')
        el.rel = 'alternate'
        el.hreflang = hreflang
        document.head.appendChild(el)
      }
      el.href = canonical
    }
    ensureAlternate('en-IN')
    ensureAlternate('x-default')

    const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
    if (gsc) setMeta('google-site-verification', gsc)

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
  }, [fullTitle, desc, canonical, type, noindex, ogImage, ogAlt, keywords, brand])

  return null
}

export default PageMeta
