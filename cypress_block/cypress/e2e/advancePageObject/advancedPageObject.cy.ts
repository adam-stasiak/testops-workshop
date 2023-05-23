import BasketItem from 'cypress/pages/elements/advancedPageObject/basketItem';
import BasketPage from 'cypress/pages/elements/advancedPageObject/basketPage';
import ListingItem from 'cypress/pages/elements/advancedPageObject/listingItem';
import ListingPage from 'cypress/pages/elements/advancedPageObject/listingPage';
import LoginPage from 'cypress/pages/elements/advancedPageObject/loginPage';
describe('Advanced Page Object', () => {
  let listingPage: ListingPage = new ListingPage();
  let basketPage: BasketPage = new BasketPage();
  let loginPage: LoginPage = new LoginPage();
  ['Bike Light', 'Backpack'].forEach((item) => {
    it(`should go to checkout with ${item}`, () => {
      let listingItem: ListingItem = new ListingItem(item);
      let basketItem: BasketItem = new BasketItem(item);
      loginPage.login();
      listingItem.bar().addToBasket();
      listingItem.listingSpecificElements.picture().should('be.visible');
      listingPage.openBasket();
      basketItem
        .bar()
        .elements.price()
        .should('be.visible');
      basketPage.clickCheckout();
    });
  });
});
