export const getIframeDocument = () => {
  return cy
    .get('iframe')
    .its('0.contentDocument')
    .should('exist');
};
export const getIframeBody = () => {
  // get the document
  return getIframeDocument()
    .its('body')
    .should('not.be.undefined')
    .then(cy.wrap);
};

describe('Iframe', () => {
  before(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });
  it('iframe access', function() {
    //before test please run docker-compose with web application
    cy.visit('http://localhost:8000/');
    // Validate dashboard name in the src url.
    getIframeBody().within(() => {
      cy.get('.banner > .container').should('be.visible');
    });
    cy.get('.banner > .container').should('be.visible');
  });
});
