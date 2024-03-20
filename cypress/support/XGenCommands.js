//Components XGen
Cypress.Commands.add('xWindowHeaderTools', (context) => {
    cy.getByData(`${context}-window-header-collapse-top`).should('exist');
    cy.getByData(`${context}-window-header-undefined`).should('exist');
    cy.getByData(`${context}-window-header-undefined`).should('exist');
    cy.getByData(`${context}-window-header-close`).should('exist');
});

Cypress.Commands.add('xFilterLabelComponent', (context) => {
    cy.getByData(`${context}-filter-label`).should('exist');
});

Cypress.Commands.add('xFilter', (context, command, filtering) => {
    cy.getByData(`${context}-window-btn-filter`).click();
    switch (command) {
        case 'by':
            const filters = filtering.split(' and ');
            for (let i = 0; i < filters.length; i++) {
                const filter = filters[i];
                const [fieldName, value] = filter.split(':');
                cy.getByData(`${context}-filter-form-textfield-${fieldName}`).find('input').type(value);
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
            action = '{downarrow}{downarrow}{enter}';
            break;
        case 'Offline': 
            action = '{downarrow}{downarrow}{downarrow}{enter}';
            break;
    }
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/status\\/${action.statusCode}\\/agent\\/\\w+\\?t=\\d+`);
    cy.intercept('PUT', urlRegex).as('changeStatusRequest');
        cy.get('#container-1049').click().type(action.status);
        cy.wait('@changeStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
    });
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
            cy.checksTheIntegrity(action);
            if (action.tabContext) {
                cy.getByData(`property-window-btn-window-${action.tabContext}`).click();
                cy.checksTheIntegrity(actionString);
            }
            break;

        case 'status':
            //cy.getByData('workcenter-screen-combobox-status').click();
            //TODO criar metodo para seleção de status
            cy.get('#container-1049').click().type('{downarrow}{downarrow}{downarrow}{enter}');
            break;

        case 'search':
            cy.getByData('workcenter-screen-btn-search').click();
            break;

        case 'newOnline':
            cy.getByData('workcenter-screen-btn-chat').click();
            break;

        case 'crm':
            cy.getByData('workcenter-screen-btn-persons-and-contacts').click();
            break;

        case 'newEmail':
            cy.getByData('workcenter-screen-btn-email').click();
            if (action.tabContext === 'historic') {
                cy.getByData('historic-tab-screen').first().click();
                //cy.getByData(`historic-tab-screen${action.tabContext}`).click();
                cy.checksTheIntegrity(actionString);
            }
            if (action.tabContext === 'activities') {
                cy.getByData('tasks-tab-screen').first().click();
                //cy.getByData(`historic-tab-screen${action.tabContext}`).click();
                cy.checksTheIntegrity(actionString);
            }
            break;

        case 'activities':
            cy.getByData('workcenter-screen-btn-activity').click();
            //cy.checksTheIntegrity(actionString);
            break;
            
        case 'notification':
            cy.getByData('workcenter-screen-btn-warning').click();
            break;
    }
});