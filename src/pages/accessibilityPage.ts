import { Page, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';

export class AccessibilityPage {
  readonly page: Page;
  readonly accordionButton: Locator;
  readonly accordionPanel: Locator;
  readonly modalButton: Locator;
  readonly modalDialog: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accordionButton = this.page.locator('#acc-btn-1');
    this.accordionPanel = this.page.locator('#acc-panel-1');
    this.modalButton = this.page.locator('#open-modal');
    this.modalDialog = this.page.locator('#modal');
    this.emailInput = this.page.locator('#email');
  }

  async goto() {
    const localhostUrl = 'http://127.0.0.1:5501/tests/accessibility.html';
    const localFileUrl = `file://${path.resolve(__dirname, '../../tests/accessibility.html')}`;

    try {
      await this.page.goto(localhostUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });
    } catch {
      await this.page.goto(localFileUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    }
  }

  async runAxeAudit() {
    return await new AxeBuilder({ page: this.page }).analyze();
  }

  async toggleAccordion() {
    await this.accordionButton.click();
  }

  async openModal() {
    await this.modalButton.click();
  }
}
