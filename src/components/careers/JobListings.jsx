import React, { useMemo, useState } from 'react'
import AnimateIn, { StaggerContainer, StaggerItem } from '../AnimateIn'
import { filterOptions, jobOpenings } from '../../data/careers'

const emptyFilters = {
  search: '',
  department: '',
  employmentType: '',
  location: '',
  experience: '',
}

const JobCard = ({ job, onViewRole, onApply }) => (
  <article className='careers-glass-card h-full p-6 sm:p-7 rounded-[18px] border border-white/8 hover:border-secondary/25 transition-all duration-300 feature-card'>
    <div className='flex flex-wrap items-center gap-2 mb-4'>
      <span className='px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[12px] font-poppins font-medium'>{job.type}</span>
      <span className='px-3 py-1 rounded-full bg-dimBlue text-dimWhite text-[12px] font-poppins'>{job.department}</span>
      {job.duration && (
        <span className='px-3 py-1 rounded-full bg-white/5 text-dimWhite text-[12px] font-poppins'>{job.duration}</span>
      )}
    </div>
    <h3 className='font-poppins font-semibold text-white text-[20px] mb-2'>{job.title}</h3>
    <p className='font-poppins text-dimWhite/70 text-[13px] mb-3'>{job.location}</p>
    <p className='font-poppins text-dimWhite text-[15px] leading-[26px] mb-5'>{job.description}</p>
    <div className='flex flex-wrap gap-2 mb-6'>
      {job.skills?.slice(0, 6).map((skill) => (
        <span key={skill} className='px-3 py-1 rounded-full bg-primary border border-white/10 text-[12px] font-poppins text-dimWhite'>
          {skill}
        </span>
      ))}
    </div>
    <div className='flex flex-col sm:flex-row gap-3'>
      <button type='button' onClick={() => onViewRole(job)} className='inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-[10px] font-poppins text-[14px] text-white border border-white/15 hover:border-secondary/40 transition-colors'>
        View Role <span aria-hidden='true'>→</span>
      </button>
      <button type='button' onClick={() => onApply(job)} className='inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-[10px] font-poppins text-[14px] text-primary hero-cta-primary'>
        Apply Now <span aria-hidden='true'>→</span>
      </button>
    </div>
  </article>
)

const JobListings = ({ onViewRole, onApply, employmentFilter = '', jobs }) => {
  const [filters, setFilters] = useState(emptyFilters)
  const source = jobs ?? jobOpenings

  const filteredJobs = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    return source.filter((job) => {
      if (employmentFilter && job.type !== employmentFilter) return false
      if (filters.department && job.department !== filters.department) return false
      if (filters.employmentType && job.type !== filters.employmentType) return false
      if (filters.location && !job.locations.includes(filters.location)) return false
      if (filters.experience && job.experience !== filters.experience) return false
      if (!query) return true
      const haystack = [job.title, job.department, job.description, ...job.skills].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [filters, employmentFilter, source])

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  return (
    <section id='open-positions' className='py-14 sm:py-16 scroll-mt-28' aria-labelledby='open-positions-heading'>
      <AnimateIn>
        <h2 id='open-positions-heading' className='font-poppins font-bold text-white text-[28px] sm:text-[34px] tracking-[-0.02em] mb-3'>
          OPEN <span className='text-gradient'>POSITIONS</span>
        </h2>
        <p className='font-poppins text-dimWhite text-[15px] max-w-[640px] mb-8'>
          Explore current opportunities at Bitvion Technologies.
        </p>
      </AnimateIn>

      <div className='careers-glass-card p-4 sm:p-5 rounded-[16px] border border-white/8 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3'>
        <input
          type='search'
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder='Search roles...'
          aria-label='Search roles'
          className='lg:col-span-2 w-full min-h-[48px] px-4 rounded-[10px] bg-primary border border-white/10 font-poppins text-white text-[15px] focus:border-secondary/50 focus:outline-none'
        />
        {[
          ['department', 'Department', filterOptions.departments],
          ['employmentType', 'Employment Type', filterOptions.employmentTypes],
          ['location', 'Location', filterOptions.locations],
          ['experience', 'Experience', filterOptions.experienceLevels],
        ].map(([key, label, options]) => (
          <label key={key} className='flex flex-col gap-1.5'>
            <span className='font-poppins text-[12px] text-dimWhite/70 uppercase tracking-[0.12em]'>{label}</span>
            <select
              value={filters[key]}
              onChange={(e) => updateFilter(key, e.target.value)}
              className='w-full min-h-[48px] px-3 rounded-[10px] bg-primary border border-white/10 font-poppins text-white text-[14px] focus:border-secondary/50 focus:outline-none'
            >
              <option value=''>All</option>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <StaggerContainer className='grid grid-cols-1 lg:grid-cols-2 gap-5' stagger={0.08}>
        {filteredJobs.map((job) => (
          <StaggerItem key={job.slug || job.id}>
            <JobCard job={job} onViewRole={onViewRole} onApply={onApply} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filteredJobs.length === 0 && (
        <p className='font-poppins text-dimWhite text-[15px] mt-6' role='status'>
          No roles match your current filters. Try adjusting search or filters.
        </p>
      )}
    </section>
  )
}

export default JobListings
