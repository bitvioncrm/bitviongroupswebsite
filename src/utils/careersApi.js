const OS_API = import.meta.env.VITE_OS_API_URL || ''

export const osApi = (path) => `${OS_API}${path}`

export const toWebsiteJob = (job) => {
  if (!job) return null
  const typeMap = {
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    CONTRACT: 'Contract',
    INTERNSHIP: 'Internship',
    FREELANCE: 'Freelance',
  }
  return {
    id: job.slug || job.id,
    slug: job.slug,
    title: job.title,
    department: job.department || 'Engineering',
    location: job.location || (job.locations || []).join(' / '),
    locations: job.locations || [],
    type: typeMap[job.employmentType] || job.type || job.employmentType,
    experience: job.experience || 'Not specified',
    description: job.shortDescription || job.description,
    responsibilities: job.responsibilities || [],
    requiredSkills: job.requiredSkills || job.requirements || job.skills || [],
    preferredSkills: job.preferredSkills || job.preferredQualifications || [],
    skills: job.skills || [],
    duration: job.duration || job.internship?.duration,
    workMode: job.workMode,
    applicationDeadline: job.applicationDeadline,
    educationRequirements: job.educationRequirements,
    jobCode: job.jobCode,
  }
}

export const fetchPublicJobs = async () => {
  try {
    const response = await fetch(osApi('/api/public/jobs'))
    if (!response.ok) throw new Error('os_unavailable')
    const data = await response.json()
    return (data.items || []).map(toWebsiteJob)
  } catch {
    return null
  }
}

export const fetchPublicJob = async (slug) => {
  try {
    const response = await fetch(osApi(`/api/public/jobs/${encodeURIComponent(slug)}`))
    if (!response.ok) throw new Error('os_unavailable')
    return toWebsiteJob(await response.json())
  } catch {
    return null
  }
}
