describe('Create and send a new email', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('Create and send a new email', () => {
    cy.viewport(1600, 900)
    cy.getByData('workcenter-screen-btn-email').click();
    cy.wait(1000);
    cy.getByData('email-smtp-account-btn-new-email').click();
    cy.wait(3000);
    cy.get('.email-tag-field-input').first().type(Cypress.env('email'));
    //cy.intercept('GET', 'xgentest6-desenv.xgen.com.br/v1/users/contacts?q=&types=Email&offset=0&limit=25').as('emailContactsListRequest');
    //cy.wait('@emailContactsListRequest', { timeout: 10000 }).then((interception) => {
    //  expect(interception.response.statusCode).to.eq(200);
    //});                    
    cy.wait(2000);
    cy.get('.email-tag-field-input').first().type('{enter}');
    //cy.getByData().contains('.email-tag-field').click();
    cy.getByData('email-screen-textfield-subject').click().type(Cypress.env('baseFieldTest'));
    //cy.getByData('email-screen-email-attendance-header-btn-attachment').click();
    //cy.getByData('email-screen-email-attendance-header-attachment-menu-btn-add').click();
    cy.get('.email-container-border').click().type(Cypress.env('baseFieldTest'));
    cy.intercept('POST', /\/xgen_desenv6.dll\?WSEmailAction\?wid=\w+-\w+-\w+-\w+-\w+&rid=\w+-\w+-\w+-\w+-\w+&json=1&t=\d+/).as('sendEmailRequest');
                         
    cy.getByData('email-attendance-header-btn-send').click();
    cy.wait('@sendEmailRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});