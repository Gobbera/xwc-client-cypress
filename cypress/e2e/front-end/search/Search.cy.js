describe('Busca', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'), true);
        cy.workCenterFlow('search.search-email-in-queue');
        cy.wait(3000);
        cy.xSelectAttendanceItem(1);
        cy.xGetAttendanceItem();
        cy.closeWindow('attendance-search');
    });

    it('Buscar - Email na fila', () => {
        //TODO
    });

    it('Buscar - Email na fila - Transferir para segmento', () => {
        cy.getByData('email-screen-attendance-header-btn-action').click();
        cy.getByData('email-screen-attendance-header-action-menu-btn-transfer').click();
        cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_DRAFT_SAVED);
        cy.isDisabled('attendance-transfer-btn-transfer-attendance');
        cy.wait(5000);
        cy.getByData('attendance-transfer-tab-calltype').should('exist');
        cy.xTransferAttendance('segment');
    });
    
    it('Buscar - Email na fila - Transferir para operador', () => {
        cy.getByData('email-screen-attendance-header-btn-action').click();
        cy.getByData('email-screen-attendance-header-action-menu-btn-transfer').click();
        cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_DRAFT_SAVED);
        cy.isDisabled('attendance-transfer-btn-transfer-attendance');
        cy.wait(5000);
        cy.getByData('attendance-transfer-tab-calltype').should('exist');
        cy.xTransferAttendance('operator');
    });

    it('Buscar - Email na fila - Classificar', () => {
        cy.get('.pending-action').should('exist');
        cy.xClassifyAttendance('email', 0);
        cy.getByData('email-screen-btn-classification').click();
    });

    //it('Buscar - Backlog', () => {
    //    cy.workCenterFlow('search.backlog');
    //});

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
      
});