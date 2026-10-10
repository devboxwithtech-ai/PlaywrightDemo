# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: innovateqa.spec.ts >> InnovateQA Audit Flow >> should run QA audit and update status text
- Location: src/tests/innovateqa.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5501/tests/innovateqa.html
Call log:
  - navigating to "http://127.0.0.1:5501/tests/innovateqa.html", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: 127.0.0.1
      - text: refused to connect.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Reload" [ref=e19] [cursor=pointer]
    - button "Details" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('InnovateQA Audit Flow', () => {
  4  |   test('should run QA audit and update status text', async ({ page }) => {
> 5  |     await page.goto('http://127.0.0.1:5501/tests/innovateqa.html');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5501/tests/innovateqa.html
  6  | 
  7  |     const auditButton = page.locator('button.legacy-click-handler', { hasText: 'Run QA Audit' });
  8  |     await expect(auditButton).toBeVisible();
  9  |     await auditButton.click();
  10 | 
  11 |     const status = page.locator('#status');
  12 |     await expect(status).toHaveText('QA Audit Passed!');
  13 |   });
  14 | });
  15 | 
```