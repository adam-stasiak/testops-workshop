class UtilitiesPage {
  elements = {
    sectionHeader: (label: string) => cy.get(`${label}_ > a`),
  };
}

export default UtilitiesPage;
