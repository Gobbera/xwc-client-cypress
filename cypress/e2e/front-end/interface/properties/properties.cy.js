describe('Open properties', () => {
    const phrase = 'teste';
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.getByData('workcenter-screen-btn-properties').click();
    });

    it('Open properties and test the components and functionalities', () => {
        cy.windowTitleIs('Propriedades');
        cy.getByData('property-window-btn-quick-phrases').first().within(() => {
            cy.get('.x-tab-inner').should('exist').and('have.text', 'Frases Rápidas');
        });
        cy.getByData('property-window-btn-window-attendance').first().within(() => {
            cy.get('.x-tab-inner').should('exist').and('have.text', 'Atendimentos');
        });
        cy.getByData('property-window-quick-phrases-textfield-description').first().within(() => {
            cy.get('.x-autocontainer-innerCt').should('exist').and('have.text', 'Use as frases rápidas como suporte ao atendimento, facilita e agiliza o atendimento. Cada frase pode ter até 300 caracteres.');
        });
        cy.getByData('property-window-quick-phrases-textfield-phrase1').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase2').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase3').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase4').should('exist');
        cy.getByData('property-window-quick-phrases-textfield-phrase5').should('exist');

        cy.getByData('property-window-btn-window-attendance').click();

        cy.getByData('property-window-attendance-combo-capacity-online').click().then(() => {
            for (let i = 0; i < 12; i++) {
                cy.get('.x-boundlist-item').contains(i.toString()).should('exist');
            }
        });
        cy.getByData('property-window-attendance-combo-capacity-online').within(() => {
            cy.get('.x-form-arrow-trigger').click();
        });

        cy.wait(3000);

        cy.getByData('property-window-attendance-combo-capacity-offline').click().then(() => {
            for (let i = 0; i < 12; i++) {
                cy.get('.x-boundlist-item').contains(i.toString()).should('exist');
            }
        });
        cy.getByData('property-window-attendance-combo-capacity-offline').within(() => {
            cy.get('.x-form-arrow-trigger').click();
        });

        cy.getByData('property-window-btn-ok').click();
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

    it('Should be noted that you cannot exceed the limit of 12 attendances', () => {
        cy.getByData('property-window-btn-window-attendance').click();

        cy.getByData('property-window-attendance-combo-capacity-offline').click();
        cy.get('.x-boundlist-item').contains('10').click();
        
        cy.getByData('property-window-btn-ok').click();
        cy.getByData('workcenter-screen-btn-properties').click();
        cy.getByData('property-window-btn-window-attendance').click();

        cy.getByData('property-window-attendance-combo-capacity-online').click();
        cy.get('.x-boundlist-item').contains('10').click();

        cy.getByData('property-window-btn-ok').click();

        cy.windowTitleIs('Atenção');
        cy.get('.x-message-box-warning').should('exist');
        cy.get('.x-btn-default-small').contains('OK').first().click();
        //cy.get('.x-window-text').should('exist').and('have.text', 'Você não pode configurar mais do que 12 atendimento(s) simulatâneo(s)');
    });
});  