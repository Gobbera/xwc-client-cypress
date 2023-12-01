describe('Create and send a new email', () => {
    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });
  
    it('Should cancel a new email', () => {
      cy.getByData('workcenter-screen-btn-email').click();
      cy.wait(3000);
      cy.getByData('email-smtp-account-btn-new-email').click();
      cy.getByData('email-attendance-header-btn-action').click();
      cy.getByData('email-attendance-header-action-menu-btn-cancel').click();
      cy.hitYesButton();
    });
  });