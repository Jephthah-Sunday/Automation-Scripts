import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryContainer: Locator;
  readonly burgerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryContainer = page.locator('#inventory_container');
    this.burgerButton = page.locator('#react-burger-menu-btn');
  }

  async expectOnDashboard() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.title).toBeVisible();
    await expect(this.title).toContainText('Products');
    await expect(this.inventoryContainer).toBeVisible();
  }
}
