import React from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../../components/seo/PageMeta'
import StructuredData, {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildWebPageSchema,
  yatrikSoftwareSchema,
} from '../../components/seo/StructuredData'
import EntityNav from '../../components/seo/EntityNav'
import FaqSection from '../../components/seo/FaqSection'
import PageShell from '../../components/layout/PageShell'
import PageHero from '../../components/layout/PageHero'
import FlowDiagram from '../../components/layout/FlowDiagram'
import CTAButton from '../../components/CTAButton'
import { trackEvent } from '../../utils/analytics'
import { formatInr, getOffer } from '../../data/offers'
import styles from '../../style'

const yatrikModules = [
  'Scheduling',
  'Tracking',
  'Inventory',
  'Workflows',
  'Ticketing',
  'Duty management',
  'Finance & settlement',
  'Analytics',
]

const yatrikArchitecture = [
  'Operations', 'Scheduling', 'Tracking', 'Ticketing',
  'Inventory', 'Finance', 'Duty Management', 'Analytics',
]

const sectors = [
  {
    title: 'Transportation operations',
    text: 'Supports route-oriented operations with scheduling, tracking, ticketing, inventory and duty workflows for transportation teams.',
  },
  {
    title: 'Hospital operations',
    text: 'Designed to extend modular operations patterns into hospital operational workflows where coordination, tracking and inventory discipline matter.',
  },
  {
    title: 'School operations',
    text: 'Supports school operational contexts that need structured scheduling, tracking and day-to-day workflow coordination.',
  },
]

const yatrikFeatures = [
  'AI-assisted operations planning',
  'Scheduling and resource coordination',
  'Tracking integrations',
  'Inventory and spare-parts workflows',
  'Duty assignment',
  'Ticketing and collection workflows',
  'Settlement and operational finance support',
  'Modular architecture for sector-specific configuration',
]

const yatrikFaqs = [
  {
    question: 'What is YatrikERP?',
    answer:
      'YatrikERP is an AI-powered modular operations platform developed by Bitvion Technologies for transportation, hospital and school operations.',
  },
  {
    question: 'Who develops YatrikERP?',
    answer:
      'YatrikERP is developed by Bitvion Technologies, a proprietary technology enterprise founded and owned by Akhil Shijo.',
  },
  {
    question: 'What modules does YatrikERP include?',
    answer:
      'YatrikERP includes modular capabilities across scheduling, tracking, inventory, workflows, ticketing, duty management, finance support and analytics.',
  },
  {
    question: 'How can I see a demonstration?',
    answer:
      'Submit a demo request through the Bitvion Technologies website and the team can schedule a walkthrough of YatrikERP capabilities.',
  },
]

export const ProductsOverview = () => {
  React.useEffect(() => { trackEvent('product_view', { page: 'overview' }) }, [])

  return (
    <PageShell>
      <PageMeta
        title='Products | Bitvion Technologies'
        description='Digital products built by Bitvion Technologies, including YatrikERP — an AI-powered modular operations platform.'
        path='/products'
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }])} />
      <PageHero
        eyebrow='Products'
        title={<>PRODUCTS <br className='sm:block hidden' /><span className='text-gradient'>BUILT BY BITVION.</span></>}
        subtitle='Software products engineered by Bitvion Technologies for real-world operational environments.'
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }]}
      />
      <Link to='/products/yatrikerp' className='group block p-8 sm:p-10 rounded-[20px] bg-black-gradient-2 border border-white/10 hover:border-secondary/30 transition-all'>
        <span className='font-poppins text-secondary text-[14px] uppercase tracking-widest'>Primary Product</span>
        <h2 className='font-poppins font-semibold text-white text-[32px] mt-3 group-hover:text-gradient transition-colors'>YatrikERP</h2>
        <p className={`${styles.paragraph} mt-4 max-w-[600px]`}>
          AI-powered modular operations platform by Bitvion Technologies for transportation, hospital and school operations.
        </p>
        <p className='font-poppins text-secondary text-[28px] mt-5'>{formatInr(getOffer('yatrikerp-workshop').price)}</p>
        <p className='font-poppins text-white/80 text-[14px] mt-1'>YatrikERP workshop. Price in Indian Rupees. GST, where it applies, is extra.</p>
        <span className='inline-block mt-6 font-poppins text-secondary group-hover:translate-x-2 transition-transform'>Explore YatrikERP →</span>
      </Link>
    </PageShell>
  )
}

