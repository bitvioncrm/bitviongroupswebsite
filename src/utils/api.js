const RECIPIENTS = {
  contact: 'info@bitvion.in',
  proposal: 'business@bitvion.in',
  demo: 'business@bitvion.in',
  careers: 'hr@bitvion.in',
}

const SUBJECTS = {
  contact: 'Contact Form — Bitvion Website',
  proposal: 'Proposal Request — Bitvion Website',
  demo: 'Demo Request — Bitvion Website',
  careers: 'Careers Application — Bitvion Website',
}

const publicFields = (data) =>
  Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        key !== 'privacyConsent' &&
        key !== 'website' &&
        value !== undefined &&
        value !== false &&
        value !== '',
    ),
  )

const formatBody = (data) =>
  Object.entries(publicFields(data))
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

const sendViaApi = async (endpoint, data) => {
  const response = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, website: undefined }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.error || result.message || 'Submission failed. Please try again.')
  }

  return result
}

const sendViaFormSubmit = async (to, subject, data) => {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _replyto: data.email || '',
      ...publicFields(data),
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok || result.success === false || result.success === 'false') {
    throw new Error(result.message || 'Unable to deliver email.')
  }

  return result
}

const sendViaMailto = (to, subject, data) => {
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatBody(data))}`
  window.location.href = href
}

export const submitApplication = async (data, cvFile) => {
  if (data.website) return { success: true, applicationId: 'BIT-APP-RECEIVED' }

  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value))
    }
  })
  formData.append('privacyConsent', 'true')
  if (data.jobSlug || data.position) formData.append('jobSlug', data.jobSlug || '')
  formData.append('resume', cvFile)
  formData.append('cv', cvFile)

  const endpoints = ['/api/public/applications', '/api/submit-application']
  let lastError = "We couldn't complete your application submission. Please try again."

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { method: 'POST', body: formData })
      const result = await response.json().catch(() => ({}))
      if (response.ok && (result.success || result.applicationId)) {
        return result
      }
      if (response.status === 409) {
        throw new Error(result.message || result.error || 'This candidate has already applied for this position.')
      }
      if (response.status >= 400 && response.status < 500) {
        throw new Error(result.message || result.error || lastError)
      }
      lastError = result.error || result.message || lastError
    } catch (err) {
      if (err.message?.includes('already applied') || err.message?.includes('Consent') || err.message?.includes('required')) {
        throw err
      }
      lastError = err.message || lastError
    }
  }

  throw new Error(lastError)
}

export const submitForm = async (endpoint, data) => {
  const to = RECIPIENTS[endpoint] || 'info@bitvion.in'
  const subject = SUBJECTS[endpoint] || 'Website Request — Bitvion Technologies'

  if (data.website) {
    return { success: true, via: 'honeypot' }
  }

  try {
    const result = await sendViaApi(endpoint, data)
    if (result.success && result.mocked === false) {
      return { success: true, via: 'smtp' }
    }
  } catch {
    // API may be offline in local/dev — continue to direct email.
  }

  try {
    await sendViaFormSubmit(to, subject, data)
    return { success: true, via: 'email' }
  } catch {
    sendViaMailto(to, subject, data)
    return { success: true, via: 'mailto' }
  }
}
