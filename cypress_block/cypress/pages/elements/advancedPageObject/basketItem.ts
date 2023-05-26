import Item from "./item";

class CartItem extends Item {
    constructor(title: string){
        super(title)
    }
    cartElements() {
        return {
          quantity: () => this.elements().container().find('.cart_quantity'),
        };
    }

    quantityIsVisible(){
        this.cartElements().quantity().should('be.visible')
    }
}

export default CartItem;