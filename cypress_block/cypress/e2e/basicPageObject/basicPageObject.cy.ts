import HomePage from 'cypress/pages/elements/basicPageObject/homePage';
import UtilitiesPage from 'cypress/pages/elements/basicPageObject/utilitiesPage';

describe('Basic Page Object', () => {
  let homePage: HomePage = new HomePage();
  let utilitiesPage: UtilitiesPage = new UtilitiesPage();
  it('home vs utilities page', () => {
    homePage.navigate();
    homePage.elements.header().should('be.visible');
    homePage.elements.utilitiesSectionButton().click();
    utilitiesPage.elements.sectionHeader('#').should('be.visible');
  });
});
