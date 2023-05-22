describe('Pipeline spec', async() => {


    it('tp1', async() => {
        expect(1).to.be.eq(1)

        cy.visit('https://example.cypress.io')

    })
    it('tp2', async() => {

        expect(1).to.be.eq(1)

        cy.visit('https://example.cypress.io')

    })
    it('tp3', async() => {

        expect(1).to.be.eq(0)

        cy.visit('https://example.cypress.io')

    })
    it('tp4', async() => {

        expect(1).to.be.eq(1)

        cy.visit('https://example.cypress.io')
    })
})