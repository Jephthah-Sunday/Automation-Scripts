import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

const loginPage = new LoginPage();
const dashboard = new DashboardPage();

const USERNAME = Cypress.env("DEMO_USERNAME") || "standard_user";
const PASSWORD = Cypress.env("DEMO_PASSWORD") || "secret_sauce";

describe("Login (Cypress)", () => {
  it("allows valid user to sign in", () => {
    loginPage.visit();
    loginPage.username().type(USERNAME);
    loginPage.password().type(PASSWORD, { log: false });
    loginPage.submit().click();
    cy.url().should("include", dashboard.urlPart);
    dashboard.title().should("be.visible").and("contain.text", "Products");
    dashboard.inventoryContainer().should("be.visible");
  });

  it("blocks invalid credentials", () => {
    loginPage.visit();
    loginPage.username().type("wrong_user");
    loginPage.password().type("bad_pass", { log: false });
    loginPage.submit().click();
    loginPage.error().should("be.visible");
  });
});
