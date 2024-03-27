//Components XGen
Cypress.Commands.add('xWindowHeaderTools', (context) => {
    cy.getByData(`${context}-window-header-collapse-top`).should('exist');
    cy.getByData(`${context}-window-header-undefined`).should('exist');
    cy.getByData(`${context}-window-header-undefined`).should('exist');
    cy.getByData(`${context}-window-header-close`).should('exist');
});

Cypress.Commands.add('xFilterLabelComponent', (context) => {
    cy.getByData(`${context}-filter-bar`).should('exist');
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
                cy.getByData(`property-window-tabbtn-window-${action.tabContext}`).click();
                cy.checksTheIntegrity(actionString);
            }
            break;

        case 'status':
            cy.getByData('workcenter-screen-combobox-status').click();
            break;

        case 'search':
            if (action.tabContext) {
                cy.splitbtn('workcenter-screen', 'search', action.tabContext);
                cy.checksTheIntegrity(actionString);
                break;
            }
            cy.getByData('workcenter-screen-btn-search').click();
            cy.checksTheIntegrity(actionString);
            break;

        case 'newOnline':
            cy.getByData('workcenter-screen-btn-chat').click();
            cy.checksTheIntegrity(actionString);
            break;

        case 'crm':
            if (action.tabContext) {
                cy.splitbtn('workcenter-screen', 'persons-and-contacts', action.tabContext);
                cy.checksTheIntegrity(actionString);
                break;
            }
            cy.getByData('workcenter-screen-btn-persons-and-contacts').click();
            cy.checksTheIntegrity(actionString);
            break;

        case 'newEmail':
            cy.getByData('workcenter-screen-btn-email').click();
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