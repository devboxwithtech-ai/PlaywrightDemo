# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: innovateqa.spec.ts >> InnovateQA Audit Flow >> should run QA audit and update status text
- Location: src/tests/innovateqa.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button.legacy-click-handler').filter({ hasText: 'Run QA Audit' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button.legacy-click-handler').filter({ hasText: 'Run QA Audit' })

```

```yaml
- heading "InnovateQA Automation Hub" [level=1]
- paragraph: Simulate a live production refactor to test autonomous self-healing capabilities.
- button "Execute Verified Audit"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('InnovateQA Audit Flow', () => {
  4  |   test('should run QA audit and update status text', async ({ page }) => {
  5  |     await page.goto('http://127.0.0.1:5501/tests/innovateqa.html');
  6  | 
  7  |     const auditButton = page.locator('button.legacy-click-handler', { hasText: 'Run QA Audit' });
> 8  |     await expect(auditButton).toBeVisible();
     |                               ^ Error: expect(locator).toBeVisible() failed
  9  |     await auditButton.click();
  10 | 
  11 |     const status = page.locator('#status');
  12 |     await expect(status).toHaveText('QA Audit Passed!');
  13 |   });
  14 | });
  15 | 
```