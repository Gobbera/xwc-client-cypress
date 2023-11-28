describe('template spec', () => {
    it('passes', () => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
      emailTest();
    });
    
    function emailTest () {
      cy.getByData('workcenter-screen-btn-search').click();
    }
    /* function emailTest () {
      cy.get('[data-e2e="workcenter-screen-btn-search"]').within(() => {
            cy.wait(3000);
            cy.get('.x-btn-arrow-el').click();
        });
    } */
    
    
});