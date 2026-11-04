import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../forms/FormField'
import { applicationSchema, validateForm } from '../../utils/validation'
import { submitApplication } from '../../utils/api'
import { formatBytes } from '../../utils/format'
import { trackEvent } from '../../utils/analytics'

const locationOptions = [
  { value: '', label: 'Select preferred location' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Bengaluru', label: 'Bengaluru' },
  { value: 'Remote', label: 'Remote' },
]

const genderOptions = [
  { value: '', label: 'Prefer not to say' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Other', label: 'Other' },
]

const ApplicationForm = ({ selectedJob, onBack }) => {
  const cvInputRef = useRef(null)
  const submittingRef = useRef(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    currentLocation: '',
    position: selectedJob?.title || '',
    employmentType: selectedJob?.type || '',
    preferredLocation: '',
    qualification: '',
    college: '',
    graduationYear: '',
    experience: '',
    skills: '',
    currentRole: '',
    noticePeriod: '',
    linkedin: '',
    github: '',
    portfolio: '',
    message: '',
    website: '',
    privacyConsent: false,
  })
  const [cvFile, setCvFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [applicationId, setApplicationId] = useState('')

  useEffect(() => {
    if (selectedJob) {
      setForm((prev) => ({
        ...prev,
        position: selectedJob.title,
        employmentType: selectedJob.type,
      }))
    }
  }, [selectedJob])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleCvChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCvFile(file)
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: undefined }))
  }

  const removeCv = () => {
    setCvFile(null)
    if (cvInputRef.current) cvInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current) return

    setServerError('')
    const payload = {
      ...form,
      name: `${form.firstName} ${form.lastName}`.trim(),
      jobSlug: selectedJob?.slug,
      privacyConsent: form.privacyConsent || undefined,
    }
    const validation = validateForm(applicationSchema, payload)
    if (!validation.success) {
      setErrors(validation.errors)
      return
    }
    if (!cvFile) {
      setErrors({ cv: 'CV upload is required' })
      return
    }

    submittingRef.current = true
    setStatus('loading')
    trackEvent('careers_apply')

    try {
      const result = await submitApplication(validation.data, cvFile)
      setApplicationId(result.applicationId)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setServerError(err.message || "We couldn't complete your application submission. Please try again.")
    } finally {
      submittingRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className='careers-glass-card p-8 sm:p-10 rounded-[20px] border border-secondary/20 text-center' role='status'>
        <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/15 text-secondary text-[28px] mb-5' aria-hidden='true'>✓</div>
        <h3 className='font-poppins font-semibold text-white text-[28px] mb-3'>Application Received</h3>
        <p className='font-poppins text-dimWhite text-[16px] mb-2'>Thank you, {form.firstName} {form.lastName}.</p>
        <p className='font-poppins text-white text-[16px] mb-2'>Application submitted successfully.</p>
        <p className='font-poppins text-dimWhite text-[16px] mb-6'>
          Your application for <span className='text-white'>{form.position}</span> has been successfully submitted.
        </p>
        <div className='inline-block px-5 py-3 rounded-[12px] bg-secondary/10 border border-secondary/20 mb-8'>
          <p className='font-poppins text-[12px] uppercase tracking-[0.14em] text-dimWhite/70'>Your application ID</p>
          <p className='font-poppins text-secondary text-[18px] font-semibold mt-1'>{applicationId}</p>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button type='button' onClick={onBack} className='hero-cta-primary inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-[10px] font-poppins text-[15px] text-primary'>
            Back to Careers <span aria-hidden='true'>→</span>
          </button>
          <a href='#open-positions' onClick={onBack} className='inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-[10px] font-poppins text-[15px] text-white border border-white/15'>
            View Open Positions <span aria-hidden='true'>→</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='careers-glass-card p-6 sm:p-8 rounded-[20px] border border-white/10 flex flex-col gap-6' noValidate>
      <div>
        <span className='font-poppins text-secondary text-[12px] uppercase tracking-[0.18em]'>Apply to Bitvion</span>
        <h2 className='font-poppins font-bold text-white text-[26px] sm:text-[30px] mt-2'>Application Form</h2>
        <div className='mt-4 p-4 rounded-[12px] bg-primary/80 border border-secondary/15'>
          <p className='font-poppins text-[12px] uppercase tracking-[0.14em] text-dimWhite/70'>Applying for</p>
          <p className='font-poppins text-white text-[18px] font-medium mt-1'>{form.position || 'Select a role from open positions'}</p>
          {form.employmentType && (
            <p className='font-poppins text-dimWhite text-[14px] mt-1'>{form.employmentType}</p>
          )}
        </div>
      </div>

      <div className='absolute -left-[9999px] h-0 w-0 overflow-hidden' aria-hidden='true'>
        <label htmlFor='application-website'>Website</label>
        <input id='application-website' type='text' name='website' tabIndex={-1} autoComplete='off' value={form.website} onChange={handleChange} />
      </div>

      <fieldset className='border-0 p-0 m-0 flex flex-col gap-5'>
        <legend className='font-poppins text-white text-[16px] font-semibold mb-1'>Personal Information</legend>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <FormField label='First Name' name='firstName' value={form.firstName} onChange={handleChange} error={errors.firstName} required />
          <FormField label='Last Name' name='lastName' value={form.lastName} onChange={handleChange} error={errors.lastName} required />
          <FormField label='Age' name='age' type='number' value={form.age} onChange={handleChange} error={errors.age} required />
          <FormField label='Gender' name='gender' value={form.gender} onChange={handleChange} error={errors.gender} options={genderOptions} required />
          <FormField label='Email Address' name='email' type='email' value={form.email} onChange={handleChange} error={errors.email} required autoComplete='email' />
          <FormField label='Phone Number' name='phone' type='tel' value={form.phone} onChange={handleChange} error={errors.phone} required autoComplete='tel' />
          <FormField label='Current Location' name='currentLocation' value={form.currentLocation} onChange={handleChange} error={errors.currentLocation} />
        </div>
      </fieldset>

      <fieldset className='border-0 p-0 m-0 flex flex-col gap-5'>
        <legend className='font-poppins text-white text-[16px] font-semibold mb-1'>Application</legend>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <FormField label='Position Applying For' name='position' value={form.position} onChange={() => {}} error={errors.position} required readOnly />
          <FormField label='Employment Type' name='employmentType' value={form.employmentType} onChange={() => {}} readOnly />
          <FormField label='Preferred Work Location' name='preferredLocation' value={form.preferredLocation} onChange={handleChange} error={errors.preferredLocation} options={locationOptions} />
        </div>
      </fieldset>

      <fieldset className='border-0 p-0 m-0 flex flex-col gap-5'>
        <legend className='font-poppins text-white text-[16px] font-semibold mb-1'>Education</legend>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <FormField label='Highest Qualification' name='qualification' value={form.qualification} onChange={handleChange} error={errors.qualification} />
          <FormField label='College / University' name='college' value={form.college} onChange={handleChange} error={errors.college} />
          <FormField label='Graduation Year' name='graduationYear' value={form.graduationYear} onChange={handleChange} error={errors.graduationYear} />
        </div>
      </fieldset>

      <fieldset className='border-0 p-0 m-0 flex flex-col gap-5'>
        <legend className='font-poppins text-white text-[16px] font-semibold mb-1'>Professional</legend>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <FormField label='Years of Experience' name='experience' value={form.experience} onChange={handleChange} error={errors.experience} />
          <FormField label='Primary Skills' name='skills' value={form.skills} onChange={handleChange} error={errors.skills} />
          <FormField label='Current / Previous Role' name='currentRole' value={form.currentRole} onChange={handleChange} error={errors.currentRole} />
          <FormField label='Notice Period' name='noticePeriod' value={form.noticePeriod} onChange={handleChange} error={errors.noticePeriod} />
        </div>
      </fieldset>

      <fieldset className='border-0 p-0 m-0 flex flex-col gap-5'>
        <legend className='font-poppins text-white text-[16px] font-semibold mb-1'>Professional Links</legend>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <FormField label='LinkedIn' name='linkedin' value={form.linkedin} onChange={handleChange} error={errors.linkedin} />
          <FormField label='GitHub' name='github' value={form.github} onChange={handleChange} error={errors.github} />
          <FormField label='Portfolio / Website' name='portfolio' value={form.portfolio} onChange={handleChange} error={errors.portfolio} />
        </div>
      </fieldset>

      <div className='flex flex-col gap-3'>
        <label htmlFor='cv-upload' className='font-poppins text-[14px] text-dimWhite'>
          Upload CV / Resume <span className='text-secondary' aria-hidden='true'>*</span>
        </label>
        <input
          ref={cvInputRef}
          id='cv-upload'
          name='cv'
          type='file'
          accept='.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          onChange={handleCvChange}
          className='sr-only'
        />
        {!cvFile ? (
          <button
            type='button'
            onClick={() => cvInputRef.current?.click()}
            className='min-h-[52px] px-5 rounded-[10px] border border-dashed border-secondary/35 bg-primary/60 font-poppins text-[15px] text-white hover:border-secondary/60 transition-colors'
          >
            Choose File (PDF, DOC, DOCX · Max 10 MB)
          </button>
        ) : (
          <div className='p-4 rounded-[12px] bg-primary border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <div>
              <p className='font-poppins text-white text-[14px]'>{cvFile.name}</p>
              <p className='font-poppins text-dimWhite/70 text-[13px] mt-1'>{formatBytes(cvFile.size)} · Ready to upload</p>
            </div>
            <div className='flex gap-2'>
              <button type='button' onClick={() => cvInputRef.current?.click()} className='min-h-[44px] px-4 rounded-[10px] border border-white/15 font-poppins text-[14px] text-white'>Replace</button>
              <button type='button' onClick={removeCv} className='min-h-[44px] px-4 rounded-[10px] border border-red-400/30 font-poppins text-[14px] text-red-300'>Remove</button>
            </div>
          </div>
        )}
        {errors.cv && <p className='font-poppins text-[13px] text-red-400' role='alert'>{errors.cv}</p>}
      </div>

      <FormField label='Cover Letter / Message' name='message' value={form.message} onChange={handleChange} error={errors.message} rows={5} placeholder='Optional message for the Bitvion recruitment team' />

      <label className='flex items-start gap-3 cursor-pointer'>
        <input type='checkbox' name='privacyConsent' checked={form.privacyConsent} onChange={handleChange} className='mt-1 accent-secondary min-w-[18px] min-h-[18px]' />
        <span className='font-poppins text-dimWhite text-[14px] leading-relaxed'>
          I consent to BITVION Technologies storing and processing the information provided for recruitment purposes. See our{' '}
          <Link to='/privacy-policy' className='text-secondary hover:underline'>Privacy Policy</Link>.
        </span>
      </label>
      {errors.privacyConsent && <p className='font-poppins text-[13px] text-red-400' role='alert'>{errors.privacyConsent}</p>}
      {serverError && <p className='font-poppins text-[14px] text-red-400' role='alert'>{serverError}</p>}

      <button
        type='submit'
        disabled={status === 'loading'}
        className={`hero-cta-primary inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-[11px] font-poppins font-medium text-[15px] text-primary w-full sm:w-auto ${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
      >
        {status === 'loading' ? 'Submitting Application...' : 'Submit Application →'}
      </button>
    </form>
  )
}

export default ApplicationForm
