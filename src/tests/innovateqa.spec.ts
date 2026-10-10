import { test, expect } from '@playwright/test';

test.describe('InnovateQA Audit Flow', () => {
  test('should run QA audit and update status text', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/tests/innovateqa.html');

    const auditButton = page.locator('button.legacy-click-handler', { hasText: 'Execute Verified Audit' });
    await expect(auditButton).toBeVisible();
    await auditButton.click();

    const status = page.locator('#status');
    await expect(status).toHaveText('QA Audit Passed!');
  });
});
