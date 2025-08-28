import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const USERNAME = process.env.DEMO_USERNAME || 'standard_user';
const PASSWORD = process.env.DEMO_PASSWORD || 'secret_sauce';

test('shows product listing (Playwright)', async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await login.goto();
  await login.login(USERNAME, PASSWORD);
  await dashboard.expectOnDashboard();
});
