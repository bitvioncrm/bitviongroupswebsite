import { CAPABILITIES, entity, IDS, SITE_URL } from '../../data/entity'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': IDS.organization,
  name: entity.organization.name,
  alternateName: entity.organization.alternateName,
  legalName: entity.organization.legalName,
  url: entity.organization.url,
  logo: {
    '@type': 'ImageObject',
    url: entity.organization.logo,
  },
  image: entity.organization.image,
  email: entity.organization.email,
  description:
    'Bitvion Technologies is a proprietary technology enterprise founded and owned by Akhil Shijo. It builds intelligent software, AI solutions, automation systems and digital products, including YatrikERP.',
  foundingDate: entity.organization.foundingDate,
  founder: { '@id': IDS.person },
  address: entity.organization.locations.map((place) => ({
    '@type': 'PostalAddress',
    addressLocality: place.locality,
    addressRegion: place.region,
    addressCountry: place.country,
  })),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: entity.organization.email,
      telephone: `+91${entity.organization.phone}`,
      contactType: 'customer service',
      url: entity.organization.whatsappUrl,
    },
    {
      '@type': 'ContactPoint',
      email: entity.organization.businessEmail,
      contactType: 'sales',
      url: `${SITE_URL}/contact`,
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Kerala' },
    { '@type': 'City', name: 'Bangalore' },
  ],
  knowsAbout: CAPABILITIES,
  owns: { '@id': IDS.yatrikerp },
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': IDS.person,
  name: entity.person.name,
  jobTitle: entity.person.jobTitle,
  description:
    'Akhil Shijo is the Founder & Proprietor of Bitvion Technologies, a proprietary technology enterprise focused on software engineering, AI, intelligent automation and digital products.',
  url: entity.person.url,
  image: entity.person.image,
  worksFor: { '@id': IDS.organization },
  affiliation: { '@id': IDS.organization },
  knowsAbout: [
    'Software Engineering',
    'Artificial Intelligence',
    'Intelligent Automation',
    'Digital Products',
    'Technology Strategy',
    'Product Development',
  ],
  ...(entity.person.sameAs?.length ? { sameAs: entity.person.sameAs } : {}),
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': IDS.website,
  url: entity.organization.url,
  name: entity.organization.name,
  alternateName: entity.organization.alternateName,
  description:
    'Official website of Bitvion Technologies — a proprietary technology enterprise founded and owned by Akhil Shijo.',
  inLanguage: 'en-IN',
  publisher: { '@id': IDS.organization },
}

export const yatrikSoftwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': IDS.yatrikerp,
  name: entity.product.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: entity.product.description,
  url: entity.product.url,
  creator: { '@id': IDS.organization },
  publisher: { '@id': IDS.organization },
  provider: { '@id': IDS.organization },
  isPartOf: { '@id': IDS.website },
}

export const buildWebPageSchema = ({ name, description, path, type = 'WebPage' }) => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': `${SITE_URL}${path === '/' ? '/' : path}#webpage`,
  url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
  name,
  description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': IDS.website },
  about: { '@id': IDS.organization },
  publisher: { '@id': IDS.organization },
})

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
  })),
})

export const buildServiceSchema = (name, description, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: { '@id': IDS.organization },
  url: `${SITE_URL}${path}`,
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Kerala' },
    { '@type': 'City', name: 'Bangalore' },
  ],
  availableLanguage: 'en-IN',
})

export const buildArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  datePublished: article.date,
  author: { '@id': IDS.organization },
  publisher: { '@id': IDS.organization },
  mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
  url: `${SITE_URL}/insights/${article.slug}`,
})

export const buildFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
})

export const buildItemListSchema = (name, items) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    description: item.description,
    url: item.path ? `${SITE_URL}${item.path}` : undefined,
  })),
})

const StructuredData = ({ data }) => {
  if (!data) return null
  const json = Array.isArray(data) ? data : [data]

  return (
    <>
      {json.map((item, i) => (
        <script
          key={item['@id'] || `${item['@type']}-${i}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

export default StructuredData
