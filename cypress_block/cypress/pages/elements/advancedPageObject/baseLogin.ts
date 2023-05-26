interface BaseLogin {
  elements(): any;
  visit(): any;
  fillUsername(): Cypress.Chainable<JQuery<HTMLElement>>;
  fillPassword(): Cypress.Chainable<JQuery<HTMLElement>>;
  clickLoginButton(): Cypress.Chainable<JQuery<HTMLElement>>;
}

export default BaseLogin;