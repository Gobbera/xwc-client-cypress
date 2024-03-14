describe('Open Activities', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  });
  
  it.only('Should open activities', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.getByData('workcenter-screen-btn-activity').click();
    cy.wait(5000);
    cy.windowTitleIs('Atividade');
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

  it('Should open activities using a user without a data', () => {
    cy.login('bsourceTeste', Cypress.env('password'));
    cy.getByData('workcenter-screen-btn-activity').click();
    cy.wait(5000);
    cy.windowTitleIs('Atividade');
  });
});