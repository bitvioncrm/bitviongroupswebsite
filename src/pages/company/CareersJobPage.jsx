import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageMeta from '../../components/seo/PageMeta'
import PageShell from '../../components/layout/PageShell'
import ApplicationForm from '../../components/careers/ApplicationForm'
import { getJobBySlug } from '../../data/careers'
import { fetchPublicJob } from '../../utils/careersApi'

export const CareersJobPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [apply, setApply] = useState(false)

  useEffect(() => {
    let active = true
    setApply(false)
    fetchPublicJob(slug).then((live) => {
      if (!active) return
      setJob(live || getJobBySlug(slug) || null)
    })
    return () => { active = false }
  }, [slug])

  if (!job) {
    return (
      <PageShell className='careers-page'>
        <div className='max-w-[760px] mx-auto px-4 py-24 text-center'>
          <h1 className='font-poppins text-white text-[28px] mb-4'>Role not found</h1>
          <Link to='/company/careers' className='text-secondary'>Back to careers</Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell className='careers-page'>
      <PageMeta title={`${job.title} | Careers at Bitvion`} description={job.description} path={`/company/careers/${job.slug}`} />
      <div className='max-w-[860px] mx-auto px-4 sm:px-8 py-16'>
        {apply ? (
          <ApplicationForm selectedJob={job} onBack={() => setApply(false)} />
        ) : (
          <article className='careers-glass-card p-6 sm:p-10 rounded-[20px] border border-white/10'>
            <div className='flex flex-wrap gap-2 mb-4'>
              <span className='px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-poppins'>{job.type}</span>
              <span className='px-3 py-1 rounded-full bg-dimBlue text-dimWhite text-[12px] font-poppins'>{job.department}</span>
              {job.workMode && <span className='px-3 py-1 rounded-full bg-white/5 text-dimWhite text-[12px] font-poppins'>{job.workMode}</span>}
            </div>
            <h1 className='font-poppins font-bold text-white text-[28px] sm:text-[34px] mb-3'>{job.title}</h1>
            <p className='font-poppins text-dimWhite/75 text-[14px] mb-6'>
              {job.location} · {job.experience}{job.duration ? ` · ${job.duration}` : ''}
              {job.applicationDeadline ? ` · Deadline ${new Date(job.applicationDeadline).toLocaleDateString()}` : ''}
            </p>
            <p className='font-poppins text-dimWhite text-[15px] leading-relaxed mb-6'>{job.description}</p>
            {job.responsibilities?.length > 0 && (
              <>
                <h2 className='font-poppins text-secondary text-[12px] uppercase tracking-[0.16em] mb-3'>Responsibilities</h2>
                <ul className='space-y-2 mb-6'>
                  {job.responsibilities.map((item) => <li key={item} className='font-poppins text-dimWhite text-[14px]'>{item}</li>)}
                </ul>
              </>
            )}
            {job.requiredSkills?.length > 0 && (
              <>
                <h2 className='font-poppins text-secondary text-[12px] uppercase tracking-[0.16em] mb-3'>Requirements</h2>
                <div className='flex flex-wrap gap-2 mb-6'>
                  {job.requiredSkills.map((skill) => <span key={skill} className='px-3 py-1 rounded-full bg-primary border border-white/10 text-[12px] text-dimWhite'>{skill}</span>)}
                </div>
              </>
            )}
            {job.educationRequirements && <p className='font-poppins text-dimWhite text-[14px] mb-6'>Education: {job.educationRequirements}</p>}
            <div className='flex flex-col sm:flex-row gap-3'>
              <button type='button' onClick={() => setApply(true)} className='hero-cta-primary min-h-[48px] px-6 rounded-[10px] font-poppins text-[15px] text-primary'>Apply Now</button>
              <button type='button' onClick={() => navigate('/company/careers')} className='min-h-[48px] px-6 rounded-[10px] border border-white/15 text-white font-poppins text-[15px]'>Back to careers</button>
            </div>
          </article>
        )}
      </div>
    </PageShell>
  )
}

export default CareersJobPage
