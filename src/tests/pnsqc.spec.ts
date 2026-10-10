import { expect, test } from '@playwright/test';

test('verified audit passes', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/tests/pnsqc.html');
  await page.getByRole('button', { name: 'Execute Verified Audit' }).click();

  await expect(page.locator('#status')).toHaveText('QA Audit Passed!');
});
