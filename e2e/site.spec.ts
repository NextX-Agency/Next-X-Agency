import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const widths = [320, 375, 390, 430, 768, 1024, 1440]
const routes = [
  '/',
  '/portfolio',
  '/services',
  '/about',
  '/contact',
  '/portfolio/shop-nextx',
  '/portfolio/indef-design',
]
const screenshots = process.env.SCREENSHOT_DIR ?? 'test-results/screenshots'

for (const route of routes) {
  test(`responsive layout, imagery and accessibility: ${route}`, async ({
    context,
  }) => {
    const errors: string[] = []
    for (const width of widths) {
      // Keep each viewport's navigation and native lazy-loading checks independent.
      const page = await context.newPage()
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 })
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      expect(response?.status()).toBe(200)
      await expect(page.locator('main h1')).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: 'instant' }),
      )
      for (const image of await page.locator('img').all()) {
        await image.evaluate((element) =>
          element.scrollIntoView({ behavior: 'instant' }),
        )
        await expect
          .poll(
            () =>
              image.evaluate((element) => {
                const img = element as HTMLImageElement
                return img.complete && img.naturalWidth > 0
              }),
            {
              message: `Image ${await image.getAttribute('alt')} at ${width}px on ${route}`,
            },
          )
          .toBe(true)
      }
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: 'instant' }),
      )
      await expect
        .poll(() =>
          page.evaluate(() =>
            Array.from(document.images)
              .filter((img) => !img.complete || img.naturalWidth === 0)
              .map((img) => img.getAttribute('src')),
          ),
        )
        .toEqual([])
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
      expect(await page.locator('main h1').count()).toBe(1)
      if (width === 390 || width === 1440) {
        mkdirSync(screenshots, { recursive: true })
        await page.screenshot({
          path: join(
            screenshots,
            `${route.replaceAll('/', '-').replace(/^-/, '') || 'home'}-${width}.png`,
          ),
          fullPage: true,
        })
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
        expect(
          accessibility.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ).toEqual([])
      }
      await page.close()
    }
    expect(errors).toEqual([])
  })
}

test('mobile menu closes with Escape and navigation; keyboard focus returns', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Menu +' })
  await menu.click()
  await expect(
    page.getByRole('navigation', { name: 'Mobiel menu' }),
  ).toBeVisible()
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze())
      .violations,
  ).toEqual([])
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(
    page.getByRole('navigation', { name: 'Mobiel menu' }),
  ).toHaveCount(0)
  await menu.click()
  await page
    .getByRole('navigation', { name: 'Mobiel menu' })
    .getByRole('link', { name: 'Studio' })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(
    page.getByRole('navigation', { name: 'Mobiel menu' }),
  ).toHaveCount(0)
})

test('contact validation, preset, failure and success without real email', async ({
  page,
}) => {
  let submissions = 0
  await page.route('**/api/contact', (route) => {
    submissions++
    return route.fulfill({
      status: submissions === 1 ? 500 : 200,
      contentType: 'application/json',
      body: JSON.stringify(
        submissions === 1 ? { error: 'Test failure' } : { success: true },
      ),
    })
  })
  await page.goto('/contact?dienst=photography-media')
  await expect(page.locator('#service_type')).toHaveValue('Fotografie & Media')
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect(page.locator('#name')).toBeFocused()
  await expect(page.locator('#name-error')).toHaveText('Vul uw naam in.')
  expect(submissions).toBe(0)
  await page.locator('#name').fill('Browser Test')
  await page.locator('#email').fill('invalid')
  await page.locator('#message').fill('Een test zonder echte e-mailbezorging.')
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect(page.locator('#email')).toBeFocused()
  expect(submissions).toBe(0)
  await page.locator('#email').fill('browser@example.com')
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect(page.locator('form').getByRole('alert')).toContainText(
    'Het versturen is mislukt',
  )
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Bedankt, Browser.')
  await expect(page.getByRole('status')).toBeFocused()
  expect(submissions).toBe(2)
})

test('gallery full-screen viewing, keyboard navigation, close and focus restoration', async ({
  page,
}) => {
  await page.goto('/portfolio/shop-nextx')
  const image = page.getByRole('button', { name: /^Vergroot afbeelding 1:/ })
  await image.click()
  const viewer = page.getByRole('dialog')
  await expect(viewer).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(
    page.getByRole('button', { name: 'Volgende afbeelding' }),
  ).toBeVisible()
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze())
      .violations,
  ).toEqual([])
  await page.keyboard.press('Escape')
  await expect(viewer).toHaveCount(0)
  await expect(image).toBeFocused()
})

test('reduced motion leaves content and galleries usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('#hero-title')).toBeVisible()
  expect(
    await page
      .locator('#hero-title')
      .evaluate((el) => parseFloat(getComputedStyle(el).animationDuration)),
  ).toBeLessThan(0.01)
  await page.goto('/portfolio/indef-design')
  await page.getByRole('button', { name: /^Vergroot afbeelding 1:/ }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('internal links, demo routes, sitemap and missing projects', async ({
  page,
  request,
}) => {
  const paths = new Set<string>()
  for (const route of [...routes, '/examples']) {
    await page.goto(route)
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')!),
      )) {
      paths.add(href.split('?')[0].split('#')[0])
    }
  }
  for (const path of paths)
    expect((await request.get(path)).status(), path).toBe(200)
  expect((await request.get('/portfolio/private-draft')).status()).toBe(404)
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  expect(await sitemap.text()).toContain('/portfolio/shop-nextx')
  expect(await sitemap.text()).not.toContain('private-draft')
})
