import ItemBar from './itemBar';

class Item {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
  elements = {
    container: () =>
      cy
        .contains(this.title)
        .parentsUntil('.inventory_item')
        .parent(),
    title: () => this.elements.container().find('.inventory_item_name'),
    summary: () => this.elements.container().find('.inventory_item_desc'),
  };
  bar = () => new ItemBar(this.elements.container());
}
export default Item;
