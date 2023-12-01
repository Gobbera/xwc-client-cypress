describe('Open Activities', () => {
    beforeEach(() => {
      cy.wait(3000);
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it('Should create a new activity', () => {
      cy.getByData('workcenter-screen-btn-activity').click();
      cy.getByData('activity-session-window-header-close').click();
      cy.getByData('workcenter-screen-btn-activity').type('{downarrow}');
      cy.getByData('workcenter-screen-btn-new-activity').click();
      cy.windowTitleIs('Nova Atividade');
      cy.get('.fa-exclamation-circle').should('exist');
      cy.getByData('activity-new-window-btn-create').invoke('attr', 'class').should('include', 'x-btn-disabled');
      cy.getByData('activity-new-window-combo-session-file-layout').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}');
      cy.wait(2000);
      cy.getByData('activity-new-window-checkbox-new-activity').click();
      cy.get('.x-grid-item-container').click();
      cy.wait(2000);
      cy.intercept('GET', /\/xgen_desenv6.dll\?OnActivity\?c=0&p1=\d+&p2=\w+-\w+-\w+-\w+-\w+&p3=&p4=\w+&t=\d+/).as('onNewActivityRequest');
      cy.getByData('activity-new-window-btn-create').click();
      cy.wait('@onNewActivityRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.toastNotification('Criado com sucesso.');
      cy.classificationRequest('activity');
      cy.intercept('PATCH', /\/xgentest6-desenv.xgen.com.br\/v1\/users\/ActivitiesSession\/\d+/).as('onTurnOffActivityRequest');
      cy.getByData('activity-screen-btn-turn-off-interaction').click();
      cy.wait('@onTurnOffActivityRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.toastNotification('Salvo com sucesso!');
      //cy.getByData('form-innerCt-textfield-segmento').type(Cypress.env('baseFieldTest'));
      //cy.getByData('form-innerCt-textfield-telefone').type(Cypress.env('baseFieldTest'));
      //cy.getByData('form-innerCt-textfield-nome').type(Cypress.env('baseFieldTest'));
      //cy.getByData('activity-new-window-btn-client-persons-and-contacts-new').click();
      //cy.getByData('new-person-activity-textfield-client-contact-name').type(Cypress.env('baseFieldTest'));
      //cy.getByData('container-targetEl-textfield-textfield--inputel').first().within(() => {
      //  cy.get('[placeholder="Phone"]').type('5519994567123');
      //});
      //cy.getByData('container-targetEl-textfield-textfield--inputel').eq(1).within(() => {
      //  cy.get('[placeholder="Email"]').type('teste@email.com');
      //});
      //cy.getByData('new-person-activity-textareafield-client-contact-note').type(Cypress.env('baseFieldTest'));
      //cy.getByData('activity-new-window-btn-create').click();
      // cy.get('[data-e2e="form-innerCt-textfield-origem"]').within(() => {
      //cy.get('[data-e2e="form-innerCt-textfield-categoria"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-condominio"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-endereco"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-cidade"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-estado"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-cep"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-filial"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-cnpj"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-motivo"]').type(Cypress.env('baseFieldTest'));
      //cy.get('[data-e2e="form-innerCt-textfield-submotivo"]').type(Cypress.env('baseFieldTest'));
    });
  });