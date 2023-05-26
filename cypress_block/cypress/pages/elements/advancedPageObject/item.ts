class Item {
  private title: string;
  constructor(title: string = 'Backpack') {
    this.title = title;
  }

  elements() {
    return {
      container: () => cy.contains(this.title).parentsUntil('.inventory_item').parent(),
      title: () => this.elements().container().find('.inventory_item_name'),
      summary: () => this.elements().container().find('.inventory_item_desc'),
      bar: () => {}
    };
  }
}
export default Item;