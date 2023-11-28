describe('Receive online chat support', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.setOnlineStatus();
    });

    it('Interact with the chat service', () => {
        cy.intercept('GET', /\/xgen_desenv6.dll\?OpOnLine\?p1=\d+&p2=\w+-\w+-\w+-\w+-\w+&p3=\w+&json=1/).as('chatConnectionRequest');
        cy.wait('@chatConnectionRequest', { timeout: 60000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.intercept('GET', /\/xgen_desenv6cs.dll\?WSLoadHistoryInteractionMessages\?wid=\w+/).as('chatHistoricRequest');
        cy.wait('@chatHistoricRequest', { timeout: 60000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.getByData('conversation-chat-container-textarea-conversation-text-area').type(Cypress.env('baseFieldTest'));
        cy.getByData('conversation-chat-container-btn-send-message').click();
        //cy.get('[data-e2e="undefined"]').click(); //TODO: fix on clientweb data-e2e emoji tab buttons
        cy.getByData('conversation-chat-container-btn-emoji-panel').click();
        cy.get('.send-emoji-button').each(($element, index, $list) => {
            cy.wrap($element).click();
        });
        cy.getByData('conversation-chat-container-btn-send-message').click();
        cy.getByData('conversation-chat-container-btn-request-classification').click();
        cy.classificationRequest();
        cy.intercept('GET', /\/xgen_desenv6.dll\?OpOnLine\?c=0&p1=\d+&p2=\w+-\w+-\w+-\w+-\w+&p3=\w+&p4=\d+&p5=&p6=&p7=\d+/).as('turnOffchatRequest');
        cy.getByData('conversation-chat-container-btn-turn-off-interaction').click();
        cy.wait('@turnOffchatRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.toastNotification('Salvo com sucesso!');
    });
});