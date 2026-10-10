import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { AccessibilityPage } from '../pages/accessibilityPage';

test.describe('Accessibility automation', () => {
  const url = 'http://127.0.0.1:5501/tests/accessibility.html';

  test('image-alt violation', async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.length).toBeGreaterThan(0);
    expect(results.violations.map(v => v.id)).toContain('image-alt');
  });

  test('color-contrast violation', async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.length).toBeGreaterThan(0);
    expect(results.violations.map(v => v.id)).toContain('color-contrast');
  });

  test('button-name violation', async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.length).toBeGreaterThan(0);
    expect(results.violations.map(v => v.id)).toContain('button-name');
  });

  test('modal supports accessible dialog semantics', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);

    await accessibilityPage.goto();
    await accessibilityPage.openModal();
    await expect(accessibilityPage.modalDialog).toBeVisible();
    await expect(accessibilityPage.modalDialog).toHaveAttribute('role', 'dialog');
    await expect(accessibilityPage.modalDialog).toHaveAttribute('aria-modal', 'true');
    await expect(accessibilityPage.modalDialog).toHaveAttribute('aria-labelledby', 'modal-title');
    await expect(accessibilityPage.emailInput).toBeVisible();
  });
});
