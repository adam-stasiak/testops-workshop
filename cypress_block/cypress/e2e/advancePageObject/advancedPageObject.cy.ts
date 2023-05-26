import CartItem from "cypress/pages/elements/advancedPageObject/basketItem"
import ListingItem from "cypress/pages/elements/advancedPageObject/listingItem"
import ListingPage from "cypress/pages/elements/advancedPageObject/listingPage"
import LoginPage from "cypress/pages/elements/advancedPageObject/loginPage"

describe("Workshop",()=>{
    ["Backpack"].forEach((element)=>{
    it('Our test', () => {
      const loginPage: LoginPage = new LoginPage();
      const listingPage: ListingPage = new ListingPage();
      const listingItem: ListingItem = new ListingItem(element);
      const cartItem: CartItem = new CartItem(element)

      loginPage.visit();
      loginPage.fillUsername();
      loginPage.fillPassword();
      loginPage.clickLoginButton();

      listingItem.elements().title().should('be.visible');
      listingItem.elements().bar().addToCart();

      listingPage.openCart()
      cartItem.quantityIsVisible()
      cartItem.elements().bar().elements().price().toMatchImageSnapshot()


    });
    })

})