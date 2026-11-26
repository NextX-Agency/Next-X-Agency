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
  await page.goto('/contact?service=web-software')
  await expect(page.locator('#service_type')).toHaveValue(
    'Custom software',
  )
  await page.getByLabel('Name', { exact: true }).fill('Test Client')
  await page.getByLabel('Email', { exact: true }).fill('test@example.com')
  await page
    .getByLabel('Your project', { exact: true })
    .fill('This is a request with an optional budget.')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()
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
    'confirmation email could not be sent',
  )
  await expect(page.getByRole('status')).toContainText('do not need to fill in the form again')
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
        error: 'The form is temporarily unavailable.',
      }),
    })
  })
  await page.goto('/contact')
  await page.getByLabel('Name', { exact: true }).fill('Test Client')
  await page.getByLabel('Email', { exact: true }).fill('test@example.com')
  await page
    .getByLabel('What is it about?', { exact: true })
    .selectOption('Something else')
  await page
    .getByLabel('Your project', { exact: true })
    .fill('This is a request that must be kept.')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect(page.locator('form').getByRole('alert')).toContainText(
    'temporarily unavailable',
  )
  await expect(
    page.getByRole('link', { name: 'WhatsApp message' }),
  ).toHaveAttribute('href', 'https://wa.me/5978318508')
  await expect(page.locator('#message')).toHaveValue(
    'This is a request that must be kept.',
  )
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect.poll(() => payloads.length).toBe(2)
  expect(payloads[0].request_id).toBe(payloads[1].request_id)
  expect(payloads[0].submitted_at).toBe(payloads[1].submitted_at)
})
