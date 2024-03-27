Cypress.Commands.add('checksTheIntegrity', (context) => {
    switch (context) {
        case 'workcenter':
            cy.getByData('asset-tab-features-btn-tab-attendance').checkContent(UITEXT.WORKCENTER_ATTENDANCE);
            cy.getByData('asset-tab-features-btn-tab-operator').checkContent(UITEXT.WORKCENTER_OPERATOR);
            cy.getByData('asset-tab-features-btn-tab-portal').checkContent(UITEXT.WORKCENTER_PORTAL);
            cy.getByData('workcenter-screen-btn-disconnect').checkContent(UITEXT.WORKCENTER_DISCONNECT);
            cy.getByData('workcenter-screen-btn-properties').checkContent(UITEXT.WORKCENTER_PROPERTIES);
            cy.getByData('workcenter-screen-online-attendances-on-queue').should('exist');
            cy.getByData('workcenter-screen-offline-attendances-on-queue').should('exist');
            cy.getByData('workcenter-screen-combobox-status').checkContent('system');
            cy.getByData('workcenter-screen-btn-search').checkContent(UITEXT.WORKCENTER_SEARCH);
            cy.getByData('workcenter-screen-btn-chat').checkContent(UITEXT.WORKCENTER_NEW_IM_CHAT);
            cy.getByData('workcenter-screen-btn-persons-and-contacts').checkContent(UITEXT.WORKCENTER_PERSONS);
            cy.getByData('workcenter-screen-btn-email').checkContent(UITEXT.WORKCENTER_NEW_EMAIL);
            cy.getByData('workcenter-screen-btn-activity').checkContent(UITEXT.WORKCENTER_ACTIVITIE);
            cy.getByData('workcenter-screen-btn-warning').checkContent(UITEXT.WORKCENTER_NOTIFICATIONS);
            cy.getByData('asset-attedance-container-txt-search').should('exist');
            cy.getByData('asset-attedance-container-btn-search').should('exist');
            break;

        case 'properties':
            cy.windowsHeaderComponent('property-window', UITEXT.PROPERTY_WINDOW_TITLE);
            cy.getByData('property-window').should('exist');
            cy.getByData('property-window-btn-quick-phrases').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASES);
            cy.getByData('property-window-btn-window-attendance').checkContent(UITEXT.PROPERTY_WINDOW_ATTENDANCES);
            cy.getByData('property-window-quick-phrases-textfield-description').checkContent(UITEXT.PROPERTY_WINDOW_QUICK_PHRASES_DESCRIPTION);
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
            cy.getByData('property-window-attendance-checkbox-turnoff-message-sound').checkContent(UITEXT.PROPERTY_WINDOW_ATTENDANCES);
            cy.getByData('property-window-btn-cancel').checkContent(UITEXT.GENERAL_CANCEL);
            cy.getByData('property-window-btn-ok').checkContent(UITEXT.GENERAL_OK);
            break;

        case 'search':
            cy.windowsHeaderComponent('attendance-search', UITEXT.ATTENDANCE_WINDOW_TITLE);
            cy.windowHeaderTools('attendance-search');
            cy.filterLabelComponent('attendance-search');
            cy.getByData('attendance-search-grid').should('exist');
            cy.pagingToolBarComponent('attendance-search-grid');
            cy.getByData('attendance-search-right-panel').should('exist');
            cy.getByData('interaction-search-header').should('exist');
            cy.getByData('interaction-search-header-text-attendance-summary').checkContent('Resumo de Atendimento');
            cy.getByData('interaction-search-header-attendance-summary-icon').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-online-open').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-open').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-online-queue-pick').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-classification').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-message-historic-email').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-open-draft').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-open-from-queue').should('exist');
            cy.getByData('interaction-search-header-attendance-summary-interaction-item-print').should('exist');
            cy.getByData('interaction-search-header-attendance-details').should('exist');
            cy.getByData('interaction-search-header-attendance-details-protocol').should('exist');
            cy.getByData('interaction-search-header-attendance-details-identification').should('exist');
            cy.getByData('interaction-search-header-seg-info').should('exist');
            cy.getByData('interaction-search-header-seg-info-segment').should('exist');
            cy.getByData('interaction-search-header-seg-info-agent-title').should('exist');
            cy.getByData('interaction-search-header-data-view').should('exist');
            cy.getByData('interaction-search-header-attendance-status').should('exist');
            cy.getByData('interaction-search-header-attendance-status-status').should('exist');
            cy.getByData('interaction-search-header-attendance-created-at').should('exist');
            cy.getByData('interaction-search-header-attendance-closed-at').should('exist');
            cy.getByData('interactions-view-tabbtn-related').checkContent('Relacionadas');
            cy.getByData('interactions-view-tabbtn-informations').checkContent('Informações');
            cy.getByData('attendance-related-pagingtoolbar-btn--fas fa-plus').should('exist');
            cy.getByData('attendance-related-pagingtoolbar-btn-page-prev').should('exist');
            cy.getByData('attendance-related-pagingtoolbar-numberfield').should('exist');
            cy.getByData('attendance-related-pagingtoolbar-btn-page-next').should('exist');
            cy.getByData('attendance-related-pagingtoolbar-btn-loading').should('exist');
            break;
        
        case 'search.search-email-in-queue':
            break;

        case 'search.search-calls-in-queue':
            break;

        case 'search.search-last-calls':
            break;

        case 'search.backlog':
            break;

        case 'crm':
            cy.windowsHeaderComponent('person-and-contacts', UITEXT.WORKCENTER_PERSONS);
            cy.getByData('person-window-tabpanel').should('exist');
            cy.getByData('activity-new-window-persons-grid').should('exist');
            cy.getByData('activity-new-window-persons-grid-grid-search-text').checkContent(UITEXT.GENERAL_TEXT);
            cy.getByData('person-window-combo-person').checkContent(UITEXT.GENERAL_PERSON);
            cy.getByData('person-window-btn-merge-person').checkContent(UITEXT.PERSON_WINDOW_MERGE_PERSON);
            cy.getByData('person-window-btn-associate-person').checkContent(UITEXT.PERSON_WINDOW_ASSOCIATE_PERSON);
            cy.getByData('person-window-btn-new-person').checkContent(UITEXT.PERSON_WINDOW_ASSOCIATE_NEW_PERSON);
            cy.getByData('person-window-btn-new-grid-person').checkContent(UITEXT.GENERAL_PERSON);
            cy.getByData('person-window-tabpanel-list').checkContent(UITEXT.GENERAL_LIST);
            cy.pagingToolBarComponent('activity-session');
            break;

        case 'newEmail': 
            cy.getByData('workcenter-screen-btn-email').click();
            cy.getByData('email-screen-tab').should('exist');
            cy.getByData('historic-tab-screen').checkContent(UITEXT.GENERAL_HISTORIC);
            cy.getByData('tasks-tab-screen').checkContent(UITEXT.GENERAL_ACTIVITIES);
            cy.getByData('email-attendance-header-btn-send').checkContent(UITEXT.GENERAL_SEND);
            cy.getByData('email-screen-email-attendance-header-btn-attachment').checkContent(UITEXT.GENERAL_ATTACHMENT);
            cy.getByData('email-screen-email-attendance-header-btn-cancel').checkContent(UITEXT.GENERAL_CANCEL);
            cy.getByData('email-attendance-header-btn-save').should('be.hidden');
            cy.getByData('email-attendance-header-btn-finish').should('be.hidden');
            cy.getByData('email-attendance-header-btn-action').should('be.hidden');
            cy.getByData('email-attendance-header-btn-action').should('be.hidden');
            cy.getByData('email-screen-btn-classification').should('exist');
            cy.getByData('email-channel-tag-field').checkContent('Tags');
            cy.getByData('email-screen-btn-messages-to').checkContent('Para');
            cy.getByData('email-channel-tag-field').should('exist');
            cy.getByData('email-screen-btn-cc').checkContent('Cc');
            cy.getByData('email-screen-btn-bcc').checkContent('Bcc');
            cy.getByData('email-screen-textfield-subject').should('exist');
            cy.getByData('email-screen-htmleditor').should('exist');
            
            cy.getByData('attendance-container-tab-informations').should('exist');
            cy.getByData('attendance-container-tab-related').should('exist');
            cy.getByData('attendance-container-tab-faq').should('exist');
            cy.getByData('client-data-screen-header').checkContent('Contato');
            cy.getByData('client-data-screen-header-collapse-top').should('exist');
            cy.getByData('client-data-screen-combobox-type').checkContent(UITEXT.GENERAL_TYPE_DOTS);
            cy.getByData('client-data-screen-textfield-name').checkContent(UITEXT.GENERAL_NAME_DOTS);
            cy.getByData('client-data-screen-text-associate-contact').checkContent(UITEXT.GENERAL_IDENTIFICATION_DOTS);
            cy.getByData('client-data-btn-associate-contact').should('exist');
            cy.getByData('informations-screen-header').checkContent('Informações');
            cy.getByData('informations-screen-header-collapse-top').should('exist');
                break;

        case 'newEmail.historic':
            cy.pagingToolBarComponent('attendance-search-grid');
            break;

        case 'newEmail.activities':
            cy.getByData('activity-session-attendance-header-combo-historic-status').should('exist');
            break;
            
        case 'activities':
            cy.getByData('activity-session-window-header').should('Atividade');
            cy.pagingToolBarComponent('activity-session');
            break;

        case 'activities.new-activity':
            cy.getByData('activity-new-window-combo-session-file-layout').checkContent('Layout');
            cy.getByData('activity-new-window-combo-type').should('exist');
            cy.getByData('activity-new-window-combo-priority').should('exist');
            cy.getByData('activity-new-window-textfield-client-contact-title').checkContent('Titulo');
            cy.getByData('activity-new-window-session-fill-data').should('exist');
            cy.getByData('activity-new-window-card-virtual-tabs').should('exist');
            cy.getByData('activity-new-window-tabbtn-client-persons-and-contacts').checkContent('Pessoas e Contatos');
            cy.getByData('activity-new-window-tabbtn-client-persons-and-contacts-new').checkContent('Adicionar Pessoa');
            cy.getByData('activity-new-window-persons-grid').should('exist');
            cy.getByData('activity-new-window-persons-grid-grid-search-text').should('exist');
            cy.pagingToolBarComponent('activity-new-window-persons-grid');
            cy.getByData('activity-new-window-exclamation-icon').should('exist');
            cy.getByData('activity-new-window-checkbox-new-activity').should('exist');
            cy.getByData('activity-new-window-btn-switch-open-now').checkContent('Atender Agora');
            cy.getByData('activity-new-window-btn-create').should('Criar');
            break;

        case 'activities.new-activity.client-persons-and-contacts-new':
    
        case 'activities.backlog':
            break;        
    } 
});
