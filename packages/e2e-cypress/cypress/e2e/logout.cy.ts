import { DashboardPage } from "../pages/DashboardPage";
import { Sidebar } from "../pages/Sidebar";

const dashboard = new DashboardPage();
const sidebar = new Sidebar();
const USERNAME = Cypress.env("DEMO_USERNAME") || "standard_user";
const PASSWORD = Cypress.env("DEMO_PASSWORD") || "secret_sauce";

describe("Logout (Cypress)", () => {
  beforeEach(() => {
    cy.loginSauce(USERNAME, PASSWORD);
  });

  it("logs user out and returns to login page", () => {
    dashboard.burgerButton().click();
    sidebar.container().should("be.visible");
    sidebar.logoutLink().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
