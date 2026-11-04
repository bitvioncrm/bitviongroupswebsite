import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageMeta from '../../components/seo/PageMeta'
import StructuredData, { buildBreadcrumbSchema } from '../../components/seo/StructuredData'
import PageShell from '../../components/layout/PageShell'
import CareersHero from '../../components/careers/CareersHero'
import WorkingLocations from '../../components/careers/WorkingLocations'
import JobListings from '../../components/careers/JobListings'
import InternshipProgram from '../../components/careers/InternshipProgram'
import JobDetailModal from '../../components/careers/JobDetailModal'
import ApplicationForm from '../../components/careers/ApplicationForm'
import { getJobBySlug, jobOpenings } from '../../data/careers'
import { fetchPublicJobs } from '../../utils/careersApi'

const buildJobPostingSchema = (jobs) =>
  jobs.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: '2026-01-01',
    employmentType: job.type === 'Internship' ? 'INTERN' : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Bitvion Technologies',
      sameAs: 'https://bitvion.in',
    },
    jobLocation: (job.locations || []).map((location) => ({
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'IN',
      },
    })),
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
  }))

export const CompanyCareersPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedJob, setSelectedJob] = useState(null)
  const [detailJob, setDetailJob] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [liveJobs, setLiveJobs] = useState(null)

  useEffect(() => {
    let active = true
    fetchPublicJobs().then((jobs) => {
      if (active && jobs?.length) setLiveJobs(jobs)
    })
    return () => { active = false }
  }, [])

  const catalog = liveJobs ?? jobOpenings
  const fullTime = useMemo(() => catalog.filter((job) => job.type === 'Full-time' || job.employmentType === 'FULL_TIME'), [catalog])
  const internships = useMemo(() => catalog.filter((job) => job.type === 'Internship' || job.employmentType === 'INTERNSHIP'), [catalog])

  const findJob = useCallback((slug) => catalog.find((job) => job.slug === slug || job.id === slug) || getJobBySlug(slug), [catalog])

  const applySlug = searchParams.get('apply')
  const jobSlug = searchParams.get('job')

  useEffect(() => {
    if (applySlug) {
      const job = findJob(applySlug)
      if (job) {
        setSelectedJob(job)
        setShowForm(true)
      }
    } else if (jobSlug) {
      const job = findJob(jobSlug)
      if (job) setDetailJob(job)
    }
  }, [applySlug, jobSlug, findJob])

  const openApply = useCallback((job) => {
    setSelectedJob(job)
    setShowForm(true)
    setDetailJob(null)
    setSearchParams({ apply: job.slug })
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [setSearchParams])

  const openDetail = useCallback((job) => {
    navigate(`/company/careers/${job.slug}`)
  }, [navigate])

  const closeDetail = useCallback(() => {
    setDetailJob(null)
    setSearchParams({})
  }, [setSearchParams])

  const closeForm = useCallback(() => {
    setShowForm(false)
    setSelectedJob(null)
    setSearchParams({})
  }, [setSearchParams])

  return (
    <PageShell className='careers-page'>
      <PageMeta
        title='Careers at Bitvion Technologies | Jobs & Internships'
        description='Build what comes next at Bitvion Technologies. Explore software engineering, AI/ML and internship opportunities across Kerala, Bengaluru and remote India.'
        path='/company/careers'
      />
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Company', path: '/company' },
            { name: 'Careers', path: '/company/careers' },
          ]),
          ...buildJobPostingSchema(catalog),
        ]}
      />

      <CareersHero />
      <div className='max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-10'>
        <WorkingLocations />
        <JobListings jobs={fullTime} onViewRole={openDetail} onApply={openApply} employmentFilter='Full-time' />
        <InternshipProgram jobs={internships} onApply={openApply} />

        <section id='apply-form' className='py-14 sm:py-16 scroll-mt-28'>
          {showForm && selectedJob ? (
            <ApplicationForm selectedJob={selectedJob} onBack={closeForm} />
          ) : (
            <div className='careers-glass-card p-8 sm:p-10 rounded-[20px] border border-white/10 text-center'>
              <h2 className='font-poppins font-bold text-white text-[26px] mb-3'>Ready to Apply?</h2>
              <p className='font-poppins text-dimWhite text-[15px] max-w-[560px] mx-auto mb-6'>
                Select a role above and choose Apply Now to open the application form with the position automatically selected.
              </p>
              <a href='#open-positions' className='hero-cta-primary inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-[10px] font-poppins text-[15px] text-primary'>
                Explore Open Positions <span aria-hidden='true'>→</span>
              </a>
            </div>
          )}
        </section>
      </div>

      <JobDetailModal job={detailJob} onClose={closeDetail} onApply={openApply} />
    </PageShell>
  )
}

export default CompanyCareersPage
