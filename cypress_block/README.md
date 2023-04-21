# Cypress exercises

This folder contains exercices related to cypress area.

## Page objects exercise

### Basic Page Object

- [ ] Implement basic page object for home page and utilities page inside folder pages/basicPageObject.
- [ ] Write test under e2e/basicPageObject directory. Test should navigate to home page and then through UI action navigate to utilities

### Interface Page Object

- [ ] Implement AppPage interface under pages/interfaceBasedPageObject directory. Interface should include elements,visit,getHeader fields and methods at leat.
- [ ] Using this interface create page object for homePage under the same directory
- [ ] Write test under e2e/interfacePageObject directory. Test should navigate to homepage and verify header visibility

### Inheritance Page Object

- [ ] Implement PageBase class under pages/inheritancePageObject directory. Class should include methods
      visit and clickButton. Please implement these method with these requirements: - visit should consume string argument with address - clickButton should consume Chainable element
- [ ] Implement HomePage class under pages/inheritancePageObject directory. Class should extends PageBase class and contain field elements with map of 'path' and 'button'(chainable) map.
- [ ] Write test under e2e/inheritancePageObject directory. Test should navigate to homepage and click button

## Iframe exercise

- [ ] Run docker-compose up under directory docker_introduction/docker-compose/
- [ ] Under e2e/iframe directory implement test case which verifies any UI element (for example '.banner > .container') under localhost:8000 address.
- [ ] Define `const getIframeDocument = ()=>{...}}` which get 'iframe' element. Then invoke its '0.contentDocument' and verifies this visibility
- [ ] Define `const getIframeBody = ()=>{}` which gets iframe document, invoke its body and at the end calls `then(cy.wrap)`

- [ ] Using getIframeBody get access to iframe and call assertion. Compare the output with assertion invoked outside getIframeBody scope.

## New Tab exercise

- [ ] Implement first test method with visit on page 'https://the-internet.herokuapp.com/windows'
- [ ] Implement click on element `'.example > a'`
- [ ] Add assertions for new window address (/new suffix)
- [ ] Add assertions for any element from new page
- [ ] Implement removeAttr action on redirect element and check behavior
- [ ] Implement second test method with visit on 'https://alapanme.github.io/testing-cypress.html'
- [ ] On 'button' element perform click
- [ ] Add assertion for 'Available Examples' text
- [ ] Before click access window element and execute `cy.stub(win, 'open').as('windowOpen')`;
- [ ] Verify that '@windowOpen' was called with 'https://the-internet.herokuapp.com/' address
- [ ] Access object under '@windowOpen' alias and wrap `out.args[0][0]` as newRealUrl alias
- [ ] Access value of newRealUrl alias and set win.location.href equal to this newRealUrl value
- [ ] Execute test and check results

  <details>

      it('Handling New Window –– using stub', function() {
          cy.visit('https://alapanme.github.io/testing-cypress.html');
          const newUrl = 'https://the-internet.herokuapp.com/';

          cy.window().then((win) => {
              cy.stub(win, 'open').as('windowOpen');
          });

          cy.get('button').click();
          cy.get('@windowOpen').then((out) => {
              cy.wrap(out.args[0][0]).as('newRealUrl');
          });

          cy.get('@windowOpen').should('be.calledWith', newUrl);
          cy.window().then((win) => {
              cy.get('@newRealUrl').then((nu) => {
              win.location.href = `${nu}`;
              });
          });
          cy.get('h2').should('contain', 'Available Examples');});

</details>

## Snapshots exercise

- [ ] In cypress.config.ts add `const { initPlugin } = require('cypress-plugin-snapshots/plugin');`
- [ ] In cypress.config.ts and setupNodeEvents block use method `initPlugin(on,config)`
- [ ] In support/e2e.ts add import `'cypress-plugin-snapshots/commands';`
- [ ] In snapshots.cy.ts file define test which visit any page you like and calls toMatchImageSnapshot and toMatchSnapshot on any UI element.
- [ ] See generated file. Try to break snapshots with any changes
- [ ] Parametrize these tests to make them running on various browsers and screen sizes
