Cypress.Commands.add('loginRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6.dll\\?WSMMakeLogin\\?t=\\d+`);
    cy.intercept('POST', urlRegex).as('loginRequest');
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

Cypress.Commands.add('changeStatusRequest', (statusCode, status, code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/status\\/${statusCode}\\/agent\\/\\w+\\?t=\\d+`);
    cy.intercept('PUT', urlRegex).as('changeStatusRequest');
        cy.get('#container-1049').click().type(status);
        cy.wait('@changeStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('propertieRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/propertie\\?agentId=${Cypress.env('id')}&t=\\d+`);
    cy.intercept('PUT', urlRegex).as('propertieRequest');
    cy.getByData('property-window-btn-ok').click();
    cy.wait('@propertieRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(code);
    });
});

Cypress.Commands.add('searchRequest', (filter, code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6cs\\.dll\\/v1\\/interaction\\/search\\?agentid=${Cypress.env('id')}&offset=0&limit=50&filter=${filter}&t=\\d+`);
    cy.intercept('GET', urlRegex).as('searchRequest');
    cy.wait('@searchRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('viewerRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6cs\\.dll\\/v1\\/interaction\\/viewer\\?agentid=${Cypress.env('id')}&mediaType=16&wid=\\w+-\\w+-\\w+-\\w+-\\w+&rid=\\w+-\\w+-\\w+-\\w+-\\w+&t=\d+/`);
    cy.intercept('GET', urlRegex).as('viewerRequest');
    //cy.getByData('interaction-search-header-attendance-summary-interaction-open').click();
    cy.wait('@viewerRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('emailRetrievedQueuedRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6\\.dll\\?WSEmailRetrievedQueued\\?wid=\w+-\w+-\w+-\w+-\w+&rid=\w+-\w+-\w+-\w+-\w+agentid=1887&t=\d+`);
    cy.intercept('GET', urlRegex).as('viewerRequest');
    cy.getByData('interaction-search-header-attendance-summary-interaction-open').click();
    cy.wait('@viewerRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

