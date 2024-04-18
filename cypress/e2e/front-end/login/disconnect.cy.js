describe('Interface', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('/');
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('Interface - Logout', () => {
    cy.getByData('workcenter-screen-btn-disconnect').click();
    cy.alertWindow(UITEXT.WARNING_DISCONNECT_LOGOUT_MESSAGE);
    cy.intercept('PATCH', /\/xgentest-desenv.xgen.com.br\/v1\/users\/users\/self\/logout/).as('disconnectRequest');                    
    cy.windowYesOrNo('y');
    cy.wait('@disconnectRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});