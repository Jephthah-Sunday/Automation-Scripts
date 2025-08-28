# QA Demo: Cypress + Playwright (SauceDemo)

This repository demonstrates parallel E2E setups for the same web app using **Cypress** and **Playwright**, modeled against the public **Sauce Demo** site.

- Target site: https://www.saucedemo.com
- Demo credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`

> ⚠️ This is a portfolio-friendly project. It contains no proprietary code and uses a public demo application.

## Repository layout
```
qa-demo/
  .github/workflows/ci.yml
  packages/
    e2e-cypress/
    e2e-playwright/
```

## Quick start
1. Install Node 18+ (use `nvm use` if you have `.nvmrc`).
2. Run `npm i` at the repo root (uses npm workspaces).
3. Copy `.env.example` to `.env` in each package and adjust as needed (or set env vars).
4. Run tests:
   - Cypress: `npm run test:cypress`
   - Playwright: `npm run test:playwright`
   - Both: `npm run test:all`

## Environment variables
- `BASE_URL` (default: `https://www.saucedemo.com`)
- `DEMO_USERNAME` (default: `standard_user`)
- `DEMO_PASSWORD` (default: `secret_sauce`)

## Reports
- Cypress Mochawesome HTML: `packages/e2e-cypress/mochawesome-report`
- Playwright HTML: `packages/e2e-playwright/playwright-report`

## Notes
- Uses **Page Object Model** for Login, Dashboard, and Logout flows.
- Stable selectors via SauceDemo's `data-test` and element IDs.
- GitHub Actions matrix runs both frameworks in parallel and uploads reports.
