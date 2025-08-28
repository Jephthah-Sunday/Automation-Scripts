import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { Sidebar } from '../pages/Sidebar';

const USERNAME = process.env.DEMO_USERNAME || 'standard_user';
const PASSWORD = process.env.DEMO_PASSWORD || 'secret_sauce';

test('logs user out to login page (Playwright)', async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const sidebar = new Sidebar(page);

  await login.goto();
  await login.login(USERNAME, PASSWORD);
  await dashboard.expectOnDashboard();

  await dashboard.burgerButton.click();
  await expect(sidebar.container).toBeVisible();
  await sidebar.logoutLink.click();

  await expect(page).toHaveURL(/.*\/$/);
});
