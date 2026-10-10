# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility-automation1.spec.ts >> Accessibility automation suite for local fixture >> modal exposes accessible semantics and traps keyboard focus
- Location: src/tests/accessibility-automation1.spec.ts:28:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#modal')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#modal')
    13 × locator resolved to <div hidden="" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">…</div>
       - unexpected value "hidden"

```

```yaml
- link "Skip to main content":
  - /url: "#main"
- banner:
  - heading "A11y Demo App" [level=1]
  - navigation "Main navigation":
    - list:
      - listitem:
        - link "Home":
          - /url: "#main"
      - listitem:
        - link "Features (bad contrast)":
          - /url: "#features"
      - listitem:
        - link "Contact form (labels?)":
          - /url: "#contact"
      - listitem:
        - link "External (no rel)":
          - /url: https://example.com
- region "Hero":
  - heading "Hero" [level=2]
  - img "A11y demo app hero illustration"
- heading "Out-of-order heading" [level=4]
- main:
  - region "Features":
    - heading "Features" [level=2]
    - paragraph: This paragraph has poor color contrast.
    - button "What is accessibility?"
    - listbox "Favorite fruit (custom)":
      - text: Favorite fruit (custom)
      - option "Apple" [selected]
      - option "Banana"
      - option "Mango"
    - text: Slide 1
    - table "Pricing":
      - caption: Pricing
      - rowgroup:
        - row "Plan Price":
          - columnheader "Plan"
          - columnheader "Price"
        - row "Basic $10":
          - cell "Basic"
          - cell "$10"
        - row "Pro $20":
          - cell "Pro"
          - cell "$20"
    - iframe
    - text: Sorry, your browser doesn’t support embedded videos.
    - button
    - text: First duplicate id Second duplicate id
    - button "Open Modal"
    - region "Contact":
      - heading "Contact" [level=2]
      - text: Name
      - textbox "Name"
      - textbox "Phone (no label)"
      - text: Message
      - textbox "Message"
      - button "Send"
- contentinfo:
  - paragraph: © Demo
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | import { AccessibilityPage } from '../pages/accessibilityPage';
  4  | 
  5  | test.describe('Accessibility automation suite for local fixture', () => {
  6  |   test('page loads and exposes expected landmarks and controls', async ({ page }) => {
  7  |     const accessibilityPage = new AccessibilityPage(page);
  8  |     await accessibilityPage.goto();
  9  | 
  10 |     await expect(page.locator('header[role="banner"]')).toBeVisible();
  11 |     await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  12 |     await expect(page.locator('main[role="main"]')).toBeVisible();
  13 |     await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
  14 |     await expect(accessibilityPage.accordionButton).toHaveAttribute('aria-expanded', 'false');
  15 |     await expect(accessibilityPage.accordionPanel).toBeHidden();
  16 |   });
  17 | 
  18 |   test('accordion toggles expanded state and reveals content', async ({ page }) => {
  19 |     const accessibilityPage = new AccessibilityPage(page);
  20 |     await accessibilityPage.goto();
  21 | 
  22 |     await accessibilityPage.toggleAccordion();
  23 | 
  24 |     await expect(accessibilityPage.accordionButton).toHaveAttribute('aria-expanded', 'true');
  25 |     await expect(accessibilityPage.accordionPanel).toBeVisible();
  26 |   });
  27 | 
  28 |   test('modal exposes accessible semantics and traps keyboard focus', async ({ page }) => {
  29 |     const accessibilityPage = new AccessibilityPage(page);
  30 |     await accessibilityPage.goto();
  31 | 
  32 |     await accessibilityPage.openModal();
  33 | 
> 34 |     await expect(accessibilityPage.modalDialog).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  35 |     await expect(accessibilityPage.modalDialog).toHaveAttribute('role', 'dialog');
  36 |     await expect(accessibilityPage.modalDialog).toHaveAttribute('aria-modal', 'true');
  37 |     await expect(accessibilityPage.modalDialog).toHaveAccessibleName('Subscribe');
  38 |     await expect(accessibilityPage.emailInput).toBeVisible();
  39 |     await expect(accessibilityPage.emailInput).toBeFocused();
  40 | 
  41 |     await page.keyboard.press('Tab');
  42 |     await expect(accessibilityPage.subscribeButton).toBeFocused();
  43 | 
  44 |     await page.keyboard.press('Tab');
  45 |     await expect(accessibilityPage.closeModalButton).toBeFocused();
  46 | 
  47 |     await page.keyboard.press('Tab');
  48 |     await expect(accessibilityPage.emailInput).toBeFocused();
  49 | 
  50 |     await page.keyboard.press('Shift+Tab');
  51 |     await expect(accessibilityPage.closeModalButton).toBeFocused();
  52 | 
  53 |     await accessibilityPage.closeModalButton.click();
  54 |     await expect(accessibilityPage.modalDialog).toBeHidden();
  55 |     await expect(accessibilityPage.modalButton).toBeFocused();
  56 |   });
  57 | 
  58 |   test('axe finds the known accessibility violations in the fixture', async ({ page }) => {
  59 |     const accessibilityPage = new AccessibilityPage(page);
  60 |     await accessibilityPage.goto();
  61 | 
  62 |     const results = await accessibilityPage.runAxeAudit();
  63 | 
  64 |     expect(results.violations.length).toBeGreaterThan(0);
  65 |     expect(results.violations.map(v => v.id)).toContain('color-contrast');
  66 |     expect(results.violations.map(v => v.id)).toContain('image-alt');
  67 |     expect(results.violations.map(v => v.id)).toContain('label');
  68 |   });
  69 | 
  70 |   test('axe can be scoped to the form area and detect label issues', async ({ page }) => {
  71 |     const accessibilityPage = new AccessibilityPage(page);
  72 |     await accessibilityPage.goto();
  73 | 
  74 |     const results = await new AxeBuilder({ page })
  75 |       .include('#contact')
  76 |       .analyze();
  77 | 
  78 |     expect(results.violations.length).toBeGreaterThan(0);
  79 |     expect(results.violations.some(v => v.id === 'label')).toBeTruthy();
  80 |   });
  81 | });
  82 | 
```