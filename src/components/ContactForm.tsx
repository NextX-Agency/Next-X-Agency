'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { findService, serviceCategories, serviceLabel } from '@/content/services'
import { site, whatsappHref } from '@/content/site'
import { Arrow } from '@/components/Arrow'
import { cn } from '@/lib/utils'

const OTHER = 'Iets anders'

const budgets = ['Minder dan $50', '$50 – $150', '$150 – $300', '$300 – $500', 'Meer dan $500', 'Weet ik nog niet']

type Values = {
  name: string
  email: string
  phone: string
  service_type: string
  budget: string
  message: string
}

type Errors = Partial<Record<keyof Values, string>>

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Vul uw naam in.'
  if (!values.email.trim()) errors.email = 'Vul uw e-mailadres in.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Dit e-mailadres klopt niet helemaal.'
  if (!values.service_type) errors.service_type = 'Kies waar het om gaat.'
  if (values.message.trim().length < 10) errors.message = 'Vertel in een paar zinnen wat u nodig hebt.'
  return errors
}

const order: (keyof Values)[] = ['name', 'email', 'phone', 'service_type', 'budget', 'message']

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: keyof Values
  label: string
  optional?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="meta flex justify-between text-fg">
        {label}
        {optional && <span className="text-fg-3">Optioneel</span>}
      </label>
      {children}
      <p id={`${id}-error`} className={cn('mt-2 text-sm text-danger', !error && 'sr-only')} aria-live="polite">
        {error}
      </p>
    </div>
  )
}

export function ContactForm() {
  const params = useSearchParams()
  const preset = findService(params.get('dienst') ?? '')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    phone: '',
    service_type: preset ? serviceLabel(preset, preset.category) : '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  // The form collapses on success; bring the confirmation into view.
  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus()
  }, [status])

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    // After a first submit attempt, errors clear as soon as a field is fixed.
    if (touched) setErrors(validate(next))
  }

  const describe = (id: keyof Values) => ({
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': `${id}-error`,
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const found = validate(values)
    setErrors(found)
    const first = order.find((key) => found[key])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div ref={doneRef} tabIndex={-1} className="scroll-mt-28 border-t border-line-strong pt-8 outline-none" role="status">
        <p className="meta mb-5 text-ok">Verstuurd</p>
        <p className="t-h2 max-w-[16ch]">Bedankt, {values.name.split(' ')[0]}.</p>
        <p className="t-body mt-5 max-w-[40ch]">
          We reageren binnen {site.responseTime} op {values.email}. U krijgt ook een bevestiging per e-mail.
        </p>
        <button
          type="button"
          className="link-arrow link-line mt-8 py-1"
          onClick={() => {
            setValues({ name: '', email: '', phone: '', service_type: '', budget: '', message: '' })
            setTouched(false)
            setStatus('idle')
          }}
        >
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8">
        <Field id="name" label="Naam" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className="field" value={values.name} onChange={update} {...describe('name')} />
        </Field>
        <Field id="email" label="E-mail" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className="field" value={values.email} onChange={update} {...describe('email')} />
        </Field>
        <Field id="service_type" label="Waar gaat het om?" error={errors.service_type}>
          <select id="service_type" name="service_type" className="field" value={values.service_type} onChange={update} {...describe('service_type')}>
            <option value="">Kies een dienst</option>
            {serviceCategories.map((category) => (
              <optgroup key={category.id} label={category.title}>
                {category.services.map((service) => (
                  <option key={service.id} value={serviceLabel(service, category)}>
                    {service.name}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={OTHER}>{OTHER}</option>
          </select>
        </Field>
        <Field id="phone" label="Telefoon of WhatsApp" optional>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" value={values.phone} onChange={update} />
        </Field>
      </div>

      <Field id="budget" label="Budget" optional>
        <select id="budget" name="budget" className="field" value={values.budget} onChange={update}>
          <option value="">Geen voorkeur</option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Uw project" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="field"
          placeholder="Wat voor bedrijf heeft u, en wat moet er gemaakt worden?"
          value={values.message}
          onChange={update}
          {...describe('message')}
        />
      </Field>

      {status === 'failed' && (
        <p role="alert" className="border-l-2 border-danger pl-4 text-[0.9375rem]">
          Het versturen is mislukt. Probeer het opnieuw of stuur ons een{' '}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="underline">
            WhatsApp-bericht
          </a>
          .
        </p>
      )}

      <div>
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Versturen…' : 'Verstuur'}
          {status !== 'sending' && <Arrow />}
        </button>
      </div>
    </form>
  )
}
