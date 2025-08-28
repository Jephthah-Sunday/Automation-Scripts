export class LoginPage {
  visit() { cy.visit("/"); }
  username() { return cy.get('[data-test="username"]'); }
  password() { return cy.get('[data-test="password"]'); }
  submit() { return cy.get('[data-test="login-button"]'); }
  error() { return cy.get('[data-test="error"]'); }
}
