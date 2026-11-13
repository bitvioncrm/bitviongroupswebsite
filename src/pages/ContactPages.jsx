import React from 'react'
import PageMeta from '../components/seo/PageMeta'
import StructuredData, { buildBreadcrumbSchema } from '../components/seo/StructuredData'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import ContactForm from '../components/forms/ContactForm'
import ProposalForm from '../components/forms/ProposalForm'
import DemoForm from '../components/forms/DemoForm'
import CareersForm from '../components/forms/CareersForm'
import JobOpenings from '../components/JobOpenings'
import AnimateIn from '../components/AnimateIn'
import styles from '../style'
import { entity } from '../data/entity'

const ContactPage = () => (
  <PageShell>
    <PageMeta title='Contact Bitvion Technologies | Technology & Software Solutions' description='Contact Bitvion Technologies to discuss AI, software, automation and digital transformation projects.' path='/contact' />
    <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
    <PageHero
      eyebrow='Contact'
      title={<>LET&apos;S BUILD <br className='sm:block hidden' />SOMETHING <br className='sm:block hidden' /><span className='text-gradient'>INTELLIGENT.</span></>}
      subtitle='Bitvion Technologies is the registered business. Use the form, or talk directly on the number below.'
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
    />
    <div className='p-6 mb-8 rounded-[20px] bg-black-gradient border border-white/10'>
      <h2 className='font-poppins font-semibold text-white text-[20px] mb-4'>Registered business</h2>
      <dl className='grid sm:grid-cols-2 gap-4 font-poppins text-[15px]'>
        <div>
          <dt className='text-dimWhite'>Legal name</dt>
          <dd className='text-white mt-1'>{entity.organization.legalName}</dd>
        </div>
        <div>
          <dt className='text-dimWhite'>Proprietor</dt>
          <dd className='text-white mt-1'>Akhil Shijo</dd>
        </div>
        <div>
          <dt className='text-dimWhite'>Operating address</dt>
          <dd className='text-white mt-1'>{entity.organization.operatingAddress}</dd>
        </div>
        <div>
          <dt className='text-dimWhite'>Also working from</dt>
          <dd className='text-white mt-1'>{entity.organization.presence}</dd>
        </div>
        <div>
          <dt className='text-dimWhite'>Support email</dt>
          <dd className='text-white mt-1'><a className='hover:text-secondary' href={`mailto:${entity.organization.email}`}>{entity.organization.email}</a></dd>
        </div>
        <div>
          <dt className='text-dimWhite'>Phone</dt>
          <dd className='text-white mt-1'><a className='hover:text-secondary' href={entity.organization.whatsappUrl}>{entity.organization.phoneDisplay}</a></dd>
        </div>
        <div>
          <dt className='text-dimWhite'>Udyam</dt>
          <dd className='text-white mt-1'>{entity.organization.udyam}</dd>
        </div>
        {entity.organization.officers.map((officer) => (
          <div key={officer.role}>
            <dt className='text-dimWhite'>{officer.role}</dt>
            <dd className='text-white mt-1'>
              {officer.name}
              <span className='block text-dimWhite'>{entity.organization.email}</span>
              <span className='block text-dimWhite'>{entity.organization.phoneDisplay}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
    <div className='grid md:grid-cols-5 gap-10'>
      <div className='md:col-span-3 order-2 md:order-1'>
        <ContactForm />
      </div>
      <aside className='md:col-span-2 space-y-6 order-1 md:order-2'>
        <div className='p-6 rounded-xl bg-black-gradient border border-secondary/30'>
          <p className='font-poppins text-[12px] tracking-[0.18em] uppercase text-secondary mb-2'>Direct talk</p>
          <h2 className='font-poppins font-semibold text-white text-[18px] mb-2'>Talk on WhatsApp</h2>
          <a
            href={entity.organization.whatsappUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='block font-poppins font-semibold text-white text-[22px] tracking-wide mb-4 hover:text-secondary transition-colors'
          >
            {entity.organization.phoneDisplay}
          </a>
          <a
            href={entity.organization.whatsappUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center w-full min-h-[52px] px-5 rounded-[11px] font-poppins font-medium text-[15px] text-primary hero-cta-primary'
          >
            Open WhatsApp
          </a>
          <p className='font-poppins text-dimWhite text-[14px] mt-3'>Opens a chat with {entity.organization.phoneDisplay}.</p>
        </div>
        <div className='p-6 rounded-xl bg-black-gradient border border-white/10'>
          <h2 className='font-poppins font-semibold text-white text-[18px] mb-4'>Email</h2>
          <ul className='space-y-2 font-poppins text-[14px] text-dimWhite' role='list'>
            <li><a href='mailto:info@bitvion.in' className='hover:text-secondary transition-colors'>info@bitvion.in</a> — General</li>
            <li><a href='mailto:business@bitvion.in' className='hover:text-secondary transition-colors'>business@bitvion.in</a> — Business</li>
          </ul>
        </div>
        <div className='p-6 rounded-xl bg-black-gradient border border-white/10'>
          <h2 className='font-poppins font-semibold text-white text-[18px] mb-3'>Locations</h2>
          <ul className='space-y-2 font-poppins text-[14px] text-dimWhite' role='list'>
            <li>{entity.organization.operatingAddress}</li>
            <li>{entity.organization.presence}</li>
          </ul>
        </div>
      </aside>
    </div>
  </PageShell>
)

export const RequestProposalPage = () => (
  <PageShell>
    <PageMeta title='Request a Proposal | Bitvion Technologies' description='Tell us what you want to build and receive a tailored technology proposal from Bitvion.' path='/request-proposal' />
    <PageHero eyebrow='Proposal' title={<>TELL US WHAT <br className='sm:block hidden' />YOU WANT TO <span className='text-gradient'>BUILD.</span></>} subtitle='Share your project requirements and we will prepare a tailored proposal.' breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Request Proposal', path: '/request-proposal' }]} />
    <div className='max-w-[800px]'><ProposalForm /></div>
  </PageShell>
)

export const RequestDemoPage = () => (
  <PageShell>
    <PageMeta title='Request a Demo | Bitvion Technologies' description='Schedule a demonstration of YatrikERP and Bitvion products.' path='/request-demo' />
    <PageHero eyebrow='Demo' title={<>SEE BITVION <span className='text-gradient'>IN ACTION.</span></>} subtitle='Schedule a product demonstration with our team.' breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Request Demo', path: '/request-demo' }]} />
    <div className='max-w-[700px]'><DemoForm /></div>
  </PageShell>
)

export const CareersPage = () => (
  <PageShell>
    <PageMeta title='Careers | Bitvion Technologies' description='Build the future with Bitvion Technologies. Submit your profile for engineering opportunities.' path='/careers' />
    <PageHero eyebrow='Careers' title={<>BUILD THE FUTURE <br className='sm:block hidden' /><span className='text-gradient'>WITH BITVION.</span></>} subtitle='Engineering culture focused on AI, software and product development.' breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }]} />
    <section className='mb-10 grid sm:grid-cols-3 gap-6'>
      {[
        ['Why Bitvion', 'Work on meaningful engineering projects spanning AI, software and automation.'],
        ['Engineering Culture', 'Structured development practices with focus on quality and continuous learning.'],
        ['Technology', 'Modern technology stack including Python, React, cloud and AI frameworks.'],
      ].map(([title, desc]) => (
        <AnimateIn key={title}>
          <div className='p-6 rounded-xl bg-black-gradient border border-white/5 h-full'>
            <h2 className='font-poppins font-semibold text-white text-[18px] mb-3'>{title}</h2>
            <p className='font-poppins text-dimWhite text-[14px]'>{desc}</p>
          </div>
        </AnimateIn>
      ))}
    </section>
    <JobOpenings showAll />
    <AnimateIn className='mt-16'>
      <h2 className='font-poppins font-semibold text-white text-[24px] mb-3'>Apply Now</h2>
      <p className={`${styles.paragraph} mb-8 max-w-[600px]`}>Submit your profile for any open role or for future opportunities at Bitvion Technologies.</p>
      <div className='max-w-[700px]'><CareersForm /></div>
    </AnimateIn>
  </PageShell>
)

export default ContactPage
