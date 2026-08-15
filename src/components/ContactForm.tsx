'use client'

import { memo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Send, Loader2 } from 'lucide-react'
import { CONTACT } from '@/lib/contact'
import {
  matchServiceName,
  serviceOptionGroups,
  OTHER_SERVICE,
} from '@/lib/services'

const budgetOptions = [
  'Minder dan $100',
  '$100 – $250',
  '$250 – $500',
  '$500 – $900',
  'Meer dan $900',
  'Maandelijks budget (support of SLA)',
  'Weet ik nog niet',
] as const

interface FormData {
  name: string
  email: string
  phone: string
  service_type: string
  budget: string
  message: string
}

function ContactFormFn({ className = '' }: { className?: string }) {
  // "Aanvraag starten" on /services passes the chosen service through as
  // ?dienst=…, so the visitor does not have to pick it a second time.
  const searchParams = useSearchParams()
  const preselected = matchServiceName(searchParams.get('dienst')) ?? ''

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service_type: preselected,
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Er is iets misgegaan. Probeer het opnieuw.')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: preselected,
        budget: '',
        message: '',
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Er is iets misgegaan. Probeer het opnieuw.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={cn('bg-card p-10 text-center border border-foreground/15', className)} aria-live="polite">
        {/* Animated green checkmark ring */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Aanvraag verstuurd
        </h3>
        <p className="text-foreground/80 text-sm mb-1">
          Bedankt voor uw bericht.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Wij nemen {CONTACT.responseTime} contact met u op met een helder
          voorstel. Haast? WhatsApp {CONTACT.phoneDisplay}.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-hover transition-colors"
        >
          <Send size={14} />
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('bg-card p-6 lg:p-8 border border-foreground/15', className)}
    >
      <div className="space-y-5">
        {/* Name + Email — 2 columns on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="input-label">
              Naam <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Uw volledige naam"
              className="input-field"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="input-label">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="uw@email.com"
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Phone + Service — 2 columns on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="input-label">
              Telefoon / WhatsApp
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+597 XXX-XXXX"
              className="input-field"
            />
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service_type" className="input-label">
              Service interesse <span className="text-destructive">*</span>
            </label>
            <select
              id="service_type"
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Kies een dienst...</option>
              {serviceOptionGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="input-label">
            Budget indicatie
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Kies een budget...</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="input-label">
            Bericht / project omschrijving{' '}
            <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Beschrijf uw project, wensen en vragen..."
            className="input-field min-h-[130px] resize-y"
            required
            rows={5}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-destructive-muted border border-destructive/30 p-4 text-destructive-foreground text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="button-primary w-full min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Verzenden...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Verstuur aanvraag</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export const ContactForm = memo(ContactFormFn)
