import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AccessibilityPage } from '../pages/accessibilityPage';

test.describe('Accessibility automation suite for local fixture', () => {
  test('page loads and exposes expected landmarks and controls', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();

    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
    await expect(accessibilityPage.accordionButton).toHaveAttribute('aria-expanded', 'false');
    await expect(accessibilityPage.accordionPanel).toBeHidden();
  });

  test('accordion toggles expanded state and reveals content', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();

    await accessibilityPage.toggleAccordion();

    await expect(accessibilityPage.accordionButton).toHaveAttribute('aria-expanded', 'true');
    await expect(accessibilityPage.accordionPanel).toBeVisible();
  });

  test('modal can be opened and contains dialog semantics', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();

    await accessibilityPage.openModal();

    await expect(accessibilityPage.modalDialog).toBeVisible();
    await expect(accessibilityPage.modalDialog).toHaveAttribute('role', 'dialog');
    await expect(accessibilityPage.modalDialog).toHaveAttribute('aria-modal', 'true');
    await expect(accessibilityPage.emailInput).toBeVisible();
  });

  test('modal exposes ARIA semantics and traps keyboard focus', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);

    await accessibilityPage.goto();
    await accessibilityPage.openModal();

    await expect(accessibilityPage.modalDialog).toHaveAttribute('role', 'dialog');
    await expect(accessibilityPage.modalDialog).toHaveAttribute('aria-modal', 'true');
    await expect(accessibilityPage.modalDialog).toHaveAttribute('aria-labelledby', 'modal-title');
    await expect(accessibilityPage.modalDialog).toHaveAccessibleName('Subscribe');
    await expect(accessibilityPage.emailInput).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('#subscribe')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('#close-modal')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(accessibilityPage.emailInput).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#close-modal')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(accessibilityPage.modalDialog).toBeHidden();
    await expect(accessibilityPage.modalButton).toBeFocused();
  });

  test('axe finds the known accessibility violations in the fixture', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();

    const results = await accessibilityPage.runAxeAudit();

    expect(results.violations.length).toBeGreaterThan(0);
    expect(results.violations.map(v => v.id)).toContain('color-contrast');
    expect(results.violations.map(v => v.id)).toContain('image-alt');
    expect(results.violations.map(v => v.id)).toContain('label');
  });

  test('axe can be scoped to the form area and detect label issues', async ({ page }) => {
    const accessibilityPage = new AccessibilityPage(page);
    await accessibilityPage.goto();

    const results = await new AxeBuilder({ page })
      .include('#contact')
      .analyze();

    expect(results.violations.length).toBeGreaterThan(0);
    expect(results.violations.some(v => v.id === 'label')).toBeTruthy();
  });
});
