export class DashboardPage {
  urlPart = "/inventory.html";
  title() { return cy.get(".title"); } // Typically contains 'Products'
  inventoryContainer() { return cy.get("#inventory_container"); }
  burgerButton() { return cy.get("#react-burger-menu-btn"); }
}
