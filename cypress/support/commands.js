// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('getByData', (selector) => {
    cy.get(`[data-e2e=${selector}]`);
});

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('[data-e2e="txtUsername"]').type(username);
    cy.get('[data-e2e="txtPassword"]').type(password);
    cy.get('[data-e2e="btnEnter"]').click();
});

Cypress.Commands.add('setOnlineStatus', () => {
    cy.get('#container-1049').click().type('{downarrow}{downarrow}{downarrow}{enter}');
});

Cypress.Commands.add('isDisabled', (data) => {
    cy.getByData(data).invoke('attr', 'class').should('include', 'x-btn-disabled');
});

Cypress.Commands.add('isEnabled', (data) => {
    cy.getByData(data).invoke('attr', 'class').should('not.include', 'x-btn-disabled');
});

Cypress.Commands.add('toastNotification', (notificationType) => {
    cy.get('.toast-notification').should('exist').and('have.text', notificationType);
});

Cypress.Commands.add('hitYesButton', () => {
    cy.get('.x-btn-inner').contains('Sim').click();
});

Cypress.Commands.add('classificationRequest', (options) => {
    switch (options) {
        case 'email':
            cy.getByData('email-screen-btn-classification').click();
            break;
        case 'activity':
            cy.getByData('activity-screen-btn-request-classification').click();
            break;
        case 'chat':
            cy.getByData('conversation-chat-container-btn-request-classification').click();
            break;
    }
    cy.get('.x-grid-item').first().click().type('{downarrow}{downarrow}{downarrow}{enter}');
    cy.intercept('POST', 'https://xgentest6-desenv.xgen.com.br/v1/users/classifications/6/classification_response').as('onClassificationRequest');
    cy.getByData('classification-panel-btn-general-classification').click();
    cy.wait('@onClassificationRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('addContactRequest', () => {
    cy.intercept('POST', 'https://xgentest6-desenv.xgen.com.br/v1/users/contacts/').as('addContactRequest');
    cy.getByData('new-contact-container-btn-add').click();
    cy.wait('@addContactRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        //expect(interception.response.body).to.have.property('statusCode');
        //const responseBody = interception.response.body;
        //const expectedProperties = {
        //"type": contactType,
        //"name": name,
        //"identification": `${formatString('email', name)}@gmail.com`,  //tentando comparar as propriedades do objeto recebido com o enviado
        //"identification": "testest@sagdjhagsjdj.com",
        //"personId": 0,
        //"status": "Active"
        //};
        //for (const prop in expectedProperties) {
        //  expect(responseBody[prop]).to.equal(expectedProperties[prop]);
        //}
    });
    cy.toastNotification('Contato Adicionado');
});




//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })