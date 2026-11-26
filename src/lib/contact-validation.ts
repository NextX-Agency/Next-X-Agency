import { findService } from '@/content/services'
import { disciplines } from '@/content/disciplines'

export const contactLimits = {
  name: 100,
  email: 254,
  phone: 40,
  service_type: 150,
  budget: 80,
  message: 5000,
} as const
export const contactBudgets = [
  'Less than $150',
  '$150 – $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000 – $10,000',
  'More than $10,000',
  'Not sure yet',
]
export type ContactValues = Record<keyof typeof contactLimits, string>
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const key of Object.keys(contactLimits) as (keyof ContactValues)[]) {
    if (values[key].length > contactLimits[key])
      errors[key] = `Use at most ${contactLimits[key]} characters.`
    else if (key !== 'message' && /\p{Cc}/u.test(values[key]))
      errors[key] = 'Please check this value.'
  }
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (
    !findService(values.service_type) &&
    !disciplines.some(
      (discipline) => discipline.name === values.service_type,
    ) &&
    values.service_type !== 'Something else'
  )
    errors.service_type = 'Please choose what it is about.'
  if (values.message.trim().length < 10)
    errors.message = 'Tell us in a few sentences what you need.'
  if (values.phone && !/^[+\d\s().-]+$/.test(values.phone))
    errors.phone = 'Please enter a valid phone number.'
  return errors
}
