interface AppPage {
  elements(): any;
  visit(): void;
  getHeader(): Cypress.Chainable<JQuery<HTMLElement>>;
}

export default AppPage;
