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
  'Minder dan $150',
  '$150 – $500',
  '$500 – $1.500',
  '$1.500 – $5.000',
  '$5.000 – $10.000',
  'Meer dan $10.000',
  'Weet ik nog niet',
]
export type ContactValues = Record<keyof typeof contactLimits, string>
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const key of Object.keys(contactLimits) as (keyof ContactValues)[]) {
    if (values[key].length > contactLimits[key])
      errors[key] = `Gebruik maximaal ${contactLimits[key]} tekens.`
    else if (key !== 'message' && /\p{Cc}/u.test(values[key]))
      errors[key] = 'Controleer de ingevulde waarde.'
  }
  if (!values.name.trim()) errors.name = 'Vul uw naam in.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Voer een geldig e-mailadres in.'
  if (
    !findService(values.service_type) &&
    !disciplines.some(
      (discipline) => discipline.name === values.service_type,
    ) &&
    values.service_type !== 'Iets anders'
  )
    errors.service_type = 'Kies waar het om gaat.'
  if (values.message.trim().length < 10)
    errors.message = 'Vertel in een paar zinnen wat u nodig hebt.'
  if (values.phone && !/^[+\d\s().-]+$/.test(values.phone))
    errors.phone = 'Voer een geldig telefoonnummer in.'
  return errors
}
