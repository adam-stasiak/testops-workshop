import BaseLogin from './baseLogin';

class LoginPage implements BaseLogin {
  elements() {
    return {
      usernameField: () => cy.get('[data-test="username"]'),
      passwordField: () => cy.get('[data-test="password"]'),
      loginButton: () => cy.get('[data-test="login-button"]'),
    };
  }
  visit() {
    cy.visit('https://www.saucedemo.com/');
  }
  fillUsername(
    username: string = 'standard_user'
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.elements().usernameField().type(username);
  }
  fillPassword(
    password: string = 'secret_sauce'
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.elements().passwordField().type(password);
  }
  clickLoginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.elements().loginButton().click()
  }
}

export default LoginPage;