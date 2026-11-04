import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const JobDetailModal = ({ job, onClose, onApply }) => {
  useEffect(() => {
    if (!job) return undefined
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [job, onClose])

  return (
    <AnimatePresence>
      {job && (
        <div className='fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6' role='dialog' aria-modal='true' aria-labelledby='job-detail-title'>
          <motion.button
            type='button'
            className='absolute inset-0 bg-[#00040f]/85 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label='Close role details'
          />
          <motion.div
            className='relative w-full sm:max-w-[760px] max-h-[92vh] overflow-y-auto careers-glass-card rounded-t-[20px] sm:rounded-[20px] border border-white/10 bg-[#030912]/95 p-6 sm:p-8'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='flex flex-wrap items-center gap-2 mb-4'>
              <span className='px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-poppins'>{job.type}</span>
              <span className='px-3 py-1 rounded-full bg-dimBlue text-dimWhite text-[12px] font-poppins'>{job.department}</span>
            </div>
            <h2 id='job-detail-title' className='font-poppins font-bold text-white text-[26px] sm:text-[30px] mb-2'>{job.title}</h2>
            <p className='font-poppins text-dimWhite/75 text-[14px] mb-6'>{job.location} · {job.experience}{job.duration ? ` · ${job.duration}` : ''}</p>
            <p className='font-poppins text-dimWhite text-[15px] leading-relaxed mb-6'>{job.description}</p>

            <div className='grid sm:grid-cols-2 gap-6 mb-6'>
              <div>
                <h3 className='font-poppins text-secondary text-[12px] uppercase tracking-[0.16em] mb-3'>Responsibilities</h3>
                <ul className='space-y-2' role='list'>
                  {job.responsibilities?.map((item) => (
                    <li key={item} className='font-poppins text-dimWhite text-[14px] leading-relaxed pl-4 relative before:content-[""] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-secondary/70'>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='font-poppins text-secondary text-[12px] uppercase tracking-[0.16em] mb-3'>Required Skills</h3>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {job.requiredSkills?.map((skill) => (
                    <span key={skill} className='px-3 py-1 rounded-full bg-primary border border-white/10 text-[12px] font-poppins text-dimWhite'>{skill}</span>
                  ))}
                </div>
                <h3 className='font-poppins text-secondary text-[12px] uppercase tracking-[0.16em] mb-3'>Preferred Skills</h3>
                <div className='flex flex-wrap gap-2'>
                  {job.preferredSkills?.map((skill) => (
                    <span key={skill} className='px-3 py-1 rounded-full bg-white/5 text-[12px] font-poppins text-dimWhite'>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='font-poppins text-secondary text-[12px] uppercase tracking-[0.16em] mb-3'>Technology Stack</h3>
              <div className='flex flex-wrap gap-2'>
                {job.stack?.map((item) => (
                  <span key={item} className='px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-poppins'>{item}</span>
                ))}
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <button type='button' onClick={() => onApply(job)} className='hero-cta-primary inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-[11px] font-poppins font-medium text-[15px] text-primary'>
                Apply Now <span aria-hidden='true'>→</span>
              </button>
              <button type='button' onClick={onClose} className='inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-[11px] font-poppins font-medium text-[15px] text-white border border-white/15'>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default JobDetailModal
