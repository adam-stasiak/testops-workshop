class HomePage {
  elements = {
    header: () => cy.get('#navbar'),
    utilitiesSectionButton: () => cy.contains('Utilities'),
  };

  navigate() {
    cy.visit('https://example.cypress.io/');
  }
}
export default HomePage;
