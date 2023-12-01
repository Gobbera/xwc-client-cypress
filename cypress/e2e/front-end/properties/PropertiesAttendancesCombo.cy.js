describe('Open properties', () => {
    const phrase = 'teste';
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.getByData('workcenter-screen-btn-properties').click();
    });

    it('Should be noted that you cannot exceed the limit of 12 attendances', () => {
        cy.getByData('property-window-btn-window-attendance').click();

        cy.getByData('property-window-attendance-combo-capacity-offline').click();
        cy.get('.x-boundlist-item').contains('10').click();
        
        cy.getByData('property-window-btn-ok').click();
        cy.getByData('workcenter-screen-btn-properties').click();
        cy.getByData('property-window-btn-window-attendance').click();

        cy.getByData('property-window-attendance-combo-capacity-online').click();
        cy.get('.x-boundlist-item').contains('10').click();

        cy.getByData('property-window-btn-ok').click();

        cy.windowTitleIs('Atenção');
        cy.get('.x-message-box-warning').should('exist');
        cy.get('.x-btn-default-small').contains('OK').first().click();
        //cy.get('.x-window-text').should('exist').and('have.text', 'Você não pode configurar mais do que 12 atendimento(s) simulatâneo(s)');
    });
});  