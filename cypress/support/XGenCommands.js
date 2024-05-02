//Components XGen
Cypress.Commands.add('xWindowHeaderTools', (context) => {
    cy.getByData(`${context}-window-header-collapse-top`).should('exist');
    cy.getByData(`${context}-window-header-filter`).should('exist');
    cy.getByData(`${context}-window-header-refresh`).should('exist');
    cy.getByData(`${context}-window-header-close`).should('exist');
});

Cypress.Commands.add('xFilterLabelComponent', (context) => {
    cy.getByData(`${context}-filter-bar`).should('exist');
});

Cypress.Commands.add('isDisabled', (data) => {
    cy.getByData(data).invoke('attr', 'class').should('include', 'x-btn-disabled');
});

Cypress.Commands.add('isEnabled', (data) => {
    cy.getByData(data).invoke('attr', 'class').should('not.include', 'x-btn-disabled');
});

Cypress.Commands.add('xAttendanceCard', (type) => {
    if(type === 'task') {
        type = { icon: '.fa-tasks', cardType: 'activity-activitytask' };
    }
    if(type === 'email') {
        type = { icon: '.fa-envelope', cardType: 'offline-email' };
    }
    cy.getByData(`attendance-card-btn-click-${type.cardType}`).should('exist').within(() => {
        cy.get(type.icon).should('exist');
    });
});

//Commands
Cypress.Commands.add('login', (username, password, request) => {
    cy.visit('/');
    cy.getByData('txtUsername').type(username);
    cy.getByData('txtPassword').type(password);
    cy.getByData('btnEnter').click();
    if(request) {
        cy.loginRequest();
    }
});


Cypress.Commands.add('xSelectAttendanceItem', (option) => {
    cy.viewerRequest(option);
});

Cypress.Commands.add('xGetAttendanceItem', (option) => {
    cy.emailRetrievedQueuedRequest(option);
});

Cypress.Commands.add('xCreatePerson', (person, contactType) => {
    cy.getByData('contact-window-client-contact-name').type(person.name && person.lastName ? `${person.name} ${person.lastName}` : '{backspace}');
    cy.getByData('contact-window-client-contact-nick').type(person.nickname ? person.nickname : person.name ? person.name : '{backspace}');
    cy.selectComboItem('contact-window-client-contact-gender', person.gender ? person.gender : '');
    cy.getByData('contact-window-client-contact-title').type(person.title ? person.title : '{backspace}');
    cy.selectComboItem('contact-window-contact-marital-status', person.maritalState ? person.maritalState : '');
    cy.getByData('contact-window-date-field').type(person.dateOfBirth ? person.dateOfBirth : '{backspace}' );
    cy.getByData('contact-window-client-contact-note').type(person.note ? person.note : '{backspace}');
    if (contactType) {
        if (contactType === 'Associar') {
            cy.xAssociateContact();
            cy.addPersonRequest();
            cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_CONTACT_ADDED);
            return;
        }
        cy.xCreateContact(contactType, person);
        cy.addPersonRequest();
        cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_CONTACT_ADDED);
    } else {
        cy.getByData('contact-window-btn-save').click();
        cy.alertWindow('Erro ao criar.Por favor, adicione pelo menos um contato antes de criar uma nova Pessoa0%0%OKYesNoCancel');
    }

});

Cypress.Commands.add('xCreateContact', (type, person) => {
    cy.getByData('contact-tab-btn-new').click();
    cy.selectComboItem('new-contact-container-combobox-contact-type', type);
    cy.getByData('new-contact-container-textfield-contact-name').find('input').type(person.name ? person.name : '{backspace}');
    if(type === 'Email') {
        cy.getByData('new-contact-container-textfield-conversation-identification-email').find('input').type(person.email ? person.email : person.name ? `${formatString('email', person.name)}@gmail.com` : '{backspace}');
    }
    if (type === 'Telefone') {
        cy.getByData('new-contact-container-textfield-conversation-identification-phone').find('input').type(person.phone ? person.phone : '{backspace}');
    }
    cy.newContactRequest();
    function formatString(type, string) {
        switch (type) {
          case 'email':
            string = string.replace(' ', '.').toLowerCase(string);
            return string;
          case 'nickname':
            return string.slice(0, 3);
            }
        }
    cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_CONTACT_ADDED);
});

Cypress.Commands.add('xDeleteContact', (contact) => {
    cy.get('.x-grid-item').each(($item) => {
      if ($item.text().includes(contact.name)) {
        cy.wrap($item).click({force: true});
        cy.wait(2000);
        cy.wrap($item).type('{enter}');
      }
    });
    cy.getByData('contact-tab-btn-delete').click();
    cy.deleteContactRequest();
}); 

Cypress.Commands.add('xCreateAddress', (type, person) => {
    cy.get('.card-type-virtual-tab').first().within(()=> { //TODO mudar no client
        cy.get('.fa-address-book').click(); //TODO mudar no client
    }); 
    cy.getByData('contact-tab-btn-new').click();
});

Cypress.Commands.add('xAssociateContact', (type, person) => {
    cy.getByData('contact-tab-btn-associate').click();
    cy.get('.associate-contact-container').click();
    //cy.selectGridItem(0);
    cy.getByData('associate-contact-container-btn-add').click();
});

