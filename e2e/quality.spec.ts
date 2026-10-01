import { expect, test } from '@playwright/test'
import { examples } from '../src/content/examples'
import { findService, serviceLabel } from '../src/content/services'

for (const example of examples) {
  test(`fictional demo remains usable at phone and desktop widths: ${example.slug}`, async ({
    context,
  }) => {
    const errors: string[] = []
    for (const width of [320, 1440]) {
      // Keep native lazy-loading and scroll restoration independent per viewport.
      const page = await context.newPage()
      page.on('pageerror', (error) => errors.push(error.message))
      await page.setViewportSize({ width, height: 900 })
      const response = await page.goto(`/examples/${example.slug}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('main')).toHaveCount(1)
      await expect(page.locator('main h1')).toBeVisible()
      await expect(page.locator('.demo-chrome')).toContainText('Conceptdemo')
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        /noindex/,
      )
      const anchors = await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .map((link) => link.getAttribute('href')!)
            .filter((href) => href.length > 1),
        )
      for (const anchor of anchors)
        expect(
          await page
            .locator(`[id="${decodeURIComponent(anchor.slice(1))}"]`)
            .count(),
          anchor,
        ).toBeGreaterThan(0)
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded()
        await expect
          .poll(() =>
            image.evaluate((element) => {
              const img = element as HTMLImageElement
              return img.complete && img.naturalWidth > 0
            }),
          )
          .toBe(true)
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true)
      await page.close()
    }
    expect(errors).toEqual([])
  })
}

test('comparison controls visibly switch the original and proposed interfaces', async ({
  page,
}) => {
  await page.goto('/examples/ux-ui-design')
  await page.getByRole('button', { name: 'Original', exact: true }).click()
  await expect(page.locator('[data-comparison="original"]')).toBeVisible()
  await expect(page.locator('[data-comparison="proposed"]')).toBeHidden()
  await page.getByRole('button', { name: 'Proposed', exact: true }).click()
  await expect(page.locator('[data-comparison="original"]')).toBeHidden()
  await expect(page.locator('[data-comparison="proposed"]')).toBeVisible()
  await page.getByRole('slider').focus()
  await page.keyboard.press('ArrowLeft')
  await expect(page.locator('[data-comparison="original"]')).toBeVisible()
  await expect(page.locator('[data-comparison="proposed"]')).toBeVisible()
})

test('service inquiry links select a valid service and section anchors resolve', async ({
  page,
}) => {
  await page.goto('/services')
  const links = await page
    .locator('a[href]')
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('href')!),
    )
  for (const href of new Set(
    links.filter((href) => href.startsWith('/contact?dienst=')),
  )) {
    const id = new URL(href, 'http://localhost').searchParams.get('dienst')
    const service = findService(id)
    expect(service, href).toBeTruthy()
    await page.goto(href)
    await expect(page.locator('#service_type')).toHaveValue(
      serviceLabel(service!, service!.category),
    )
  }
  await page.goto('/')
  for (const href of new Set(
    await page
      .locator('a[href^="/services#"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('href')!),
      ),
  )) {
    await page.goto(href)
    expect(
      await page
        .locator(`[id="${decodeURIComponent(href.split('#')[1])}"]`)
        .count(),
      href,
    ).toBe(1)
  }
})

test('homepage content and primary inquiry link work without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.locator('main h1')).toBeVisible()
  await expect(page.locator('main a[href="/portfolio"]').first()).toBeVisible()
  const inquiry = page.locator('main a[href="/contact"]').first()
  await expect(inquiry).toBeVisible()
  await inquiry.click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.locator('main h1')).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await context.close()
})

test('fictional portfolio viewer supports Escape, focus containment and restoration', async ({
  page,
}) => {
  await page.goto('/examples/portfolio-website')
  const project = page.getByRole('button', { name: /Nanga \/ identity/ })
  await project.click()
  const close = page.getByRole('button', { name: 'Close', exact: true })
  await expect(close).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(project).toBeFocused()
})
