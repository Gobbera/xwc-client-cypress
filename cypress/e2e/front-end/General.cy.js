describe('To Draft', () => {
    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    
    it.only('Testing', () => {
      cy.workCenterFlow('search.search-email-in-queue');
    });
});
  