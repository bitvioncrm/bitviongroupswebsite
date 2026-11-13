import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const MotionLink = motion.create(Link)
import PageMeta from '../components/seo/PageMeta'
import StructuredData, { buildFAQSchema, buildItemListSchema, buildWebPageSchema } from '../components/seo/StructuredData'
import FaqSection from '../components/seo/FaqSection'
import HeroBackground from '../components/hero/HeroBackground'
import BitvionCore from '../components/hero/BitvionCore'
import { GROUP_DESCRIPTION, GROUP_NAME, GROUP_TAGLINE, GROUP_TITLE, sectors } from '../data/groups'
import { SITE_URL } from '../data/entity'
import './groups.css'

const faqs = [
  {
    question: 'What is Bitvion Groups?',
    answer: 'Bitvion Groups is the house brand that holds Bitvion Technologies and the sister sectors: Business, Trading, Consultancy, Travels, Ventures, Imports & Exports, and Products.',
  },
  {
    question: 'Who leads Bitvion?',
    answer: 'Akhil Shijo is the Founder and Proprietor of Bitvion Technologies and leads Bitvion Groups. The group works from Kerala and Bangalore.',
  },
  {
    question: 'Is every sector a separately registered company?',
    answer: 'The verified legal entity published on this website is Bitvion Technologies, a proprietary technology enterprise. The other names are sectors of the Bitvion Groups house. They are not described here as separate incorporations.',
  },
  {
    question: 'Where is the original technology website?',
    answer: 'It now lives at /technologies, with the existing solutions, YatrikERP, industries, company and insights pages unchanged.',
  },
]

const groupsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#groups`,
  name: GROUP_NAME,
  slogan: GROUP_TAGLINE,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/bitvion-groups-seal.webp`,
  image: `${SITE_URL}/bitvion-groups-ecosystem.webp`,
  email: 'info@bitvion.in',
  telephone: '+919143139991',
  description: GROUP_DESCRIPTION,
  founder: { '@type': 'Person', name: 'Akhil Shijo', url: `${SITE_URL}/company/founder` },
  subOrganization: { '@id': `${SITE_URL}/#organization` },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Kerala' },
    { '@type': 'City', name: 'Bangalore' },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '404, Mittathanickal House, Prakash Post Office',
      addressLocality: 'Udayagiri',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
  ],
}

const groupNodes = [
  { label: 'TECH', angle: -90, path: '/technologies' },
  { label: 'BUSINESS', angle: -45, path: '/business' },
  { label: 'TRADE', angle: 0, path: '/trading' },
  { label: 'ADVICE', angle: 45, path: '/consultancy' },
  { label: 'TRAVEL', angle: 90, path: '/travels' },
  { label: 'BUILD', angle: 135, path: '/ventures' },
  { label: 'LANES', angle: 180, path: '/imports-exports' },
  { label: 'PRODUCT', angle: -135, path: '/bitvion-products' },
]

