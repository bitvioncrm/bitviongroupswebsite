import React from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/seo/PageMeta'
import StructuredData, { buildBreadcrumbSchema } from '../components/seo/StructuredData'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import { formatInr, offers } from '../data/offers'

const PricingPage = () => (
  <PageShell>
    <PageMeta
      title='Services and Prices in INR | Bitvion Technologies'
      description='Published prices in Indian Rupees for Bitvion Technologies consultations, briefs, the YatrikERP workshop and the first software milestone.'
      path='/pricing'
    />
    <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }])} />
    <PageHero
      eyebrow='Services'
      title={<>PUBLISHED PRICES <span className='text-gradient'>IN RUPEES.</span></>}
      subtitle='These are the services Bitvion Technologies sells on this website. Prices are public. No account is required to see them or to open checkout.'
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]}
    />
    <p className='font-poppins text-dimWhite text-[15px] max-w-[720px] mb-8'>
      Every price is in Indian Rupees and is exclusive of GST where GST applies. There is no shipping charge. Delivery is digital, as described on each service and on the Shipping &amp; Delivery Policy.
    </p>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {offers.map((offer) => (
        <article key={offer.id} className='flex flex-col p-6 rounded-[20px] bg-black-gradient border border-white/10'>
          <h2 className='font-poppins font-semibold text-white text-[22px]'>{offer.name}</h2>
          <p className='font-poppins text-secondary text-[28px] mt-3'>{formatInr(offer.price)}</p>
          <p className='font-poppins text-dimWhite text-[15px] leading-[24px] mt-3'>{offer.summary}</p>
          <p className='font-poppins text-white/80 text-[14px] leading-[22px] mt-3'>Delivery: {offer.delivery}</p>
          <Link
            to={`/checkout?offer=${offer.id}`}
            className='hero-cta-primary inline-flex items-center justify-center mt-6 min-h-[48px] px-5 rounded-[11px] font-poppins font-medium text-primary'
          >
            Select and checkout
          </Link>
        </article>
      ))}
    </div>
  </PageShell>
)

export default PricingPage
