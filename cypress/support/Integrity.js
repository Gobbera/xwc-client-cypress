// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

//Util commands
Cypress.Commands.add('checksTheIntegrity', (context, action) => {
    cy.getByData('asset-tab-features-btn-tab-attendance').checkContent(UITEXT.WORKCENTER_ATTENDANCE);
    cy.getByData('asset-tab-features-btn-tab-operator').checkContent(UITEXT.WORKCENTER_OPERATOR);
    cy.getByData('asset-tab-features-btn-tab-portal').checkContent(UITEXT.WORKCENTER_PORTAL);
    cy.getByData('workcenter-screen-btn-disconnect').checkContent(UITEXT.WORKCENTER_DISCONNECT);
    cy.getByData('workcenter-screen-btn-properties').checkContent(UITEXT.WORKCENTER_PROPERTIES);
    cy.get('#button-1046').should('exist');//todo
    cy.get('#button-1046').should('exist');//todo
    cy.getByData('workcenter-screen-combobox-status').checkContent('system');
    cy.getByData('workcenter-screen-btn-search').checkContent(UITEXT.WORKCENTER_SEARCH);
    cy.getByData('workcenter-screen-btn-chat').checkContent(UITEXT.WORKCENTER_NEW_IM_CHAT);
    cy.getByData('workcenter-screen-btn-persons-and-contacts').checkContent(UITEXT.WORKCENTER_PERSONS);
    cy.getByData('workcenter-screen-btn-email').checkContent(UITEXT.WORKCENTER_NEW_EMAIL);
    cy.getByData('workcenter-screen-btn-activity').checkContent(UITEXT.WORKCENTER_ACTIVITIE);
    cy.getByData('workcenter-screen-btn-warning').checkContent(UITEXT.WORKCENTER_NOTIFICATIONS);
    cy.getByData('asset-attedance-container-txt-search').should('exist');
    cy.getByData('asset-attedance-container-btn-search').should('exist');
    switch (context) {
        case 'properties':
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
            break;
        case 'properties.attendance':
            cy.getByData('property-window-attendance-combo-capacity-online').checkContent(UITEXT.PROPERTY_WINDOW_ONLINE_MEDIA);
            cy.getByData('property-window-attendance-combo-capacity-offline').checkContent(UITEXT.PROPERTY_WINDOW_OFFLINE_MEDIA);
            cy.getByData('property-window-attendance-checkbox-turnoff-notification-sound').checkContent(UITEXT.PROPERTY_WINDOW_TURNOFF_NOTIFICATION_SOUND);
            cy.getByData('property-window-attendance-checkbox-turnoff-enter-send-message').checkContent(UITEXT.PROPERTY_WINDOW_TURNOFF_ENTER_SEND_MESSAGE);
            //cy.get('#checkbox-1167-labelTextEl').checkContent(UITEXT.PROPERTY_WINDOW_ATTENDANCES);
            cy.getByData('property-window-btn-cancel').checkContent(UITEXT.GENERAL_CANCEL);
            cy.getByData('property-window-btn-ok').checkContent(UITEXT.GENERAL_OK);
            break;
        case 'search':
            //cy.windowsHeaderComponent('attendance-search', UITEXT.ATTENDANCE_WINDOW_TITLE);
            //cy.windowHeaderTools('attendance-search');
            //cy.filterLabelComponent('attendance-search');
            //cy.get('#attendance-search-grid-1220').should('exist');
            //cy.get('#gridview-1396').should('exist'); //attendance-resume
            //TODO: atendance-resume 
            cy.pagingToolBarComponent('attendance-search-grid');
            break;
        case 'crm':
            //cy.windowsHeaderComponent('person-and-contacts', UITEXT.person-and-contacts);
            //cy.windowHeaderTools('person-and-contacts');
            //cy.filterLabelComponent('person-and-contacts');
            cy.getByData('activity-new-window-persons-grid-grid-search-text').checkContent(UITEXT.GENERAL_TEXT);
            //cy.get('#person-and-contacts-grid').should('exist');
            cy.getByData('person-window-combo-person').checkContent(UITEXT.GENERAL_PERSON);
            cy.getByData('person-window-btn-merge-person').checkContent(UITEXT.PERSON_WINDOW_MERGE_PERSON);
            cy.getByData('person-window-btn-associate-person').checkContent(UITEXT.PERSON_WINDOW_ASSOCIATE_PERSON);
            cy.getByData('person-window-btn-new-person').checkContent(UITEXT.PERSON_WINDOW_ASSOCIATE_NEW_PERSON);
            cy.getByData('person-window-btn-new-grid-person').checkContent(UITEXT.GENERAL_PERSON);
            cy.getByData('person-window-tabpanel-list').checkContent(UITEXT.GENERAL_LIST);
            cy.pagingToolBarComponent('activity-new-window-persons-grid');
        case 'newEmail': 
            cy.getByData('workcenter-screen-btn-email').click();
            cy.getByData('email-screen-tab').should('exist');
            cy.getByData('historic-tab-screen').checkContent(UITEXT.GENERAL_HISTORIC);
            cy.getByData('tasks-tab-screen').checkContent(UITEXT.GENERAL_ACTIVITIES);
            cy.getByData('email-attendance-header-btn-send').checkContent(UITEXT.GENERAL_SEND);
            cy.getByData('email-screen-email-attendance-header-btn-attachment').checkContent(UITEXT.GENERAL_ATTACHMENT);
            //cy.getByData('email-screen-email-attendance-header-btn-cancel').checkContent(UITEXT.GENERAL_CANCEL);
            cy.getByData('email-attendance-header-btn-save').should('be.hidden');
            cy.getByData('email-attendance-header-btn-finish').should('be.hidden');
            cy.getByData('email-attendance-header-btn-action').should('be.hidden');
            //cy.getByData('email-attendance-header-btn-action').should('be.hidden'); nao requer resposta
            cy.getByData('email-screen-btn-classification').should('exist');
            cy.getByData('email-channel-tag-field').checkContent('Tags');
            cy.getByData('email-screen-btn-messages-to').checkContent('Para');
            //cy.get('#email-tag-field-1272-inputEl').should('exist');
            cy.getByData('email-screen-btn-cc').checkContent('Cc');
            cy.getByData('email-screen-btn-bcc').checkContent('Bcc');
            cy.getByData('email-screen-textfield-subject').should('exist');
            cy.getByData('email-screen-htmleditor').should('exist');
            //cy.get('#contact-details-container-1314').should('exist'); //contact-details
            //cy.windowsHeaderComponent('contact-details', 'Contato');
            cy.getByData('client-data-screen-header-collapse-top').should('exist');
            //cy.getByData('contact-details-tab-contact').should('exist');
            //cy.getByData('contact-details-tab-link').should('exist');
            //cy.getByData('contact-details-tab-faq').should('exist');
            cy.getByData('client-data-screen-combobox-type').checkContent(UITEXT.GENERAL_TYPE_DOTS);
            cy.getByData('client-data-screen-textfield-name').checkContent(UITEXT.GENERAL_NAME_DOTS);
            cy.getByData('form-targetEl-textfield-textfield--inputel').checkContent(UITEXT.GENERAL_IDENTIFICATION_DOTS);
            cy.getByData('client-data-screen-associate-contact').should('exist');
            //cy.windowsHeaderComponent('contact-informations', 'Informações');
            //campos customizados
            cy.getByData('informations-screen-header-collapse-top').should('exist');
            //aba de relacionados
            //aba de faq
            
            case 'newEmail.historic':
                //cy.get('#gridview-1396').should('exist');
                cy.pagingToolBarComponent('attendance-search-grid');
            break;

            case 'newEmail.activities':
                cy.getByData('activity-session-attendance-header-combo-historic-status').should('exist');
            break;

            case 'activities':
                cy.pagingToolBarComponent('attendance-search-grid');
            break;
         
    } 
});


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })