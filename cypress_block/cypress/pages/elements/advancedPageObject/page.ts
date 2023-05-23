class Page {
  elements = {
    burgerIcon: () => cy.get('.bm-burger-button'),
    basketIcon: () => cy.get('.shopping_cart_link'),
  };
  loadHomePage() {
    cy.visit('https://www.saucedemo.com/');
  }
  openBurgerMenu() {
    this.elements.burgerIcon().click();
  }
  openBasket() {
    this.elements.basketIcon().click();
  }
}
export default Page;
