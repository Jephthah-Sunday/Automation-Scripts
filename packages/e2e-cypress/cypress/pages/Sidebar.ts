export class Sidebar {
  container() { return cy.get(".bm-menu"); }
  logoutLink() { return cy.get("#logout_sidebar_link"); }
  closeButton() { return cy.get("#react-burger-cross-btn"); }
}
