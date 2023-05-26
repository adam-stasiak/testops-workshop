import ListingItem from "cypress/pages/elements/advancedPageObject/listingItem"
import ListingPage from "cypress/pages/elements/advancedPageObject/listingPage"
import LoginPage from "cypress/pages/elements/advancedPageObject/loginPage"

describe("Workshop",()=>{
    it('Our test',()=>{
        const loginPage: LoginPage = new LoginPage()
        const listingPage: ListingPage = new ListingPage()
        const listingItem: ListingItem = new ListingItem('Bike Light')
        loginPage.visit()
        loginPage.fillUsername()
        loginPage.fillPassword()
        loginPage.clickLoginButton()


        listingItem.elements().title().should('be.visible')

        
        //listingPage.openBurgerMenu()



    })
})