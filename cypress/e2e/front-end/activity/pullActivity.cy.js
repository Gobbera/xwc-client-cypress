describe('Pull activity', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });
  it('Should pull activities', () => {
    cy.getByData('workcenter-screen-btn-activity').click();
    cy.wait(5000);
    cy.getByData('activity-session-header-btn-activity-pull').click();
    cy.wait(5000);
    cy.getByData('activity-session-window-header-close').click();
  });
});