import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const url = 'http://127.0.0.1:5501/tests/accessibility.html';

test.describe('WCAG accessibility scan for the local fixture', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });
  });

  test('page loads and exposes the required landmarks', async ({ page }) => {
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
  });

  test('axe flags the main WCAG failures on the full page', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const violationIds = results.violations.map(v => v.id);

    expect(results.violations.length).toBeGreaterThan(0);
    expect(violationIds).toEqual(
      expect.arrayContaining([
        'image-alt',
        'color-contrast',
        'button-name',
        'label',
        'heading-order',
        'frame-title',
        'duplicate-id'
      ])
    );
  });

  test('scoped scan of the contact form still detects label-related WCAG issues', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('#contact')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations.length).toBeGreaterThan(0);
    expect(results.violations.some(v => v.id === 'label')).toBeTruthy();
  });
});
