describe('Open Activities', () => {
    beforeEach(() => {
      cy.wait(3000);
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    
    it('Should open backlog activities', () => {
      cy.getByData('workcenter-screen-btn-activity').click();
      cy.getByData('activity-session-window-header-close').click();
      cy.getByData('workcenter-screen-btn-activity').type('{downarrow}');
      cy.getByData('workcenter-screen-btn-activity-backlog').click();
      cy.wait(5000);
      cy.windowTitleIs('Atividade');
      cy.getByData('activity-session-header-btn-activity-pull').click();
      cy.wait(5000);
      cy.getByData('activity-session-window-header-close').click();
    });
  });