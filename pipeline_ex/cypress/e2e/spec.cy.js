describe('Pipeline spec', async() => {


    it('tp1', { tags: 'TP-1' }, async() => {
        expect(1).to.be.eq(1)

        cy.visit('https://example.cypress.io')

    })
    it('tp2', { tags: 'TP-2' }, async() => {

        expect(1).to.be.eq(1)

        cy.visit('https://example.cypress.io')

    })
    it('tp3', { tags: 'TP-3' }, async() => {

        expect(1).to.be.eq(0)

        cy.visit('https://example.cypress.io')

    })
    it('tp4', { tags: 'TP-4' }, async() => {

        expect(1).to.be.eq(1)

        cy.visit('https://example.cypress.io')
    })
})