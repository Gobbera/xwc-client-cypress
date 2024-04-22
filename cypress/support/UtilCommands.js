//Util commands
Cypress.Commands.add('getByData', (selector) => {
    cy.get(`[data-e2e=${selector}]`);
});

Cypress.Commands.add('checkContent', (content) => {
    cy.contains(content).should('exist').and('have.text', content);
});

Cypress.Commands.add('getToday', () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
        day = '0' + dia;
    }
    if (month < 10) {
        month = '0' + month;
    }
    Cypress.env('today', day + '/' + month + '/' + year);
});

