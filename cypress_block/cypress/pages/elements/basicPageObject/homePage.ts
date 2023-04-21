class HomePage {
  elements = {
    header: () => cy.get('#navbar'),
    utilitiesSectionButton: () => cy.contains('Utilities'),
  };

  navigate() {
    cy.visit('/');
  }
}
export default HomePage;
