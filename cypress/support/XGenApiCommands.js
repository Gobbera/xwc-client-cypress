Cypress.Commands.add('loginRequest', () => {
    cy.intercept('POST', /\/xgen_desenv6.dll\?WSMMakeLogin\?t=\d+/).as('loginRequest');
    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const response = interception.response.body;
        Cypress.env('response', response);
        Cypress.env('messageShortcuts', response.config.messageShortcuts);
        Cypress.env('id', response.agent.id);
        Cypress.env('maximumCapacity', response.config.capacity.maximum);
        Cypress.env('capacity', response.config.capacity);
        Cypress.env('isapi', response.config.url.isapi);
    });
});