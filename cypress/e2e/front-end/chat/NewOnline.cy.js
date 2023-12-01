describe('New Online window', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it('Open new Online window', () => {
        cy.getByData('workcenter-screen-btn-chat').click();
        cy.windowTitleIs('Novo Online');
        cy.getByData('workcenter-imchat-combobox-workcenter-item-new-chat-queue-from').click().type('{downarrow}{enter}');
    });
});