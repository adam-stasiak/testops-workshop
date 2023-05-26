export const getIframeDocument = () =>{
    return cy.get('iframe').its('0.contentDocument').its('body').then(cy.wrap)
}

describe('iframe',()=>{
    it('test',()=>{
        cy.visit('https://alapanme.github.io/testing-cypress.html');
        cy.window().then((win)=> {
            cy.stub(win,'open').as('windowOpen')
        })
        cy.contains('Try it').click()

        cy.get('@windowOpen').then((out)=>{
            cy.wrap(out.args[0][0]).as('newRealUrl')
            
           
        })
        cy.get('@newRealUrl').then((nu) => {
          cy.window().then((win) => {
            win.location.href = `${nu}`;
          });
        });
    



        cy.contains('Welcome to the-internet').should('be.visible');
       

    })
})