import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { CONTACT, TEL_HREF, MAIL_HREF, whatsappHref } from './contact'
import { serviceNames, matchServiceName, serviceOptionGroups } from './services'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(entry) && !entry.endsWith('.test.ts') ? [path] : []
  })
}

const files = sourceFiles('src').map((path) => ({
  path,
  text: readFileSync(path, 'utf8'),
}))

describe('contact details', () => {
  it('builds every link from the one number', () => {
    expect(TEL_HREF).toBe('tel:+5978318508')
    expect(MAIL_HREF).toBe('mailto:agencynextx@gmail.com')
    expect(whatsappHref()).toBe('https://wa.me/5978318508')
    expect(whatsappHref('Hallo NextX')).toBe(
      'https://wa.me/5978318508?text=Hallo%20NextX'
    )
  })

  it('agrees with itself across every representation', () => {
    expect(CONTACT.phoneE164).toBe(`+597${CONTACT.phoneLocal}`)
    expect(CONTACT.phoneDigits).toBe(`597${CONTACT.phoneLocal}`)
    expect(CONTACT.phoneDisplay.replace(/[^0-9]/g, '')).toBe(CONTACT.phoneDigits)
  })

  // The bug this whole module exists to prevent: a page quietly shipping a
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
        // Interpolated targets are built from CONTACT, or reply to the
        // visitor who submitted the form; only literals can be wrong.
        .filter((hit) => !hit.includes('${'))
        .filter((hit) => !hit.startsWith(`mailto:${CONTACT.email}`))
        .map((hit) => `${path}: ${hit}`)
    })
    expect(offenders).toEqual([])
  })

  it('promises the same response time everywhere', () => {
    const offenders = files
      .filter(({ text }) => /binnen 24[-–]48 uur|binnen 1 uur/.test(text))
      .map(({ path }) => path)
    expect(offenders).toEqual([])
  })
})

describe('service catalogue', () => {
  it('offers every catalogue entry in the contact form', () => {
    const inGroups = serviceOptionGroups.flatMap((group) => group.options)
    expect(inGroups.sort()).toEqual([...serviceNames].sort())
  })

  it('resolves a ?dienst= value that /services actually links to', () => {
    for (const name of serviceNames) {
      expect(matchServiceName(name)).toBe(name)
      expect(matchServiceName(decodeURIComponent(encodeURIComponent(name)))).toBe(name)
    }
  })

  it('ignores a ?dienst= value that is not a real service', () => {
    expect(matchServiceName(null)).toBeUndefined()
    expect(matchServiceName('Gratis website')).toBeUndefined()
  })

  it('only references well-formed remote image ids', () => {
    // A fabricated id (letters outside hex, an invented tail) 404s and leaves
    // a broken tile on a page that is meant to sell the work.
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
    // `https://${'/diensten/seo'}` renders as https:///diensten/seo, which
    // navigates nowhere.
    const offenders = files
      .filter(({ text }) => /https:\/\/\$\{[^}]*\burl\b/.test(text))
      .map(({ path }) => path)
    expect(offenders).toEqual([])
  })

  it('gives the skip link a target in every route group', () => {
    // layout.tsx renders <a href="#main">; a page without the anchor drops
    // keyboard users into nothing.
    const holders = files.filter(({ text }) => text.includes('id="main"'))
    const routes = holders.map(({ path }) => path)
    expect(routes.some((p) => p.includes('app/page.tsx'))).toBe(true)
    expect(routes.some((p) => p.includes('examples/layout.tsx'))).toBe(true)
    for (const page of ['about', 'contact', 'portfolio', 'services']) {
      expect(
        routes.some((p) => p.includes(`app/${page}/page.tsx`)),
        `/${page} mist id="main"`
      ).toBe(true)
    }
  })

  it('points every demo link at a page that exists', () => {
    const slugs = new Set(readdirSync('src/app/examples'))
    const demos = new Set(
      files
        .flatMap(({ text }) => text.match(/\/examples\/[a-z-]+/g) ?? [])
        .map((href) => href.replace('/examples/', ''))
    )
    for (const slug of demos) {
      expect(slugs.has(slug), `/examples/${slug} bestaat niet`).toBe(true)
    }
  })
})
