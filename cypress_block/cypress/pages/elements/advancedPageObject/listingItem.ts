import Item from './item';

class ListingItem extends Item {
  constructor(title: string) {
    super(title);
  }
  listingSpecificElements = {
    picture: () => this.elements.container().find('.inventory_item_img'),
  };
}

export default ListingItem;
