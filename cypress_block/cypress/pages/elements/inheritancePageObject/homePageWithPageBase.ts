import PageBase from './pageBase';

class HomePage extends PageBase {
  elements() {
    return {
      button: () => cy.get('.navbar-brand'),
      path: '/',
    };
  }
}

export default HomePage;