export const YatrikERPPage = () => {
  React.useEffect(() => { trackEvent('product_view', { product: 'yatrikerp' }) }, [])

  return (
    <PageShell>
      <PageMeta
        title='YatrikERP | AI-Powered Business Operations Platform | Bitvion Technologies'
        description='YatrikERP is an AI-powered modular operations platform developed by Bitvion Technologies for transportation, hospital and school operations.'
        path='/products/yatrikerp'
      />
      <StructuredData
        data={[
          yatrikSoftwareSchema,
          buildWebPageSchema({
            name: 'YatrikERP',
            description: 'YatrikERP by Bitvion Technologies — AI-powered modular business operations platform.',
            path: '/products/yatrikerp',
          }),
          buildFAQSchema(yatrikFaqs),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: 'YatrikERP', path: '/products/yatrikerp' },
          ]),
        ]}
      />

      <PageHero
        eyebrow='Product by Bitvion Technologies'
        title='YatrikERP'
        subtitle='An AI-powered modular business operations platform developed by Bitvion Technologies for transportation, hospital and school operations.'
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: 'YatrikERP', path: '/products/yatrikerp' }]}
      />

      <section className='grid md:grid-cols-2 gap-10 mb-12'>
        <div>
          <h2 className='font-poppins font-semibold text-white text-[24px] mb-4'>What YatrikERP is</h2>
          <p className={styles.paragraph}>
            YatrikERP is a technology product developed by Bitvion Technologies. It brings together
            scheduling, tracking, inventory, workflows, ticketing, duty management and operational
            finance support into a modular platform designed for real-world operations.
          </p>
          <p className={`${styles.paragraph} mt-4`}>
            AI-assisted capabilities help operators coordinate resources, streamline daily workflows
            and improve operational visibility — without unsupported claims about outcomes that have
            not been independently verified.
          </p>
        </div>
        <FlowDiagram steps={yatrikArchitecture} />
      </section>

      <section className='mb-12'>
        <h2 className='font-poppins font-semibold text-white text-[24px] mb-4'>Who it is for</h2>
        <p className={`${styles.paragraph} mb-6 max-w-[720px]`}>
          YatrikERP is designed for organizations that need structured operational software across
          transportation, hospital and school contexts — teams that coordinate schedules, assets,
          inventory and day-to-day workflows.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {sectors.map((sector) => (
            <div key={sector.title} className='p-6 rounded-xl bg-black-gradient border border-white/10'>
              <h3 className='font-poppins font-semibold text-white text-[16px] mb-3'>{sector.title}</h3>
              <p className='font-poppins text-dimWhite text-[14px] leading-[24px]'>{sector.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mb-12'>
        <h2 className='font-poppins font-semibold text-white text-[24px] mb-6'>Modules & capabilities</h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8' role='list'>
          {yatrikModules.map((item) => (
            <li key={item} className='flex items-center gap-3 px-4 py-3 rounded-lg border border-white/5'>
              <div className='w-[6px] h-[6px] rounded-full bg-secondary' aria-hidden='true' />
              <span className='font-poppins text-dimWhite text-[15px]'>{item}</span>
            </li>
          ))}
        </ul>
        <h3 className='font-poppins font-semibold text-white text-[18px] mb-4'>Feature highlights</h3>
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3' role='list'>
          {yatrikFeatures.map((f) => (
            <li key={f} className='flex items-center gap-3 px-4 py-3 rounded-lg border border-white/5'>
              <div className='w-[6px] h-[6px] rounded-full bg-secondary' aria-hidden='true' />
              <span className='font-poppins text-dimWhite text-[15px]'>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className='mb-12 max-w-[720px]'>
        <h2 className='font-poppins font-semibold text-white text-[24px] mb-4'>Integrations & roadmap</h2>
        <p className={styles.paragraph}>
          YatrikERP is designed as a modular platform that can connect with operational data sources
          and tracking systems as implementation requirements define. Roadmap priorities are shaped
          by customer operational needs and Bitvion Technologies product engineering — specific
          release commitments are shared during engagement discussions rather than as public guarantees.
        </p>
      </section>

      <FaqSection faqs={yatrikFaqs} />

      <EntityNav
        className='my-10'
        label='Related to YatrikERP'
        links={[
          { name: 'Bitvion Technologies', path: '/company/about' },
          { name: 'Akhil Shijo, Founder & Proprietor of Bitvion Technologies', path: '/company/founder' },
          { name: 'Contact Bitvion Technologies', path: '/contact' },
        ]}
      />

      <div className='p-6 mb-8 rounded-[20px] bg-black-gradient border border-secondary/30 max-w-[720px]'>
        <h2 className='font-poppins font-semibold text-white text-[22px]'>YatrikERP workshop</h2>
        <p className='font-poppins text-secondary text-[32px] mt-2'>{formatInr(getOffer('yatrikerp-workshop').price)}</p>
        <p className={`${styles.paragraph} mt-3`}>
          A guided online workshop for one organisation, plus setup notes. The price is in Indian Rupees and is exclusive of GST where GST applies. There is no shipping charge. A product demonstration is free and is separate from this paid workshop.
        </p>
        <div className='flex flex-wrap gap-4 mt-6'>
          <CTAButton to='/checkout?offer=yatrikerp-workshop' variant='primary'>
            Buy the workshop
          </CTAButton>
          <CTAButton to='/request-demo' variant='secondary' onClick={() => trackEvent('yatrikerp_demo_click')}>
            Request a free demo
          </CTAButton>
        </div>
      </div>
    </PageShell>
  )
}
