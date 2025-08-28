import { Page, Locator } from '@playwright/test';

export class Sidebar {
  readonly page: Page;
  readonly container: Locator;
  readonly logoutLink: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('.bm-menu');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.closeButton = page.locator('#react-burger-cross-btn');
  }
}
