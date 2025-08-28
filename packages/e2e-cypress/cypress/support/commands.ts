Cypress.Commands.add("loginSauce", (username: string, password: string) => {
  cy.visit("/");
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password, { log: false });
  cy.get('[data-test="login-button"]').click();
  cy.url().should("include", "/inventory.html");
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginSauce(username: string, password: string): Chainable<void>;
    }
  }
}
export {};
