import { DashboardPage } from "../pages/DashboardPage";

const dashboard = new DashboardPage();
const USERNAME = Cypress.env("DEMO_USERNAME") || "standard_user";
const PASSWORD = Cypress.env("DEMO_PASSWORD") || "secret_sauce";

describe("Dashboard (Cypress)", () => {
  beforeEach(() => {
    cy.loginSauce(USERNAME, PASSWORD);
  });

  it("shows product listing", () => {
    cy.url().should("include", dashboard.urlPart);
    dashboard.title().should("contain.text", "Products");
    dashboard.inventoryContainer().find(".inventory_item").its("length").should("be.greaterThan", 0);
  });
});
