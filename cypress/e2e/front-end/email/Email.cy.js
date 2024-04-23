describe('Novo e-mail', () => {
    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'), true);
      cy.workCenterFlow('newEmail');
    });
  
    it('Novo e-mail - Novo e-mail', () => {
      cy.xAttendanceCard('email');
    });
    
    it('Novo e-mail - Cancelar', () => {
      cy.wait(3000);
      cy.xAttendanceCard('email');
      cy.getByData('email-screen-attendance-header-btn-cancel').click();
      const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6\\.dll\\?WSNewEmailMessage\\?agentid=${Cypress.env('id')}&wid=${Cypress.env('wid')}&rid=${Cypress.env('rid')}`);
      cy.intercept('DELETE', urlRegex).as('deleteNewEmailRequest');
      cy.windowYesOrNo('y');
      cy.wait('@deleteNewEmailRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('Novo e-mail - Classificar', () => {
      cy.wait(3000);
      cy.xAttendanceCard('email');
      cy.xClassify('email', 0);
    });

    it('Novo e-mail - Enviar', () => {
      cy.workCenterFlow('newEmail');
      cy.wait(3000);
      cy.get('.email-tag-field-input').first().type('teste@teste.com.br');
      cy.get('.email-tag-field-input').first().type('{enter}');
      cy.getByData('email-screen-textfield-subject').click().type(Cypress.env('baseFieldTest'));
      cy.get('.email-container-border').click().type(Cypress.env('baseFieldTest'));
      cy.getByData('email-screen-htmleditor').click().find('textarea').type(Cypress.env('baseFieldTest')); //TODO criar perfil sem html editor
      //cy.getByData('email-screen-htmleditor').click().type(Cypress.env('baseFieldTest'));

      //cy.intercept('POST', /\/xgen_desenv6.dll\?WSEmailAction\?wid=\w+-\w+-\w+-\w+-\w+&rid=\w+-\w+-\w+-\w+-\w+&json=1&t=\d+/).as('sendEmailRequest');                     
      //cy.getByData('email-screen-attendance-header-btn-send').click();
      //cy.wait('@sendEmailRequest', { timeout: 10000 }).then((interception) => {
      //  expect(interception.response.statusCode).to.eq(200);
      //});
    });

    it('Novo e-mail - Erro ao enviar', () => {
      cy.workCenterFlow('newEmail');
      cy.wait(3000);
      cy.getByData('email-screen-attendance-header-btn-send').click();
      cy.alertWindow('E-mailOcorreram erros ao enviar o email:É necessario um endereço de email É necessario um endereço PARA de email O assunto do email não pode ser vazio O corpo do email não pode ser vazio0%0%OKYesNoCancel');
      cy.windowYesOrNo('ok');
      cy.getByData('email-screen-email-tag-field').find('input').type('teste@teste.com.br {enter}');
      cy.getByData('email-screen-attendance-header-btn-send').click();
      cy.alertWindow('E-mailOcorreram erros ao enviar o email:O assunto do email não pode ser vazio O corpo do email não pode ser vazio0%0%OKYesNoCancel');
      cy.windowYesOrNo('ok');
      cy.getByData('email-screen-textfield-subject').click().type(Cypress.env('baseFieldTest'));
      cy.getByData('email-screen-attendance-header-btn-send').click();
      cy.alertWindow('E-mailOcorreu erro ao enviar o email:O corpo do email não pode ser vazio0%0%OKYesNoCancel');
    });
  });