describe('Open properties', () => {
    const phrase = 'teste';
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.getByData('workcenter-screen-btn-properties').click();
    });

    it('Open properties and test the components and functionalities', () => {
        cy.windowTitleIs('Propriedades');
        cy.getByData('property-window-btn-quick-phrases').first().within(() => {
            cy.get('.x-tab-inner').should('exist').and('have.text', 'Frases Rápidas');
        });
        cy.getByData('property-window-btn-window-attendance').first().within(() => {
            cy.get('.x-tab-inner').should('exist').and('have.text', 'Atendimentos');
        });
        cy.getByData('property-window-quick-phrases-textfield-description').first().within(() => {
            cy.get('.x-autocontainer-innerCt').should('exist').and('have.text', 'Use as frases rápidas como suporte ao atendimento, facilita e agiliza o atendimento. Cada frase pode ter até 300 caracteres.');
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase1').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase2').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase3').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase4').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase5').should('exist');

        cy.getByData('property-window-btn-window-attendance').click();

        cy.getByData('property-window-attendance-combo-capacity-online').click().then(() => {
            for (let i = 0; i < 12; i++) {
                cy.get('.x-boundlist-item').contains(i.toString()).should('exist');
            }
        });
        cy.getByData('property-window-attendance-combo-capacity-online').within(() => {
            cy.get('.x-form-arrow-trigger').click();
        });

        cy.wait(3000);

        cy.getByData('property-window-attendance-combo-capacity-offline').click().then(() => {
            for (let i = 0; i < 12; i++) {
                cy.get('.x-boundlist-item').contains(i.toString()).should('exist');
            }
        });
        cy.getByData('property-window-attendance-combo-capacity-offline').within(() => {
            cy.get('.x-form-arrow-trigger').click();
        });

        cy.getByData('property-window-btn-ok').click();
    });
});  