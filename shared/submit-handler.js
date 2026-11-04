import { Resend } from 'resend'
import {
  buildApplicationId,
  validateApplication,
  validateCvFile,
} from '../shared/application.js'
import {
  buildCandidateEmailHtml,
  buildRecruitmentEmailHtml,
  buildRecruitmentEmailText,
} from '../shared/email-templates.js'

const rateMap = new Map()

export const checkRateLimit = (key, max = 8, windowMs = 15 * 60 * 1000) => {
  const now = Date.now()
  const entry = rateMap.get(key) || { count: 0, reset: now + windowMs }
  if (now > entry.reset) {
    entry.count = 0
    entry.reset = now + windowMs
  }
  entry.count += 1
  rateMap.set(key, entry)
  return entry.count <= max
}

const getCounterStore = async () => {
  try {
    const { getStore } = await import('@netlify/blobs')
    return getStore('bitvion-applications')
  } catch {
    return null
  }
}

let localCounter = 0

const tryBitvionOs = async ({ fields, cvFile }) => {
  const base = process.env.OS_API_URL
  if (!base) return null
  try {
    const form = new FormData()
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined && value !== null && value !== '') form.append(key, String(value))
    }
    if (cvFile?.buffer) {
      const blob = new Blob([cvFile.buffer], { type: cvFile.mimetype || 'application/octet-stream' })
      form.append('resume', blob, cvFile.filename || 'resume.pdf')
      form.append('cv', blob, cvFile.filename || 'resume.pdf')
    }
    const response = await fetch(`${base.replace(/\/$/, '')}/api/public/applications`, {
      method: 'POST',
      body: form,
    })
    const body = await response.json().catch(() => ({}))
    if (response.ok || (response.status >= 400 && response.status < 500)) {
      return { status: response.status, body: { success: Boolean(body.success ?? response.ok), ...body } }
    }
    return null
  } catch (err) {
    console.error('[os-recruitment-api]', err.message)
    return null
  }
}

export const nextApplicationId = async () => {
  const year = new Date().getFullYear()
  const counterKey = `counter-${year}`

  const store = await getCounterStore()
  if (store) {
    const current = Number(await store.get(counterKey, { type: 'text' })) || 0
    const next = current + 1
    await store.set(counterKey, String(next))
    return buildApplicationId(next)
  }

  localCounter += 1
  return buildApplicationId(localCounter)
}

export const persistApplication = async (record) => {
  const store = await getCounterStore()
  if (!store) {
    console.log('[application-store]', JSON.stringify(record))
    return
  }
  await store.set(`applications/${record.applicationId}.json`, JSON.stringify(record))
}

export const processApplicationSubmission = async ({ fields, cvFile, clientIp }) => {
  if (fields.website) {
    return { status: 200, body: { success: true, applicationId: 'BIT-APP-RECEIVED' } }
  }

  if (!fields.name && (fields.firstName || fields.lastName)) {
    fields.name = `${fields.firstName || ''} ${fields.lastName || ''}`.trim()
  }

  if (!checkRateLimit(clientIp || 'unknown')) {
    return { status: 429, body: { error: 'Too many submissions. Please try again later.' } }
  }

  const osResult = await tryBitvionOs({ fields, cvFile })
  if (osResult) return osResult


  const validation = validateApplication(fields)
  if (!validation.valid) {
    return { status: 400, body: { error: 'Validation failed', details: validation.errors } }
  }

  if (!validation.data.privacyConsent) {
    return { status: 400, body: { error: 'Privacy consent is required.' } }
  }

  const cvValidation = validateCvFile(cvFile)
  if (!cvValidation.valid) {
    return { status: 400, body: { error: cvValidation.message } }
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    return {
      status: 503,
      body: { error: "We couldn't complete your application submission. Please try again." },
    }
  }

  const recruitmentEmail = process.env.RECRUITMENT_EMAIL || 'info@bitvion.in'
  const mailFrom = process.env.MAIL_FROM || 'Bitvion Technologies <careers@bitvion.in>'
  const applicationId = await nextApplicationId()
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const data = validation.data

  const attachmentName =
    cvValidation.filename.endsWith(cvValidation.ext)
      ? cvValidation.filename
      : `${data.name.replace(/[^a-zA-Z0-9]+/g, '_')}_Resume${cvValidation.ext}`

  const resend = new Resend(resendKey)

  const recruitmentResult = await resend.emails.send({
    from: mailFrom,
    to: recruitmentEmail,
    replyTo: data.email,
    subject: `New Job Application — ${data.position} — ${data.name}`,
    html: buildRecruitmentEmailHtml({ applicationId, data, submittedAt }),
    text: buildRecruitmentEmailText({ applicationId, data, submittedAt }),
    attachments: [
      {
        filename: attachmentName,
        content: cvFile.buffer,
      },
    ],
  })

  if (recruitmentResult.error) {
    console.error('[recruitment-email]', recruitmentResult.error)
    return {
      status: 503,
      body: { error: "We couldn't complete your application submission. Please try again." },
    }
  }

  const candidateResult = await resend.emails.send({
    from: mailFrom,
    to: data.email,
    subject: 'Application Received — Bitvion Technologies',
    html: buildCandidateEmailHtml({ applicationId, data }),
    text: [
      `Hello ${data.name},`,
      '',
      'Thank you for applying to Bitvion Technologies.',
      '',
      `We have successfully received your application for: ${data.position}`,
      '',
      `Application Reference: ${applicationId}`,
      '',
      'Your application and CV have been received successfully. Our team will review the information submitted.',
      '',
      'Regards,',
      'Bitvion Technologies',
      'info@bitvion.in',
      'https://bitvion.in',
    ].join('\n'),
  })

  if (candidateResult.error) {
    console.error('[candidate-email]', candidateResult.error)
    return {
      status: 503,
      body: { error: "We couldn't complete your application submission. Please try again." },
    }
  }

  await persistApplication({
    applicationId,
    ...data,
    cvFilename: attachmentName,
    submittedAt,
    status: 'SUBMITTED',
    clientIp: clientIp || null,
  })

  return {
    status: 200,
    body: {
      success: true,
      applicationId,
      message: 'Application submitted successfully.',
    },
  }
}
