import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/tests/innovateqa.html');
  await page.getByRole('button', { name: 'Run QA Audit' }).click();
});