class ItemBar {
  parent: Cypress.Chainable<JQuery<HTMLElement>>;
  constructor(parent: Cypress.Chainable<JQuery<HTMLElement>>) {
    this.parent = parent;
  }
  elements = {
    price: () => this.parent.find('.inventory_item_price'),
    addToBaskedButton: () =>
      this.parent.find('[data-test^="add-to-cart-sauce-labs-"]'),
    removeFromBasketButton: () =>
      this.parent.find('[data-test^="remove-sauce-labs-"]'),
  };

  addToBasket() {
    this.elements.addToBaskedButton().click();
  }
}
export default ItemBar;
