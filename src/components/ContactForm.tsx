'use client'

import { memo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Send, Loader2 } from 'lucide-react'

const serviceOptions = [
  'Logo Design',
  'Social Media Designs',
  'Flyer / Poster Design',
  'Business Card Website',
  'Service Website',
  'Portfolio Website',
  'Restaurant/Menu Website',
  'Starter Webshop',
  'Grotere Webshop',
  'UX/UI Audit of Re-design',
  'SEO Setup',
  'Webhosting',
  'UX Kukru Support',
  'Custom / Anders',
] as const

const budgetOptions = [
  'Minder dan $50',
  '$50 – $150',
  '$150 – $300',
  '$300 – $500',
  'Meer dan $500',
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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service_type: '',
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
        service_type: '',
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
      <div className={cn('bg-card p-10 text-center border border-foreground/15', className)}>
        {/* Animated green checkmark ring */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Bericht verstuurd!
        </h3>
        <p className="text-foreground/80 text-sm mb-1">
          Bedankt voor uw bericht.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Wij nemen binnen 24-48 uur contact met u op met een vrijblijvende quote.
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
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
          <div className="bg-destructive-muted border border-destructive/30 rounded-xl p-4 text-destructive-foreground text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-foreground hover:bg-primary active:bg-primary-active text-white font-bold text-sm px-5 py-4 transition-colors duration-300 min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
