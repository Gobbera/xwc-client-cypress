describe('Busca', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'), true);
    });

    it('Buscar - Email na fila', () => {
        cy.workCenterFlow('search.search-email-in-queue');
        //cy.searchRequest('%5B%7B%22property%22%3A%22isAnswered%22%2C%22value%22%3A%221%22%7D%2C%7B%22property%22%3A%22groupedProtocol%22%2C%22value%22%3A%221%22%7D%2C%7B%22property%22%3A%22agentId%22%2C%22value%22%3A%221886%22%7D%5D')
        //cy.viewerRequest();
        cy.getByData('interaction-search-header-attendance-details-protocol');
        cy.closeWindow('attendance-search');
        //cy.getByData('asset-bottom-container-current-attendance-protocol').checkContent(protocol);
    });
});