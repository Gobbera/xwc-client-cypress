describe('Trying to make login on client web and are successful', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.visit('/');
    });

    it('Should test login on client and are successful', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'), true);
        cy.get('@loginRequest').then(() => {
            const response = Cypress.env('response');
            cy.getByData('asset-bottom-container-connection-address').should('exist').and('have.text', response.config.url.isapi);
        });
        cy.get('.fa-circle').eq(1).should('exist');
        cy.get('.fa-circle').eq(1).parent().should('contain', 'Conectado');
    });
});