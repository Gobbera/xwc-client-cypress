describe('Busca', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'), true);
    });

    it('Buscar - Email na fila', () => {
        cy.workCenterFlow('search.search-email-in-queue');
        //cy.searchRequest('%5B%7B%22property%22%3A%22isAnswered%22%2C%22value%22%3A%221%22%7D%2C%7B%22property%22%3A%22groupedProtocol%22%2C%22value%22%3A%221%22%7D%2C%7B%22property%22%3A%22agentId%22%2C%22value%22%3A%221886%22%7D%5D')
        //cy.viewerRequest();
        //cy.emailRetrievedQueuedRequest();
        //cy.closeWindow('attendance-search');
        //cy.getByData('interaction-search-header-attendance-details-protocol');
        //cy.getByData('asset-bottom-container-current-attendance-protocol').checkContent(protocol);
    });

    it('Buscar - Email na fila - Transferir para segmento', () => {
        //cy.workCenterFlow('search.search-email-in-queue'); //trocar para email da fila
        cy.workCenterFlow('search.backlog');
        cy.wait(3000);
        cy.getByData('interaction-search-header-attendance-summary-interaction-open').click();
        cy.closeWindow('attendance-search');
        //cy.getByData('asset-bottom-container-current-attendance-protocol').should('exist'); //TODO: adicionar numero do protocolo
        cy.getByData('email-screen-attendance-header-btn-action').click();
        cy.attendanceCard('.fa-envelope');
        cy.get('.attendance-card-selected').should('exist');
        cy.getByData('email-screen-attendance-header-action-menu-btn-transfer').click();
        cy.xToastNotification('Rascunho salvo');
        cy.isDisabled('attendance-transfer-btn-transfer-attendance');
        cy.wait(5000);
        cy.getByData('attendance-transfer-tab-calltype').should('exist');
        cy.get('.x-grid-item').first().click({force: true});
        cy.getByData('attendance-transfer-btn-transfer-attendance').click();
        
        //const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6\\.dll\\/v1\\/agent\\/transfer?mediaType=16&agentId=1886&wid=\w&rid=\w`);
        //cy.intercept('POST', urlRegex).as('transferRequest');
        //    cy.wait('@transferRequest', { timeout: 10000 }).then((interception) => {
        //    expect(interception.response.statusCode).to.eq(200);
        //});
    });
    
    it('Buscar - Email na fila - Transferir para operador', () => {
       //cy.workCenterFlow('search.search-email-in-queue');
       cy.workCenterFlow('search.backlog'); //trocar para email da fila
       cy.wait(3000);
       cy.getByData('interaction-search-header-attendance-summary-interaction-open').click();
       cy.closeWindow('attendance-search');
       //cy.getByData('asset-bottom-container-current-attendance-protocol').should('exist'); //TODO: adicionar numero do protocolo
       cy.getByData('email-screen-attendance-header-btn-action').click();
       cy.attendanceCard('.fa-envelope');
       cy.get('.attendance-card-selected').should('exist');
       cy.getByData('email-screen-attendance-header-action-menu-btn-transfer').click();
       cy.xToastNotification('Rascunho salvo');
       cy.getByData('attendance-transfer-tab-agent').click();
       cy.isDisabled('attendance-transfer-btn-transfer-attendance');
       cy.getByData('attendance-transfer-tab-calltype').should('exist');
       cy.get('.x-grid-item').eq(1).click({force: true});
       //const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6\\.dll\\/v1\\/agent\\/transfer?mediaType=16&agentId=1886&wid=\w&rid=\w`); TODO:
       //cy.intercept('POST', urlRegex).as('transferRequest');
       cy.getByData('attendance-transfer-btn-transfer-attendance').click();
       //    cy.wait('@transferRequest', { timeout: 10000 }).then((interception) => {
       //    expect(interception.response.statusCode).to.eq(200);
       //});
    });

    it('Buscar - Email na fila - Classificar', () => {
        //cy.workCenterFlow('search.search-email-in-queue');
        cy.workCenterFlow('search.backlog'); //TODO: trocar para email da fila
        cy.wait(3000);
        cy.selectGridItem(0);
        cy.getByData('interaction-search-header-attendance-summary-interaction-open').click();
        cy.closeWindow('attendance-search');
        //cy.getByData('asset-bottom-container-current-attendance-protocol').should('exist'); // TODO: adicionar numero do protocolo
        cy.attendanceCard('.fa-envelope');
        cy.get('.attendance-card-selected').should('exist');
        cy.xClassify(0);
        cy.getByData('email-screen-btn-classification').click();
       
       //const urlRegex = new RegExp(`\\https:\\/\\/xgentest6-desenv\\.xgen\\.com\\.br\\/v1\\/users\\/classifications\\/6\\/classification_response`); TODO:
       //cy.intercept('POST', urlRegex).as('transferRequest');
       //    cy.wait('@transferRequest', { timeout: 10000 }).then((interception) => {
       //    expect(interception.response.statusCode).to.eq(200);
       //});
    });

    it('Buscar - Backlog', () => {
        cy.workCenterFlow('search.backlog');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
      
});