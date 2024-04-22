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

  it.only('Atividades - Nova atividade - Verificar no grid', () => {
    cy.workCenterFlow('activities.new-activity');
    cy.get('.fa-exclamation-circle').should('exist');
    cy.getByData('activity-new-window-btn-create').invoke('attr', 'class').should('include', 'x-btn-disabled');
    cy.getByData('activity-new-window-combo-session-file-layout').type('{downarrow}{enter}');
    cy.getByData('activity-new-window-checkbox-new-activity').click();
    cy.getByData('activity-new-window-persons-grid').click();
    const urlRegex = new RegExp('xgentest6-desenv.xgen.com.br/v1/users/ActivitiesSession')
    cy.intercept('POST', urlRegex).as('postNewActivityRequest');
    cy.getByData('activity-new-window-btn-create').click();
    cy.wait('@postNewActivityRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        const response = interception.request.query;
        Cypress.env('wid', response.p2);
    });
    cy.workCenterFlow('activities');
    cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_CREATED_WITH_SUCCESS);
    cy.getByData('activity-session-window-header-filter').click();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
        day = '0' + dia;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const today = day + '/' + month + '/' + year;
    cy.getByData('activity-session-filter-form-datefield-attendance-date-start').find('input').clear().type(today);
    cy.getByData('activity-session-filter-form-btn-filter').click();
    //TODO: chegar no ultimo criado
  });

  it('Atividades - Nova atividade - Atender agora', () => {
    cy.workCenterFlow('activities.new-activity');
    cy.get('.fa-exclamation-circle').should('exist');
    cy.getByData('activity-new-window-btn-create').invoke('attr', 'class').should('include', 'x-btn-disabled');
    cy.getByData('activity-new-window-combo-session-file-layout').type('{downarrow}{enter}');
    cy.getByData('activity-new-window-checkbox-new-activity').click();
    cy.getByData('activity-new-window-persons-grid').click();
    cy.getByData('activity-new-window-btn-switch-open-now').click();
    cy.newActivityRequest();
    cy.wait(3000);
    cy.xAttendanceCard('task');
    cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_CREATED_WITH_SUCCESS);
  });
});