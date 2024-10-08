//Components Ext.js classic toolkit

//integrity
Cypress.Commands.add('windowsHeaderComponent', (context, content) => {
    cy.getByData(`${context}-window-header`).checkContent(content) || cy.getByData(`${context}-header`).checkContent(content);
});

Cypress.Commands.add('alertWindow', (content) => {
    cy.get('[role="alertdialog"]').should('exist').and('have.text', content);
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
Cypress.Commands.add('selectComboItem', (component, option) => {
    if (!option) {
        return;
    }
    cy.getByData(component).within(() => {
        cy.get('.x-form-arrow-trigger').click();
    });
    cy.get('.x-boundlist-item').contains(option).click();
});

Cypress.Commands.add('selectGridItem', (item) => {
    cy.get('.x-grid-item').eq(item).click({force: true});
});

Cypress.Commands.add('selectGridCheckBoxItem', (item) => {
    cy.get('.x-grid-item').eq(item).within(() => {
        cy.get('.x-tree-checkbox').click();
    });
});

Cypress.Commands.add('closeWindow', (context) => {
    cy.getByData(`${context}-window-header-close`).click();
});

Cypress.Commands.add('pag', (context, num) => {
    cy.getByData(`${context}-grid-pagingtoolbar-numberfield`).type(num + '{enter}');
});

Cypress.Commands.add('splitbtn', (context, button, menuitem) => {
    cy.getByData(`${context}-splitbtn-${button}`).find(`[data-e2e="${context}-splitbtn-arrow-${button}"]`).click({force: true});
    cy.getByData(`${context}-menuitem-${menuitem}`).click({force: true});
});

Cypress.Commands.add('windowYesOrNo', (value) => {
    if (value === 'y') {
        cy.get('.x-btn-inner').contains('Sim').click();
        return;
    }
    if (value === 'n') {
        cy.get('.x-btn-inner').contains('Não').click();
        return;
    }
    if (value === 'ok') {
        cy.get('.x-btn-inner').contains('OK').click();
        return;
    }
});

Cypress.Commands.add('searchItem', () => {
    
});





