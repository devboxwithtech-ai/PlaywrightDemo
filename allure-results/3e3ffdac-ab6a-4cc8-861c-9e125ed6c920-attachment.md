# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pnsqc.spec.ts >> verified audit passes
- Location: src/tests/pnsqc.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('QA Audit Passed!')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('QA Audit Passed!')

```

```yaml
- heading "PNSQC Automation Hub" [level=1]
- paragraph: Simulate a live production refactor to test autonomous self-healing capabilities.
- button "Execute Verified Audit"
```

# Test source

```ts
  1 | import { expect, test } from '@playwright/test';
  2 | 
  3 | test('verified audit passes', async ({ page }) => {
  4 |   await page.goto('http://127.0.0.1:5501/tests/pnsqc.html');
  5 |   await page.getByRole('button', { name: 'Execute Verified Audit' }).click();
  6 | 
> 7 |   await expect(page.getByText('QA Audit Passed!')).toBeVisible();
    |                                                    ^ Error: expect(locator).toBeVisible() failed
  8 | });
  9 | 
```