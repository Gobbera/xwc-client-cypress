describe('Status', () => {
    beforeEach(() => {
        cy.wait(3000);
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    
    it('Status - Disponível',() => {
        cy.setOperatorStatus('Disponivel');
        cy.wait(3000);
    });

    it('Status - Online',() => {
        cy.setOperatorStatus('Online');
        cy.wait(3000);
    });

    it('Status - Offline',() => {
        cy.setOperatorStatus('Offline');
        cy.wait(3000);
    });

    it('Status - Pausa',() => {
        cy.setOperatorStatus('Pausa');
        cy.wait(3000);
    });
});