const GroupsHome = () => {
  const reduceMotion = useReducedMotion()
  return (
  <>
    <PageMeta
      title={GROUP_TITLE}
      description={GROUP_DESCRIPTION}
      path='/'
      keywords='Bitvion Groups India, Bitvion Technologies Kerala, software company Bangalore, technology company India, AI company Kerala, Bitvion Business, Bitvion Trading, Bitvion Consultancy, Bitvion Travels, Bitvion Ventures, imports and exports India, YatrikERP, Akhil Shijo'
      siteName='Bitvion Groups'
      image={`${SITE_URL}/bitvion-groups-seal.webp`}
      imageAlt='Bitvion Groups seal'
    />
    <StructuredData
      data={[
        groupsSchema,
        buildWebPageSchema({ name: GROUP_TITLE, description: GROUP_DESCRIPTION, path: '/' }),
        buildFAQSchema(faqs),
        buildItemListSchema('Bitvion Groups sectors', sectors.map((sector) => ({
          name: sector.name,
          description: sector.summary,
          path: sector.path,
        }))),
      ]}
    />

    <section className='groups-hero'>
      <HeroBackground />
      <div className='groups-hero__glow' aria-hidden='true' />
      <div className='groups-hero__grid'>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className='groups-kicker'><i /> The house brand</p>
          <h1>BITVION <span>GROUPS</span></h1>
          <p className='groups-lead'>{GROUP_TAGLINE} Eight sectors. One standard. The technology company you already know sits inside this house, and each sister sector now has a page of its own.</p>
          <div className='groups-actions'>
            <Link to='/technologies' className='hero-cta-primary inline-flex items-center justify-center px-6 min-h-[52px] rounded-[11px] font-poppins font-medium text-primary'>Enter Technologies</Link>
            <Link to='/contact' className='hero-cta-secondary inline-flex items-center justify-center px-6 min-h-[52px] rounded-[11px] font-poppins font-medium text-white border border-white/15'>Talk to the Group</Link>
          </div>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className='lg:hidden'>
            <BitvionCore
              variant='mobile'
              primary={groupNodes}
              secondary={[]}
              coreLabel='Groups'
              markSrc='/bitvion-groups-seal-display.webp'
              roundMark
              markClassName='seal-mark'
              ariaLabel='Bitvion Groups network of eight sectors'
            />
          </div>
          <div className='hidden lg:block'>
            <BitvionCore
              primary={groupNodes}
              secondary={[]}
              coreLabel='Groups'
              markSrc='/bitvion-groups-seal-display.webp'
              roundMark
              markClassName='seal-mark'
              ariaLabel='Bitvion Groups network of eight sectors'
            />
          </div>
        </motion.div>
      </div>
    </section>

    <section className='groups-section' aria-labelledby='orbit-heading'>
      <motion.h2
        id='orbit-heading'
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
      >
        Eight sectors. One orbit.
      </motion.h2>
      <p className='groups-muted max-w-[640px] mt-4 mb-8'>The ring is the map of the house. Technologies remains the deep company site. Every other name opens its own page.</p>
      <div className='groups-orbit'>
        <img className='groups-orbit__core' src='/bitvion-groups-seal-display.webp' alt='Bitvion Groups seal' width='640' height='640' decoding='async' fetchPriority='high' />
        {sectors.map((sector, index) => (
          <MotionLink
            key={sector.slug}
            to={sector.path}
            className='groups-orbit__item'
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <i className='groups-orbit__dot' style={{ background: sector.accent, color: sector.accent, animationDelay: `${index * 0.2}s` }} />
            <strong>{sector.nav.toUpperCase()}</strong>
            <span>{sector.kicker}</span>
          </MotionLink>
        ))}
      </div>
    </section>

    <section className='groups-section'>
      <figure className='media-stage'>
        <img src='/bitvion-groups-ecosystem-display.webp' alt='Bitvion Groups ecosystem: Technologies, Products, Business, Trading, Consultancy, Travels, Ventures, and Imports and Exports around the group seal.' width='1040' height='1040' decoding='async' loading='lazy' />
      </figure>
    </section>

    <section className='groups-section' aria-labelledby='sectors-heading'>
      <h2 id='sectors-heading'>The house, sector by sector.</h2>
      <div className='mt-10'>
        {sectors.map((sector, index) => (
          <motion.article
            key={sector.slug}
            className='groups-band'
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
          >
            <div>
              <p className='font-poppins text-[12px] tracking-[0.2em] uppercase' style={{ color: sector.accent }}>{sector.kicker}</p>
              <h3 className='text-white mt-2'><Link className='sector-link' to={sector.path}>{sector.name}</Link></h3>
            </div>
            <div>
              <p className='groups-muted'>{sector.lede}</p>
              <Link to={sector.path} className='inline-block mt-4 font-poppins text-white'>Open this sector →</Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    <section className='groups-section'>
      <h2>Built as a house, not a list of logos.</h2>
      <div className='pillar-grid mt-8'>
        {[
          ['One founder', 'Akhil Shijo leads the house and is Founder and Proprietor of Bitvion Technologies.'],
          ['One standard', 'A sector is published only with a clear job. Empty product names are not added to fill a ring.'],
          ['One technology spine', 'When a sector needs software, Bitvion Technologies is the company that engineers it.'],
          ['Two cities', 'The work is based in Kerala and Bangalore, and looks outward to international markets.'],
        ].map(([title, text], index) => (
          <motion.article
            key={title}
            className='glass-card'
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
          >
            <h3>{title}</h3>
            <p className='groups-muted text-[14px]'>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>

    <section className='groups-section'>
      <h2>A house with a technology company inside it.</h2>
      <div className='grid md:grid-cols-3 gap-6 mt-8'>
        <article>
          <h3 className='text-white font-poppins text-[20px] mb-3'>One legal enterprise</h3>
          <p className='groups-muted'>The verified company on this website is Bitvion Technologies, a proprietary technology enterprise founded and owned by Akhil Shijo. The other names are sectors of the Bitvion Groups house. They are not described here as separate incorporations.</p>
        </article>
        <article>
          <h3 className='text-white font-poppins text-[20px] mb-3'>One engineering spine</h3>
          <p className='groups-muted'>Software, AI, automation and YatrikERP are engineered by Bitvion Technologies. When Business, Trading, Travels, Ventures or Imports needs a system, that is the company that builds it.</p>
        </article>
        <article>
          <h3 className='text-white font-poppins text-[20px] mb-3'>Pages that say what they are</h3>
          <p className='groups-muted'>Trading is commercial operations, not a brokerage. Ventures is not a fund. Travels is planning, not a ticket engine. Products names YatrikERP and does not invent empty product names to fill a ring.</p>
        </article>
      </div>
    </section>

    <section className='groups-section'>
      <FaqSection title='Questions about the group' faqs={faqs} />
      <div className='groups-actions'>
        <Link to='/company/founder' className='font-poppins text-white border border-white/15 rounded-[11px] px-5 py-3'>The founder</Link>
        <Link to='/contact' className='font-poppins text-primary bg-secondary rounded-[11px] px-5 py-3'>Start a conversation</Link>
      </div>
    </section>
  </>
  )
}

export default GroupsHome
