describe('General', () => {
    beforeEach(() => {
      cy.wait(1000);
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });

<<<<<<< Updated upstream
    //it.only('Checks the integrity of the client web', () => {     
    //  cy.workCenterFlow('activities');
    //  cy.xFilter('activity-session', 'by', [
    //    { fieldName: "attendance-protocol" , value: '2024031100046945'},
    //    { fieldName: "client-contact-title", value:'Teste'}
    //  ]);
    //});
    // it.only('Checks the integrity of the client web', () => {     
    //   cy.workCenterFlow('properties.attendances');
    // });
    //it.only('Checks the integrity of the client web', () => {     
    //  cy.workCenterFlow('activities.backlog');
    //});
    // it.only('Checks the integrity of the client web', () => {     
    //   cy.workCenterFlow('activities.backlog');
    // });
    it.only('Checks the integrity of the client web', () => {     
      cy.workCenterFlow('crm.automation-tasks');
    });
});      
       

















       /*
        //Checks attendance tab

        //cy.get('#main-select-attendance-1106').checkContent(UITEXT.WORKCENTER_SELECT_SERVICES);
        //cy.get('#asset-bottom-container-1112-innerCt').checkContent(Cypress.env('URL_DLL'));
        
        //cy.get('#asset-bottom-container-1112-innerCt').checkContent(`${'6.24.03.134'}&nbsp;|`);
        //cy.get('#asset-bottom-container-1112-innerCt').checkContent('&nbsp;Conectado');
        //cy.get('#attendance-feature-1125-innerCt').should('be.visible');
        
        //Checks operator tab
        //cy.getByData('asset-tab-features-btn-tab-operator').click();
        //cy.getByData('operator-screen-panel-btn-operator-productivity').checkContent(UITEXT.OPERATOR_PRODUCTIVITY);
        //cy.getByData('operator-screen-panel-btn-operator-clock').checkContent(UITEXT.OPERATOR_CLOCK);
        //cy.getByData('operator-screen-panel-btn-operator-notes').checkContent(UITEXT.OPERATOR_NOTES);
        //cy.getByData('operator-screen-panel-btn-operator-schedules').checkContent(UITEXT.OPERATOR_SCHEDULES);
        //cy.get('#main-select-attendance-1106').checkContent(UITEXT.WORKCENTER_SELECT_SERVICES);
        
        //Checks Portal tab
        //cy.getByData('asset-tab-features-btn-tab-portal').click();
        */
 
=======
    it.only('Checks the integrity of the client web', () => {     
      cy.workCenterFlow('search');
    });
});
>>>>>>> Stashed changes
