describe('Trying to make login on client web and are successful', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.visit('/');
    });

    it('Should test login on client and are successful', () => {
        cy.getByData('txtUsername').type(Cypress.env('username'));
        cy.getByData('txtPassword').type(Cypress.env('password'));
        cy.intercept('POST', /\/xgen_desenv6.dll\?WSMMakeLogin\?t=\d+/).as('loginRequest');
        cy.getByData('btnEnter').click();
        cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('agent');
        });
        cy.get('.fa-circle').eq(1).should('exist');
        cy.get('.fa-circle').eq(1).parent().should('contain', 'Conectado');
    })
});