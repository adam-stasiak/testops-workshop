describe('Test new windows and tabs', () => {
  it('Handling new Browser Tab – using removeAttr feature', function() {
    cy.visit('https://the-internet.herokuapp.com/windows');
    cy.get('.example > a')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('include', '/windows/new');
    cy.get('h3').should('have.text', 'New Window');
  });

  it('Handling New Window –– using stub', function() {
    cy.visit('https://alapanme.github.io/testing-cypress.html');
    const newUrl = 'https://the-internet.herokuapp.com/';

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('button').click();
    cy.get('@windowOpen').then((out) => {
      cy.wrap(out.args[0][0]).as('newRealUrl');
    });

    cy.get('@windowOpen').should('be.calledWith', newUrl);
    cy.window().then((win) => {
      cy.get('@newRealUrl').then((nu) => {
        win.location.href = `${nu}`;
      });
    });
    cy.get('h2').should('contain', 'Available Examples');
  });
});
