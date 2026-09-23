import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { CONTACT, TEL_HREF, MAIL_HREF, whatsappHref } from './contact'
import { allServices, findService, serviceCategories, serviceLabel, websiteFrom } from '@/content/services'
import { examples } from '@/content/examples'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(entry) && !entry.endsWith('.test.ts') ? [path] : []
  })
}

const files = sourceFiles('src').map((path) => ({
  path: path.replace(/\\/g, '/'),
  text: readFileSync(path, 'utf8'),
}))

describe('contact details', () => {
  it('builds every link from the one number', () => {
    expect(TEL_HREF).toBe('tel:+5978318508')
    expect(MAIL_HREF).toBe('mailto:agencynextx@gmail.com')
    expect(whatsappHref()).toBe('https://wa.me/5978318508')
    expect(whatsappHref('Hallo NextX')).toBe('https://wa.me/5978318508?text=Hallo%20NextX')
  })

  it('agrees with itself across every representation', () => {
    expect(CONTACT.phoneE164).toBe(`+597${CONTACT.phoneLocal}`)
    expect(CONTACT.phoneDigits).toBe(`597${CONTACT.phoneLocal}`)
    expect(CONTACT.phoneDisplay.replace(/[^0-9]/g, '')).toBe(CONTACT.phoneDigits)
  })

  // The bug this module exists to prevent: a page quietly shipping a
  // different number, e-mail or wa.me target than the agency's real one.
  it('is the only phone number written anywhere in src', () => {
    const offenders = files.flatMap(({ path, text }) => {
      const found = text.match(/\+597[\s-]?\d[\d\s-]{5,}|wa\.me\/\d+|tel:\+?\d+/g)
      return (found ?? [])
        .filter(
          (hit) =>
            hit.replace(/[^0-9]/g, '') !== CONTACT.phoneDigits &&
            hit.replace(/[^0-9]/g, '') !== CONTACT.phoneLocal
        )
        .map((hit) => `${path}: ${hit}`)
    })
    expect(offenders).toEqual([])
  })

  it('is the only e-mail address linked anywhere in src', () => {
    const offenders = files.flatMap(({ path, text }) => {
      const found = text.match(/mailto:[^"'`}\s)]+/g) ?? []
      return found
        .filter((hit) => !hit.includes('${'))
        .filter((hit) => !hit.startsWith(`mailto:${CONTACT.email}`))
        .map((hit) => `${path}: ${hit}`)
    })
    expect(offenders).toEqual([])
  })

  it('promises the same response time everywhere', () => {
    expect(CONTACT.responseTime).toBe('binnen 24 uur')
    const offenders = files
      .filter(({ text }) => /binnen 24[-–]48 uur|binnen 1 uur/.test(text))
      .map(({ path }) => path)
    expect(offenders).toEqual([])
  })

  it('points canonical URLs at the host the site is actually served from', () => {
    // The bare domain redirects to www; canonicals must not point at a redirect.
    expect(CONTACT.siteUrl).toBe('https://www.nextxagency.com')
  })
})

describe('service catalogue', () => {
  it('offers every catalogue entry in the contact form', () => {
    const form = files.find(({ path }) => path.endsWith('components/ContactForm.tsx'))!
    // The dropdown is built by mapping over the catalogue, never typed out.
    expect(form.text).toContain('serviceCategories.map')
    expect(form.text).toContain('serviceLabel(service, category)')
  })

  it('resolves every ?dienst= value the site and the prototypes link to', () => {
    for (const service of allServices) {
      expect(findService(service.id)?.id).toBe(service.id)
      expect(findService(serviceLabel(service, service.category))?.id).toBe(service.id)
      for (const alias of service.aliases ?? []) expect(findService(alias)?.id).toBe(service.id)
    }
    const linked = files.flatMap(({ text }) =>
      [...text.matchAll(/dienst=([A-Za-z0-9%-]+)/g)].map((m) => decodeURIComponent(m[1]))
    )
    for (const value of linked) expect(findService(value), `?dienst=${value}`).toBeDefined()
  })

  it('ignores a ?dienst= value that is not a real service', () => {
    expect(findService(null)).toBeUndefined()
    expect(findService('Gratis website')).toBeUndefined()
  })

  it('writes prices in one file only', () => {
    // Pages format prices from the catalogue; a literal "vanaf $" elsewhere
    // is a copy that will drift the next time prices change.
    const offenders = files
      .filter(({ path }) => !path.includes('content/services.ts'))
      .filter(({ text }) => /vanaf \$\d/i.test(text))
      .map(({ path }) => path)
    expect(offenders).toEqual([])
  })

  it('offers budget bands that reach the cheapest website', () => {
    const form = files.find(({ path }) => path.endsWith('components/ContactForm.tsx'))!
    const bands = form.text.match(/\$\d+/g)?.map((b) => Number(b.slice(1))) ?? []
    expect(Math.max(...bands)).toBeGreaterThanOrEqual(websiteFrom.amount)
  })

  it('names an SLA tier and a rate for work after delivery', () => {
    const sla = serviceCategories.find((category) => category.id === 'service-sla')
    expect(sla).toBeDefined()
    expect(sla!.services.flatMap((s) => s.includes).join(' ')).toMatch(/Reactie binnen \d+ werkuren/)
    expect(serviceCategories.find((c) => c.id === 'websites')!.terms).toMatch(/\$\d+ per uur/)
  })

  it('only references well-formed remote image ids', () => {
    const offenders = files.flatMap(({ path, text }) => {
      const found = text.match(/images\.unsplash\.com\/photo-[^"'`?\s)]+/g) ?? []
      return found
        .map((url) => url.split('/').pop() as string)
        .filter((id) => !/^photo-\d{10,13}-[0-9a-f]{12}$/.test(id))
        .map((id) => `${path}: ${id}`)
    })
    expect(offenders).toEqual([])
  })

  it('never builds a url by prefixing a path with a scheme', () => {
    const offenders = files
      .filter(({ text }) => /https:\/\/\$\{[^}]*\burl\b/.test(text))
      .map(({ path }) => path)
    expect(offenders).toEqual([])
  })

  it('gives the skip link a target in every layout', () => {
    // layout.tsx renders <a href="#main">; a route without the anchor drops
    // keyboard users into nothing.
    const holders = files.filter(({ text }) => text.includes('id="main"')).map(({ path }) => path)
    expect(holders.some((p) => p.endsWith('app/(site)/layout.tsx'))).toBe(true)
    expect(holders.some((p) => p.endsWith('app/examples/layout.tsx'))).toBe(true)
    expect(holders.some((p) => p.endsWith('app/not-found.tsx'))).toBe(true)
  })

  it('points every example and demo link at a page that exists', () => {
    const slugs = new Set(readdirSync('src/app/examples'))
    const linked = new Set([
      ...examples.map((example) => example.slug),
      ...allServices.flatMap((service) => (service.example ? [service.example] : [])),
      ...files
        .flatMap(({ text }) => text.match(/\/examples\/[a-z-]+/g) ?? [])
        .map((href) => href.replace('/examples/', '')),
    ])
    for (const slug of linked) expect(slugs.has(slug), `/examples/${slug} bestaat niet`).toBe(true)
  })
})
