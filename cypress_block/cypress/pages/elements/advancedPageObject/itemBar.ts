class ItemBar {
  parent: Cypress.Chainable<JQuery<HTMLElement>>;
  constructor(parent: Cypress.Chainable<JQuery<HTMLElement>>) {
    this.parent = parent;
  }
  elements() {
    return {
      price: () => this.parent.find('.inventory_item_price'),
      addToCartButton: () => this.parent.find('[data-test^="add-to-cart-"]'),
      removeFromCartButton: () => this.parent.find(`[data-test^="remove-"]`),
    };
  }

  addToCart(){
      this.elements().addToCartButton().click()
  }

}


export default ItemBar;