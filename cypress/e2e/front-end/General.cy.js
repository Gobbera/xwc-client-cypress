describe('General', () => {
    beforeEach(() => {
      cy.wait(1000);
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it.only('Checks the integrity of the client web', () => {
        //Checks attendance tab
        cy.intercept('POST', /\/xgen_desenv6.dll\?WSMMakeLogin\?t=\d+/).as('loginRequest');
        let agentName;
        cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('agent');
            agentName = interception.response.body.agent.name;
            //cy.get('#asset-bottom-container-1112-innerCt').checkContent(`&nbsp;${agentName}&nbsp;|`);
            //cy.get('#container-1116-innerCt').should('be.visible').and('have.text', `&nbsp;${agentName}&nbsp;|`);
        });

        cy.getByData('asset-tab-features-btn-tab-attendance').checkContent(UITEXT.WORKCENTER_ATTENDANCE);
        cy.getByData('asset-tab-features-btn-tab-operator').checkContent(UITEXT.WORKCENTER_OPERATOR);
        cy.getByData('asset-tab-features-btn-tab-portal').checkContent(UITEXT.WORKCENTER_PORTAL);
        cy.getByData('workcenter-screen-btn-disconnect').checkContent(UITEXT.WORKCENTER_DISCONNECT);
        cy.getByData('workcenter-screen-btn-properties').checkContent(UITEXT.WORKCENTER_PROPERTIES);
        cy.get('#button-1046').should('exist');
        cy.get('#button-1046').should('exist');
        cy.getByData('workcenter-screen-combobox-status').checkContent('system');
        cy.getByData('workcenter-screen-btn-search').checkContent(UITEXT.WORKCENTER_SEARCH);
        cy.getByData('workcenter-screen-btn-chat').checkContent(UITEXT.WORKCENTER_NEW_IM_CHAT);
        cy.getByData('workcenter-screen-btn-persons-and-contacts').checkContent(UITEXT.WORKCENTER_PERSONS);
        cy.getByData('workcenter-screen-btn-email').checkContent(UITEXT.WORKCENTER_NEW_EMAIL);
        cy.getByData('workcenter-screen-btn-activity').checkContent(UITEXT.WORKCENTER_ACTIVITIE);
        cy.getByData('workcenter-screen-btn-warning').checkContent(UITEXT.WORKCENTER_NOTIFICATIONS);
        cy.getByData('asset-attedance-container-txt-search').should('exist');
        cy.getByData('asset-attedance-container-btn-search').should('exist');
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
    
        //Check Properties window integrity
        cy.getByData('workcenter-screen-btn-properties').click();
        //cy.windowsHeaderComponent('property-window', UITEXT.PROPERTY_WINDOW_TITLE);
        //cy.get('#property-window-1146').checkContent(UITEXT.PROPERTY_WINDOW_TITLE);
        cy.getByData('property-window-btn-quick-phrases').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASES);
        cy.getByData('property-window-btn-window-attendance').checkContent(UITEXT.PROPERTY_WINDOW_ATTENDANCES);
        //cy.get('#container-1150-innerCt').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASES_DESCRIPTION);
        cy.getByData('property-window-quick-phrases-textfield-phrase1').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASE1);
        cy.getByData('property-window-quick-phrases-textfield-phrase2').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASE2);
        cy.getByData('property-window-quick-phrases-textfield-phrase3').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASE3);
        cy.getByData('property-window-quick-phrases-textfield-phrase4').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASE4);
        cy.getByData('property-window-quick-phrases-textfield-phrase5').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASE5);
        cy.getByData('property-window-btn-ok').checkContent(UITEXT.GENERAL_OK);
        cy.getByData('property-window-btn-cancel').checkContent(UITEXT.GENERAL_CANCEL);

        //Check Properties window attendances tab
        cy.getByData('property-window-btn-window-attendance').click();
        cy.getByData('property-window-attendance-combo-capacity-online').checkContent(UITEXT.PROPERTY_WINDOW_ONLINE_MEDIA);
        cy.getByData('property-window-attendance-combo-capacity-offline').checkContent(UITEXT.PROPERTY_WINDOW_OFFLINE_MEDIA);
        cy.getByData('property-window-attendance-checkbox-turnoff-notification-sound').checkContent(UITEXT.PROPERTY_WINDOW_TURNOFF_NOTIFICATION_SOUND);
        cy.getByData('property-window-attendance-checkbox-turnoff-enter-send-message').checkContent(UITEXT.PROPERTY_WINDOW_TURNOFF_ENTER_SEND_MESSAGE);
        //cy.get('#checkbox-1167-labelTextEl').checkContent(UITEXT.PROPERTY_WINDOW_ATTENDANCES);
        cy.getByData('property-window-btn-cancel').checkContent(UITEXT.GENERAL_CANCEL);
        cy.getByData('property-window-btn-ok').checkContent(UITEXT.GENERAL_OK).click();

        //Check Search window
        cy.getByData('workcenter-screen-btn-search').click();
        //cy.windowsHeaderComponent('attendance-search', UITEXT.ATTENDANCE_WINDOW_TITLE);
        //cy.filterLabelComponent('attendance-search');
        //cy.get('#attendance-search-window-1215').checkContent(UITEXT.SEARCH_WINDOW_TITLE);
        //cy.get('#attendance-search-filter-bar-1248').should('exist');
        //cy.get('#attendance-search-grid-1220').should('exist');
        cy.pagingToolBarComponent('attendance-search-grid');
        cy.wait(5000);
        cy.closeWindow('attendance-search');

        //Checks New Online window

        //Checks CRM window
    });
});
