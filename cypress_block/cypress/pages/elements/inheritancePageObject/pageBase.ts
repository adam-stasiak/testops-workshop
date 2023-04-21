class PageBase {
  visit(path: string): void {
    cy.visit(path);
  }

  clickButton(
    button: Cypress.Chainable<JQuery<HTMLElement>>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return button.click();
  }
}

export default PageBase;