Cypress.Commands.add('xTransferAttendance', (option) => {
    if (option === 'operator') {
        cy.getByData('attendance-transfer-tab-agent').click();
    }
    cy.selectGridItem(0);
    cy.transferRequest(option);
});

Cypress.Commands.add('xClassifyAttendance', (option, item) => {
    switch (option) {
        case 'email':
            cy.getByData('email-screen-btn-classification').click();
            break;
        case 'activity':
            cy.getByData('activity-screen-btn-request-classification').click();
            break;
        case 'chat':
            cy.getByData('conversation-chat-container-btn-request-classification').click();
            break;
    }
    cy.getByData('email-screen-btn-classification').click();
    cy.selectGridCheckBoxItem(item);
    cy.classificationRequest();
    cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_SAVED_SUCCESSFULLY);
});

Cypress.Commands.add('xToastNotification', (text) => {
    cy.get('.toast-notification').should('exist').and('have.text', text);
});

Cypress.Commands.add('getToast', (title, text) => {
    cy.get('.toast-title').should('exist').and('have.text', title);
    cy.get('.toast-message').should('exist').and('have.text', text);
});


Cypress.Commands.add('xFilter', (context, command, filters) => {
    cy.getByData(`${context}-window-btn-filter`).click();
    switch (command) {
        case 'by':
            for (let p = 0; p < filters.length; p++) {
                const filter = filters[p];
                cy.getByData(`${context}-filter-form-textfield-${filter.fieldName}`).find('input').type(filter.value);
                cy.wait(1000);
            }
            cy.wait(2000);
            cy.getByData(`${context}-filter-form-btn-filter`).click();
            break;
            
        case 'clear':
            cy.getByData(`${context}-filter-form-btn-clear`).click();
            break;
    }
});

Cypress.Commands.add('setOperatorStatus', (status) => { 
    let action = ''
    switch (status) {
        case 'Disponivel': 
            action = {
                status: '{downarrow}{downarrow}{downarrow}{downarrow}{enter}',
                statusCode: '-5' 
            };
            break;
        case 'Online': 
            action = {
                status: '{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}',
                statusCode: '-4' 
            };
            break;
        case 'Offline': 
            action = {
                status: '{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}',
                statusCode: '-3' 
            };
            break;
        case 'Pausa': 
            action = {
                status: '{downarrow}{enter}',
                statusCode: '24' 
            };
            break;
    }
    cy.changeStatusRequest(action.statusCode, action.status);
});


Cypress.Commands.add('workCenterFlow', (action) => {
    const actionString = action;
    if(action.includes('.')) {
        const str = action.split('.');
        action = {
            context: str[0],
            tabContext: str[1]
        }
    } else {
        action = {
            context: action
        }
    }
    switch (action.context) {
        case 'disconnect':
            cy.getByData('workcenter-screen-btn-disconnect').click();
            break;

        case 'properties':
            cy.getByData('workcenter-screen-btn-properties').click();
            cy.checksTheIntegrity(actionString);
            if (action.tabContext) {
                cy.getByData(`property-window-tabbtn-window-${action.tabContext}`).click();
                cy.checksTheIntegrity(actionString);
            }
            break;

        case 'status':
            cy.getByData('workcenter-screen-combobox-status').click();
            break;

        case 'search':
            if (action.tabContext) {
                cy.searchRequest(action.tabContext);
                cy.checksTheIntegrity(actionString);
                break;
            }
            cy.searchRequest(actionString);
            cy.checksTheIntegrity(actionString);
            break;

        case 'newOnline':
            cy.getByData('workcenter-screen-btn-chat').click();
            cy.checksTheIntegrity(actionString);
            break;

        case 'crm':
            if (action.tabContext === 'automation-tasks') {
                cy.taskAutomationRequest(action.tabContext);
                cy.checksTheIntegrity(actionString);
                break;
            }
            if (action.tabContext === 'new-person') {
                cy.contactDetailsRequest(action.tabContext);
                cy.newPersonRequest();
                cy.checksTheIntegrity(actionString);
                break;
            }
            cy.contactDetailsRequest(actionString);
            cy.checksTheIntegrity(actionString);
            break;

        case 'newEmail':
            cy.getByData('workcenter-screen-btn-email').click();
            cy.newEmailRequest();
            if (action.tabContext === 'historic') {
                cy.getByData('historic-tab-screen').first().click();
                cy.checksTheIntegrity(actionString);
            }
            if (action.tabContext === 'activities') {
                cy.getByData('tasks-tab-screen').first().click();
                cy.checksTheIntegrity(actionString);
            }
            break;

        case 'activities':
            if (action.tabContext) {
                cy.splitbtn('workcenter-screen', 'activity', action.tabContext);
                cy.checksTheIntegrity(actionString);
                break;
            }
            cy.getByData('workcenter-screen-splitbtn-activity').click();
            cy.checksTheIntegrity(actionString);
            break;
            
        case 'notification':
            cy.getByData('workcenter-screen-btn-warning').click();
            cy.checksTheIntegrity(actionString);
            break;
    }
});