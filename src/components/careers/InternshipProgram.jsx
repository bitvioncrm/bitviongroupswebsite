import React from 'react'
import AnimateIn, { StaggerContainer, StaggerItem } from '../AnimateIn'
import { internshipRoles } from '../../data/careers'

const InternshipProgram = ({ onApply, jobs }) => {
  const roles = jobs ?? internshipRoles
  return (
  <section id='internship-program' className='py-14 sm:py-16 scroll-mt-28' aria-labelledby='internship-heading'>
    <AnimateIn>
      <span className='font-poppins text-secondary text-[12px] uppercase tracking-[0.2em] mb-3 block'>Bitvion Internship Program</span>
      <h2 id='internship-heading' className='font-poppins font-bold text-white text-[28px] sm:text-[34px] tracking-[-0.02em] mb-3'>
        START BUILDING. <span className='text-gradient'>START LEARNING.</span>
      </h2>
      <p className='font-poppins text-dimWhite text-[15px] max-w-[720px] mb-8'>
        Gain practical experience by contributing to software, AI and digital technology projects.
        Internship participation does not guarantee future employment.
      </p>
    </AnimateIn>

    <StaggerContainer className='grid grid-cols-1 lg:grid-cols-2 gap-5' stagger={0.08}>
      {roles.map((job) => (
        <StaggerItem key={job.slug || job.id}>
          <article className='careers-glass-card h-full p-6 sm:p-7 rounded-[18px] border border-white/8 hover:border-secondary/25 transition-colors duration-300'>
            <div className='flex flex-wrap items-center gap-2 mb-4'>
              <span className='px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-poppins'>{job.type}</span>
              <span className='px-3 py-1 rounded-full bg-dimBlue text-dimWhite text-[12px] font-poppins'>{job.department}</span>
              <span className='px-3 py-1 rounded-full bg-white/5 text-dimWhite text-[12px] font-poppins'>{job.duration}</span>
            </div>
            <h3 className='font-poppins font-semibold text-white text-[20px] mb-2'>{job.title}</h3>
            <p className='font-poppins text-dimWhite/70 text-[13px] mb-3'>{job.location}</p>
            <p className='font-poppins text-dimWhite text-[15px] leading-[26px] mb-5'>{job.description}</p>
            <div className='flex flex-wrap gap-2 mb-6'>
              {job.skills?.slice(0, 6).map((skill) => (
                <span key={skill} className='px-3 py-1 rounded-full bg-primary border border-white/10 text-[12px] font-poppins text-dimWhite'>{skill}</span>
              ))}
            </div>
            <button type='button' onClick={() => onApply(job)} className='hero-cta-primary inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-[10px] font-poppins text-[14px] text-primary w-full sm:w-auto'>
              Apply for Internship <span aria-hidden='true'>→</span>
            </button>
          </article>
        </StaggerItem>
      ))}
    </StaggerContainer>
  </section>
  )
}

export default InternshipProgram
