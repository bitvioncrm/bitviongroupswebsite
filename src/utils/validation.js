import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Valid business email required'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  projectType: z.string().min(1, 'Project type is required'),
  budgetRange: z.string().optional(),
  message: z.string().min(10, 'Please provide a brief message'),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Privacy consent is required' }) }),
})

export const proposalSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Valid business email required'),
  country: z.string().min(1, 'Country is required'),
  projectType: z.string().min(1, 'Project type is required'),
  estimatedBudget: z.string().optional(),
  timeline: z.string().optional(),
  requirements: z.string().min(20, 'Please describe your requirements'),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Privacy consent is required' }) }),
})

export const demoSchema = z.object({
  product: z.string().min(1, 'Product selection is required'),
  company: z.string().min(2, 'Company name is required'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Privacy consent is required' }) }),
})

export const careersSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  role: z.string().optional(),
  message: z.string().min(10, 'Please tell us about yourself'),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Privacy consent is required' }) }),
})

export const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  name: z.string().optional(),
  age: z.coerce.number().min(16, 'Valid age is required').max(80, 'Valid age is required'),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Phone number is required'),
  currentLocation: z.string().optional(),
  position: z.string().min(2, 'Position is required'),
  employmentType: z.string().optional(),
  preferredLocation: z.string().optional(),
  qualification: z.string().optional(),
  college: z.string().optional(),
  graduationYear: z.string().optional(),
  experience: z.string().optional(),
  skills: z.string().optional(),
  currentRole: z.string().optional(),
  noticePeriod: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(),
  referredBy: z.string().optional(),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Privacy consent is required' }) }),
})

export const validateForm = (schema, data) => {
  const result = schema.safeParse(data)
  if (result.success) return { success: true, data: result.data, errors: {} }

  const errors = {}
  result.error.issues.forEach((issue) => {
    const key = issue.path[0]
    if (key && !errors[key]) errors[key] = issue.message
  })
  return { success: false, errors }
}
