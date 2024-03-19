Cypress.Commands.add('loginRequest', () => {
    cy.intercept('POST', /\/xgen_desenv6.dll\?WSMMakeLogin\?t=\d+/).as('loginRequest');
        let agentName;
        cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('agent');
            agentName = interception.response.body.agent.name;
            //cy.get('#asset-bottom-container-1112-innerCt').checkContent(`&nbsp;${agentName}&nbsp;|`);
            //cy.get('#container-1116-innerCt').should('be.visible').and('have.text', `&nbsp;${agentName}&nbsp;|`);
        });
});