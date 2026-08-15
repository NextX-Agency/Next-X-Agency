/**
 * Single source of truth for every contact detail that appears anywhere on the
 * site — pages, demo prototypes, structured data and transactional e-mail.
 *
 * Nothing here may be hard-coded a second time elsewhere. If a number, address
 * or response time changes, it changes here and nowhere else.
 */

export const CONTACT = {
  /** Local Surinamese number, as it is dialled inside Suriname. */
  phoneLocal: '8318508',
  /** How the number is written for a reader. */
  phoneDisplay: '+597 831-8508',
  /** E.164, for tel: links and structured data. */
  phoneE164: '+5978318508',
  /** Digits only, for wa.me links. */
  phoneDigits: '5978318508',

  email: 'agencynextx@gmail.com',

  city: 'Paramaribo',
  country: 'Suriname',
  location: 'Paramaribo, Suriname',
  /** Decimal coordinates of Paramaribo, used in the page furniture. */
  coordinates: '5°52′N 55°10′W',

  /** The one response promise the whole site makes. Do not vary it per page. */
  responseTime: 'binnen 24 uur',
  /** Delivery window quoted for a standard project. */
  deliveryTime: '48–72 uur',
  /** Same window without the unit, for layouts that set "uur" separately. */
  deliveryHours: '48–72',

  siteUrl: 'https://nextxagency.com',
  shopUrl: 'https://www.shop-nextx.com',
} as const

export const TEL_HREF = `tel:${CONTACT.phoneE164}`
export const MAIL_HREF = `mailto:${CONTACT.email}`

/**
 * A wa.me link, optionally pre-filled with the message the visitor would
 * otherwise have to type. Always returns the one real agency number.
 */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${CONTACT.phoneDigits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** A mailto: link with a subject line already set. */
export function mailtoHref(subject?: string): string {
  return subject
    ? `${MAIL_HREF}?subject=${encodeURIComponent(subject)}`
    : MAIL_HREF
}
