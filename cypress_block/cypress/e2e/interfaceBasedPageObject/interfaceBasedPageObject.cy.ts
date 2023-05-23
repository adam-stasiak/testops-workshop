import HomePage from 'cypress/pages/elements/interfacePageObject/homePageInterfaceVersion';

describe('Interface Page Object', () => {
  let homePage: HomePage = new HomePage();
  it('Header should be visible.', () => {
    homePage.visit();
    homePage.getHeader().should('be.visible');
  });
});
