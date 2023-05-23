import AppPage from './appPage';

class HomePage implements AppPage {
  elements() {
    return {
      header: () => cy.get('#navbar'),
    };
  }
  visit(): void {
    cy.visit('https://example.cypress.io/');
  }
  getHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.elements().header();
  }
}

export default HomePage;
