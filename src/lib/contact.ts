import { site, mailHref, whatsappHref } from '@/content/site'

/**
 * The shape the example prototypes, the contact API and the e-mail templates
 * read contact details in. Every value comes from `src/content/site.ts`, so a
 * number or promise still only changes in one place.
 */
export const CONTACT = {
  phoneLocal: site.phone.e164.replace('+597', ''),
  phoneDisplay: site.phone.display,
  phoneE164: site.phone.e164,
  phoneDigits: site.phone.whatsapp,
  email: site.email,
  city: site.location.city,
  country: site.location.country,
  location: `${site.location.city}, ${site.location.country}`,
  coordinates: site.location.coordinates,
  responseTime: `binnen ${site.responseTime}`,
  deliveryTime: site.delivery,
  siteUrl: site.url,
  shopUrl: site.sisterSite.href,
} as const

export const TEL_HREF = `tel:${site.phone.e164}`
export const MAIL_HREF = mailHref
export { whatsappHref }
