import Item from './item';

class BasketItem extends Item {
  constructor(title: string) {
    super(title);
  }
  basketSpecificElements = {
    quantity: () => this.elements.container().find('.cart_quantity'),
  };
}

export default BasketItem;
