class Page {
  elements() {
    return {
      burger: () => cy.get('#react-burger-menu-btn'),
      cartIcon: () => cy.get('.shopping_cart_link'),
    };
  }

  openBurgerMenu() {
    this.elements().burger().click()
  }
  openCart() {
      this.elements().cartIcon().click()
  }
}

export default Page;