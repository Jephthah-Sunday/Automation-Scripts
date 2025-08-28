import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const USERNAME = process.env.DEMO_USERNAME || 'standard_user';
const PASSWORD = process.env.DEMO_PASSWORD || 'secret_sauce';

test('allows valid user to sign in (Playwright)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(USERNAME, PASSWORD);
  await login.expectLoggedIn();
});

test('blocks invalid credentials (Playwright)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('wrong_user', 'bad_pass');
  await expect(login.error).toBeVisible();
});
