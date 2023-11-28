describe('Disconnect from the client web ', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('/');
  });

  it('Should disconnect from the client web', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.wait(10000);
    cy.getByData('workcenter-screen-btn-disconnect').click();
    cy.intercept('POST', /\/xgen_desenv6.dll\?WSMMakeLogout\?agentId=\d+&json=1&t=\d+/).as('disconnectRequest');
                           
    cy.hitYesButton();
    cy.wait('@disconnectRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});