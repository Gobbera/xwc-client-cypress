//Components XGen
Cypress.Commands.add('windowHeaderTools', (context) => {
    cy.getByData(`${context}-window-header-collapse-top`).should('exist');
    cy.getByData(`${context}-window-header-undefined`).should('exist');
    cy.getByData(`${context}-window-header-undefined`).should('exist');
    cy.getByData(`${context}-window-header-close`).should('exist');
});

Cypress.Commands.add('filterLabelComponent', (context) => {
    cy.getByData(`${context}-filter-label`).should('exist');
});

Cypress.Commands.add('workCenterFlow', (action) => {
    const actionString = action;
    cy.checksTheIntegrity();
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
            if (action.tabContext) {
                cy.getByData('historic-tab-screen').first().click();
                //cy.getByData(`historic-tab-screen${action.tabContext}`).click();
                cy.checksTheIntegrity(actionString);
            }
            break;

        case 'activities':
            cy.getByData('workcenter-screen-btn-activity').click();
            break;
            
        case 'notification':
            cy.getByData('workcenter-screen-btn-warning').click();
            break;
    }
});