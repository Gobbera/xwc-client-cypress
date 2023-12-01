describe('Search functionalities', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it('Should use the button search', () => {
        cy.intercept('GET', 'https://xgentest6-desenv.xgen.com.br/v1/users/contacts?offset=0&limit=20').as('contactsSearchRequest');
        cy.getByData('workcenter-screen-btn-search').click();
        cy.wait('@contactsSearchRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        /* cy.intercept('GET', 'https://xgentest6-desenv.xgen.com.br/v1/users/persons?offset=0&limit=300').as('personSearchRequest');
        cy.wait('@personSearchRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        }); */
        cy.windowTitleIs('Busca');
        cy.getByData('attendance-filter-window-result-header-close').click();
    });
});