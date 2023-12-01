describe('Open Activities', () => {
  beforeEach(() => {
    cy.wait(3000);
    cy.viewport(1600, 900);
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('Should open activities', () => {
    cy.getByData('workcenter-screen-btn-activity').click();
    cy.wait(5000);
    cy.windowTitleIs('Atividade');
  });
});