class LoginPage {
  elements = {
    username: () => cy.get('[data-test="username"]'),
    password: () => cy.get('[data-test="password"]'),
    form: () => cy.get('form'),
  };

  login(username: string = 'standard_user', password: string = 'secret_sauce') {
    cy.visit('https://www.saucedemo.com/');
    this.elements.username().type(username);
    this.elements.password().type(password);
    this.elements.form().submit();
  }
}
export default LoginPage;
