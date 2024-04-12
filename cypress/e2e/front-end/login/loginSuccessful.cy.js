describe('Login credenciais válidas', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.visit('/');
        cy.login(Cypress.env('username'), Cypress.env('password'), true);
    });

    it('Login credenciais válidas.', () => {
        const isapi = Cypress.env('isapi');
        cy.getByData('asset-bottom-container-connection-address').should('exist').and('have.text', isapi);
        cy.get('.fa-circle').eq(1).should('exist');
        cy.get('.fa-circle').eq(1).parent().should('contain', UITEXT.GENERAL_CONNECTED);
    });
});