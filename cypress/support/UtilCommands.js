//Util commands
Cypress.Commands.add('getByData', (selector) => {
    cy.get(`[data-e2e=${selector}]`);
});

Cypress.Commands.add('checkContent', (content) => {
    cy.contains(content).should('exist').and('have.text', content);
});

Cypress.Commands.add('closeWindow', (context) => {
    cy.getByData(`${context}-window-header-close`).click();
});
