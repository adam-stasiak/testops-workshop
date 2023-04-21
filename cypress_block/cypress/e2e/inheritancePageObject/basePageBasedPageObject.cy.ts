import HomePage from 'cypress/pages/elements/inheritancePageObject/homePageWithPageBase';

describe('Inheritance Page Object', () => {
  let homePage: HomePage = new HomePage();

  it('Inheritence click', () => {
    homePage.visit(homePage.elements().path);
    homePage.clickButton(homePage.elements().button());
  });
});
