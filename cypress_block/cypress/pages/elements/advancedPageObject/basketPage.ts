import Page from './page';

class BasketPage extends Page {
  constructor() {
    super();
  }
  basketElements = {
    checkoutButton: () => cy.get('[data-test="checkout"]'),
  };
  clickCheckout() {
    this.basketElements.checkoutButton().click();
  }
}
export default BasketPage;
