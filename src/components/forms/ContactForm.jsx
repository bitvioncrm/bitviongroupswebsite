import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from './FormField'
import CTAButton from '../CTAButton'
import { contactSchema, validateForm } from '../../utils/validation'
import { submitForm } from '../../utils/api'
import { trackEvent } from '../../utils/analytics'

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'ai', label: 'AI' },
  { value: 'software', label: 'Software Development' },
  { value: 'automation', label: 'Automation' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'transformation', label: 'Digital Transformation' },
  { value: 'erp', label: 'ERP' },
  { value: 'other', label: 'Other' },
]

const budgetRanges = [
  { value: '', label: 'Select budget range (optional)' },
  { value: 'under-5k', label: 'Under ₹25,000' },
  { value: '5k-15k', label: '₹25,000 – ₹1,00,000' },
  { value: '15k-50k', label: '₹1,00,000 – ₹5,00,000' },
  { value: '50k-plus', label: '₹5,00,000+' },
  { value: 'undecided', label: 'Not yet determined' },
]

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', country: '',
    projectType: '', budgetRange: '', message: '', website: '', privacyConsent: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const payload = { ...form, privacyConsent: form.privacyConsent || undefined }
    const validation = validateForm(contactSchema, payload)
    if (!validation.success) {
      setErrors(validation.errors)
      return
    }

    setStatus('loading')
    trackEvent('contact_form_submit', { project_type: form.projectType })

    try {
      await submitForm('contact', validation.data)
      setStatus('success')
      trackEvent('contact_form_submit', { status: 'success' })
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div className='p-8 rounded-[20px] bg-black-gradient border border-secondary/20 text-center' role='status'>
        <h3 className='font-poppins font-semibold text-white text-[24px] mb-3'>Message Received</h3>
        <p className='font-poppins text-dimWhite text-[16px]'>
          Thank you for contacting Bitvion Technologies. We will respond to your inquiry shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='relative flex flex-col gap-5' noValidate onFocus={() => trackEvent('contact_form_start')}>
      <div className='absolute -left-[9999px] h-0 w-0 overflow-hidden' aria-hidden='true'>
        <label htmlFor='contact-website'>Website</label>
        <input id='contact-website' type='text' name='website' tabIndex={-1} autoComplete='off' value={form.website} onChange={handleChange} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <FormField label='Name' name='name' value={form.name} onChange={handleChange} error={errors.name} required autoComplete='name' />
        <FormField label='Company' name='company' value={form.company} onChange={handleChange} error={errors.company} autoComplete='organization' />
        <FormField label='Business Email' name='email' type='email' value={form.email} onChange={handleChange} error={errors.email} required autoComplete='email' />
        <FormField label='Phone' name='phone' type='tel' value={form.phone} onChange={handleChange} error={errors.phone} autoComplete='tel' />
        <FormField label='Country' name='country' value={form.country} onChange={handleChange} error={errors.country} required autoComplete='country-name' />
        <FormField label='Project Type' name='projectType' value={form.projectType} onChange={handleChange} error={errors.projectType} required options={projectTypes} />
        <FormField label='Budget Range' name='budgetRange' value={form.budgetRange} onChange={handleChange} options={budgetRanges} />
      </div>
      <FormField label='Message' name='message' value={form.message} onChange={handleChange} error={errors.message} required rows={5} placeholder='Tell us about your project or challenge' />

      <label className='flex items-start gap-3 cursor-pointer'>
        <input type='checkbox' name='privacyConsent' checked={form.privacyConsent} onChange={handleChange} className='mt-1 accent-secondary' />
        <span className='font-poppins text-dimWhite text-[14px]'>
          I agree to the <Link to='/privacy-policy' className='text-secondary hover:underline'>Privacy Policy</Link> and consent to Bitvion processing my information.
        </span>
      </label>
      {errors.privacyConsent && <p className='font-poppins text-[13px] text-red-400' role='alert'>{errors.privacyConsent}</p>}

      {serverError && <p className='font-poppins text-[14px] text-red-400' role='alert'>{serverError}</p>}

      <CTAButton type='submit' variant='primary' styles={`w-full sm:w-auto text-center ${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </CTAButton>
    </form>
  )
}

export default ContactForm
