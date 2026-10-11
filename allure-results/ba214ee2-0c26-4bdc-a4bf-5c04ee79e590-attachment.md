# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pnsqc.spec.ts >> verified audit passes
- Location: src/tests/pnsqc.spec.ts:3:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#status')
Expected: "QA Audit Passed!"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#status')
    12 × locator resolved to <div id="status"></div>
       - unexpected value ""

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "PNSQC Automation Hub" [level=1] [ref=e2]
  - paragraph [ref=e3]: Simulate a live production refactor to test autonomous self-healing capabilities.
  - button "Execute Verified Audit" [ref=e4] [cursor=pointer]
```

# Test source

```ts
  1 | import { expect, test } from '@playwright/test';
  2 | 
  3 | test('verified audit passes', async ({ page }) => {
  4 |   await page.goto('http://127.0.0.1:5501/tests/pnsqc.html');
  5 |   await page.getByRole('button', { name: 'Execute Verified Audit' }).click();
  6 | 
> 7 |   await expect(page.locator('#status')).toHaveText('QA Audit Passed!');
    |                                         ^ Error: expect(locator).toHaveText(expected) failed
  8 | });
  9 | 
```