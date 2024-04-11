Cypress.Commands.add('loginRequest', () => {
    cy.intercept('POST', /\/xgen_desenv6.dll\?WSMMakeLogin\?t=\d+/).as('loginRequest');
    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        Cypress.env('response', interception.response.body);
    });
});