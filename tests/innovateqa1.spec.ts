import { test, expect } from '@playwright/test';

test('should run the QA audit and update the status text', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/tests/innovateqa.html');

  const auditButton = page.locator('button.legacy-click-handler').filter({ hasText: 'Run QA Audit' });
  await expect(auditButton).toBeVisible();
  await auditButton.click();

  await expect(page.locator('#status')).toHaveText('QA Audit Passed!');
});
