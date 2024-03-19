//Components Ext.js classic toolkit
Cypress.Commands.add('windowsHeaderComponent', (context, content) => {
    cy.getByData(`${context}-window-header`).checkContent(content);
});

Cypress.Commands.add('pagingToolBarComponent', (context) => {
    cy.getByData(`${context}-pagingtoolbar-btn-page-first`).should('exist');
    cy.getByData(`${context}-pagingtoolbar-btn-page-prev`).should('exist');
    cy.getByData(`${context}-pagingtoolbar-numberfield`).checkContent(UITEXT.GENERAL_PAGE);
    cy.getByData(`${context}-pagingtoolbar-btn-page-next`).should('exist');
    cy.getByData(`${context}-pagingtoolbar-btn-page-last`).should('exist');
    cy.getByData(`${context}-pagingtoolbar-btn-loading`).should('exist');
});