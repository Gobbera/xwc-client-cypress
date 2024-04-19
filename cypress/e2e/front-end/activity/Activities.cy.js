describe('Atividades', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.login(Cypress.env('username'), Cypress.env('password'), true);
  });
  
  it('Atividades', () => {
    cy.workCenterFlow('activities');
    cy.wait(5000);
    cy.get('.activity-session-header').should('exist');
    cy.get('.x-toolbar-docked-top').should('exist');
    cy.get('.x-grid-item').then(($gridItems) => {
      const totalItems = $gridItems.length -1;
      for (let i = 0; i < totalItems; i++) {
        cy.wait(200);
        let textInCell;
        cy.get('.x-grid-item').eq(i).within(() => {
          cy.get('.x-grid-cell').eq(1).within(() => {
            cy.get('.x-grid-cell-inner')
              .invoke('text')
              .then((text) => {
                textInCell = text.trim();
              });
          })
        });
        cy.get('.activity-session-header').within(() => {
          cy.get('.procotol').then(($element) => {
            const textProtocol = $element.text().trim();
            expect(textProtocol).to.equal(textInCell);
          });
        });
        if (i < totalItems - 1) {
          cy.get('.x-grid-item').eq(i + 1).click();
        }
      }
    });
  });
 
  it('Atividades - Backlog', () => {
    cy.workCenterFlow('activities.activity-backlog'); //TODO trocar no client para somente backlog
  });

  it('Atividades - Nova atividade - Verificar no grid', () => {
    cy.workCenterFlow('activities.new-activity');
    cy.get('.fa-exclamation-circle').should('exist');
    cy.getByData('activity-new-window-btn-create').invoke('attr', 'class').should('include', 'x-btn-disabled');
    cy.getByData('activity-new-window-combo-session-file-layout').type('{downarrow}{enter}');
    cy.getByData('activity-new-window-checkbox-new-activity').click();
    cy.get('.x-grid-item-container').click();
    cy.getByData('activity-new-window-btn-create').click();
    cy.workCenterFlow('activities');
    cy.getByData('activity-session-window-header-filter').click();
    cy.getByData('activity-session-filter-form-datefield-attendance-date-start').find('input').clear().type('19/04/2024');
    //cy.intercept('GET', /\/xgen_desenv6.dll\?OnActivity\?c=0&p1=\d+&p2=\w+-\w+-\w+-\w+-\w+&p3=&p4=\w+&t=\d+/).as('onNewActivityRequest');
    //cy.wait('@onNewActivityRequest', { timeout: 10000 }).then((interception) => {
    //  expect(interception.response.statusCode).to.eq(200);
    //});
    cy.xToastNotification('Criado com sucesso.');
  });

  it.only('Atividades - Nova atividade - Atender agora', () => {
    cy.workCenterFlow('activities.new-activity');
    cy.get('.fa-exclamation-circle').should('exist');
    cy.getByData('activity-new-window-btn-create').invoke('attr', 'class').should('include', 'x-btn-disabled');
    cy.getByData('activity-new-window-combo-session-file-layout').type('{downarrow}{enter}');
    cy.getByData('activity-new-window-checkbox-new-activity').click();
    cy.getByData('activity-new-window-persons-grid').click();
    cy.getByData('activity-new-window-btn-switch-open-now').click();
    cy.getByData('activity-new-window-btn-create').click();
    cy.wait(3000);
    cy.xAttendanceCard('task');
    //cy.intercept('GET', /\/xgen_desenv6.dll\?OnActivity\?c=0&p1=\d+&p2=\w+-\w+-\w+-\w+-\w+&p3=&p4=\w+&t=\d+/).as('onNewActivityRequest');
    //cy.wait('@onNewActivityRequest', { timeout: 10000 }).then((interception) => {
    //  expect(interception.response.statusCode).to.eq(200);
    //});
    cy.xToastNotification('Criado com sucesso.');
  });
});