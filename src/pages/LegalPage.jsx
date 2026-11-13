import React from 'react'
import { useLocation } from 'react-router-dom'
import PageMeta from '../components/seo/PageMeta'
import StructuredData, { buildBreadcrumbSchema } from '../components/seo/StructuredData'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import PolicyBar from '../components/PolicyBar'
import { legalPages, LEGAL_LAST_UPDATED } from '../data/legal'
import { entity } from '../data/entity'
import styles from '../style'

const LegalPage = () => {
  const { pathname } = useLocation()
  const type = pathname.replace('/', '')
  const page = legalPages[type]

  if (!page) {
    return (
      <PageShell>
        <PageHero title='Page Not Found' />
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageMeta title={page.meta.title} description={page.meta.description} path={pathname} />
      <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: page.title, path: pathname }])} />
      <PageHero
        eyebrow='Legal'
        title={page.title.toUpperCase()}
        subtitle={`Last Updated: ${LEGAL_LAST_UPDATED}`}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: page.title, path: pathname }]}
      />
      <div className='max-w-[800px] mb-6'>
        <PolicyBar compact />
      </div>
      <div className='max-w-[800px] mb-8 p-6 rounded-[20px] bg-black-gradient border border-white/10 font-poppins text-[15px]'>
        <p className='text-white'>{entity.organization.legalName}, a proprietary concern of Akhil Shijo</p>
        <p className='text-dimWhite mt-2'>{entity.organization.operatingAddress}</p>
        <p className='text-dimWhite mt-2'>{entity.organization.email} · {entity.organization.phoneDisplay}</p>
        <p className='text-dimWhite mt-2'>Grievance Officer and Nodal Officer: Akhil Shijo, {entity.organization.email}, {entity.organization.phoneDisplay}. Complaints are answered within 4 business days.</p>
      </div>
      <div className='max-w-[800px] space-y-8'>
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className='font-poppins font-semibold text-white text-[20px] mb-3'>{section.heading}</h2>
            <p className={`${styles.paragraph} text-[16px]`}>{section.content}</p>
          </section>
        ))}
        <div className='border-t border-white/10 pt-6'>
          <PolicyBar compact />
          <p className='font-poppins text-dimWhite text-[14px] mt-6'>
            Bitvion Technologies, a proprietary concern of Akhil Shijo. Questions: info@bitvion.in or +91 91431 39991.
          </p>
        </div>
      </div>
    </PageShell>
  )
}

export default LegalPage
