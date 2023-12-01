describe('Open properties', () => {
    const phrase = 'teste';
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.getByData('workcenter-screen-btn-properties').click();
    });

    it('Should keep the new values on press Ok button', () => {
        cy.getByData('property-window-quick-phrases-textfield-phrase1').clear().type(phrase);
        cy.getByData('property-window-quick-phrases-textfield-phrase2').clear().type(phrase);
        cy.getByData('property-window-quick-phrases-textfield-phrase3').clear().type(phrase);
        cy.getByData('property-window-quick-phrases-textfield-phrase4').clear().type(phrase);
        cy.getByData('property-window-quick-phrases-textfield-phrase5').clear().type(phrase);

        cy.getByData('property-window-btn-ok').click();
        cy.getByData('workcenter-screen-btn-properties').click();

        cy.getByData('property-window-quick-phrases-textfield-phrase1').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase2').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase3').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase4').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase5').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        //cy.getByData('property-window-btn-quick-phrases').first().click();
        //cy.getByData('property-window-btn-window-attendance').first().click();
        //cy.getByData('property-window-attendance-checkbox-turnoff-notification-sound').click();
        //cy.getByData('property-window-attendance-checkbox-turnoff-enter-send-message').click();
    });

    it('Should keep the old values on press cancel button', () => {
        cy.getByData('property-window-quick-phrases-textfield-phrase1').type('changing phrase');
        cy.getByData('property-window-quick-phrases-textfield-phrase2').type('changing phrase');
        cy.getByData('property-window-quick-phrases-textfield-phrase3').type('changing phrase');
        cy.getByData('property-window-quick-phrases-textfield-phrase4').type('changing phrase');
        cy.getByData('property-window-quick-phrases-textfield-phrase5').type('changing phrase');

        cy.getByData('property-window-btn-cancel').click();

        cy.getByData('workcenter-screen-btn-properties').click();

        cy.getByData('property-window-quick-phrases-textfield-phrase1').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase2').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase3').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase4').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase5').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
    });

    it('Should keep values on refresh client', () => {
        cy.getByData('property-window-quick-phrases-textfield-phrase1').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase2').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase3').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase4').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase5').within(() => {
            cy.get('input[type="text"]:eq(0)').and('have.value', phrase);
        });
    });
});  