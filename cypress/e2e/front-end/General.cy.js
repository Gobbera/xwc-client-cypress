describe('General', () => {
    beforeEach(() => {
      cy.wait(3000);
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it.only('Checks the integrity of the client web', () => {
        cy.getByData('workcenter-screen-btn-disconnect').should('exist').and('have.text', 'Desconectar');
        cy.getByData('workcenter-screen-btn-properties').should('exist').and('have.text', 'Propriedades');
    });
});
