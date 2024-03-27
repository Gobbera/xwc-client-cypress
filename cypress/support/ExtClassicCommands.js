//Components Ext.js classic toolkit

//integrity
Cypress.Commands.add('windowsHeaderComponent', (context, content) => {
    cy.getByData(`${context}-window-header`).checkContent(content);
});

Cypress.Commands.add('pagingToolBarComponent', (context) => {
    cy.getByData(`${context}-grid-pagingtoolbar-btn-page-first`).should('exist');
    cy.getByData(`${context}-grid-pagingtoolbar-btn-page-prev`).should('exist');
    cy.getByData(`${context}-grid-pagingtoolbar-numberfield`).checkContent(UITEXT.GENERAL_PAGE);
    cy.getByData(`${context}-grid-pagingtoolbar-btn-page-next`).should('exist');
    cy.getByData(`${context}-grid-pagingtoolbar-btn-page-last`).should('exist');
    cy.getByData(`${context}-grid-pagingtoolbar-btn-loading`).should('exist');
});


//commands
Cypress.Commands.add('closeWindow', (context) => {
    cy.getByData(`${context}-window-header-close`).click();
});

Cypress.Commands.add('pag', (context, num) => {
    cy.getByData(`${context}-grid-pagingtoolbar-numberfield`).type(num + '{enter}');
});

Cypress.Commands.add('splitbtn', (context, button, menuitem) => {
    cy.getByData('workcenter-screen-splitbtn-activity').find(`[data-e2e="${context}-splitbtn-arrow-${button}"]`).click();
    //cy.getByData(`${context}-splitbtn-arrow-${button}`).click();
    cy.wait(1000);
    cy.getByData(`${context}-menuitem-${menuitem}`).click();
});