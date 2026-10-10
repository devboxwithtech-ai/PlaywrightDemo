# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gmail-login.spec.ts >> Gmail Login Suite >> user should be able to login successfully
- Location: src/tests/gmail-login.spec.ts:15:7

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for getByLabel('Email or phone')

```

# Test source

```ts
  1  | 
  2  | import { Page, Locator } from '@playwright/test';
  3  | 
  4  | export class LoginPage {
  5  |   readonly page: Page;
  6  |   readonly emailInput: Locator;
  7  |   readonly passwordInput: Locator;
  8  |   readonly nextButton: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.emailInput = this.page.getByLabel('Email or phone');
  13 |     this.passwordInput = this.page.getByLabel('Enter your password');
  14 |     this.nextButton = this.page.getByRole('button', { name: 'Next' });
  15 |   }
  16 | 
  17 |   async enterEmail(email: string) {
> 18 |     await this.emailInput.fill(email);
     |                           ^ Error: locator.fill: Target page, context or browser has been closed
  19 |   }
  20 | 
  21 |   async enterPassword(password: string) {
  22 |     await this.passwordInput.fill(password);
  23 |   }
  24 | 
  25 |   async clickNext() {
  26 |     await this.nextButton.click();
  27 |   }
  28 | 
  29 |   async login(email: string, password: string) {
  30 |     await this.enterEmail(email);
  31 |     await this.clickNext();
  32 |     
  33 |     // Wait for the URL to change to the password page
  34 |     await this.page.waitForURL('**/signin/v2/challenge/password/**');
  35 |     
  36 |     await this.enterPassword(password);
  37 |     await this.clickNext();
  38 |   }
  39 | }
  40 | 
```