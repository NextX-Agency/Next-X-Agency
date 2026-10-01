import { test, expect } from '@playwright/test'

test('confirmation failure preserves accepted inquiry; double submission is prevented', async ({
  page,
}) => {
  let submissions = 0
  let release!: () => void
  const pending = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route('**/api/contact', async (route) => {
    submissions++
    await pending
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        notificationAccepted: true,
        confirmationAccepted: false,
      }),
    })
  })
  await page.goto('/contact?dienst=web-software')
  await expect(page.locator('#service_type')).toHaveValue(
    'Web & Software op maat',
  )
  await page.getByLabel('Naam', { exact: true }).fill('Test Klant')
  await page.getByLabel('E-mail', { exact: true }).fill('test@example.com')
  await page
    .getByLabel('Uw project', { exact: true })
    .fill('Dit is een aanvraag met een optioneel budget.')
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Versturen…' })).toBeDisabled()
  await page
    .locator('form')
    .evaluate((form) =>
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      ),
    )
  await expect.poll(() => submissions).toBe(1)
  release()
  await expect(page.getByRole('status')).toContainText(
    'bevestigingsmail kon niet worden verstuurd',
  )
  await expect(page.getByRole('status')).toContainText('niet opnieuw')
  await expect(page.getByRole('status')).toBeFocused()
})

test('unavailable provider retains the inquiry and offers WhatsApp; retries keep request identity', async ({
  page,
}) => {
  const payloads: Record<string, unknown>[] = []
  await page.route('**/api/contact', async (route) => {
    payloads.push(route.request().postDataJSON())
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Het formulier is tijdelijk niet beschikbaar.',
      }),
    })
  })
  await page.goto('/contact')
  await page.getByLabel('Naam', { exact: true }).fill('Test Klant')
  await page.getByLabel('E-mail', { exact: true }).fill('test@example.com')
  await page
    .getByLabel('Waar gaat het om?', { exact: true })
    .selectOption('Iets anders')
  await page
    .getByLabel('Uw project', { exact: true })
    .fill('Dit is een aanvraag die behouden moet blijven.')
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect(page.locator('form').getByRole('alert')).toContainText(
    'tijdelijk niet beschikbaar',
  )
  await expect(
    page.getByRole('link', { name: 'WhatsApp-bericht' }),
  ).toHaveAttribute('href', 'https://wa.me/5978318508')
  await expect(page.locator('#message')).toHaveValue(
    'Dit is een aanvraag die behouden moet blijven.',
  )
  await page.getByRole('button', { name: 'Verstuur', exact: true }).click()
  await expect.poll(() => payloads.length).toBe(2)
  expect(payloads[0].request_id).toBe(payloads[1].request_id)
  expect(payloads[0].submitted_at).toBe(payloads[1].submitted_at)
})
