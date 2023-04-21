describe('Snapshots', () => {
  it('Image & Data snapshots', function() {
    cy.visit('https://example.cypress.io/');
    cy.get('.banner > .container').toMatchImageSnapshot();
    cy.get('.banner > .container').toMatchSnapshot();
  });
});
