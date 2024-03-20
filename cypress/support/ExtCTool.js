//Components Ext.js classic toolkit
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

Cypress.Commands.add('pag', (context, num) => {
    cy.getByData(`${context}-grid-pagingtoolbar-numberfield`).type(num + '{enter}');
});