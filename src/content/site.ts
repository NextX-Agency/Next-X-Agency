/**
 * Business facts. Every page, email and schema block reads from here, so a
 * phone number or response time only ever changes in one place.
 */
export const site = {
  name: 'NextX Agency',
  shortName: 'NextX',
  url: 'https://www.nextxagency.com',
  email: 'agencynextx@gmail.com',
  phone: {
    display: '+597 831-8508',
    e164: '+5978318508',
    whatsapp: '5978318508',
  },
  location: {
    city: 'Paramaribo',
    country: 'Suriname',
    countryCode: 'SR',
    timeZone: 'America/Paramaribo',
    lat: 5.852,
    lng: -55.2038,
    coordinates: '05.8520° N  55.2038° W',
  },
  /** How quickly a written enquiry gets an answer, on working days. */
  responseTime: '24 uur',
  /** Typical build time for a website once the design is approved. */
  delivery: '48–72 uur',
  sisterSite: {
    name: 'Shop NextX',
    href: 'https://www.shop-nextx.com',
    label: 'shop-nextx.com',
  },
} as const

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.phone.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const mailHref = `mailto:${site.email}`

export const navigation = [
  { href: '/portfolio', label: 'Werk' },
  { href: '/services', label: 'Diensten' },
  { href: '/about', label: 'Over' },
  { href: '/contact', label: 'Contact' },
] as const
