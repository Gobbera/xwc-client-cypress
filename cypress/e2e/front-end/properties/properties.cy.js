import {faker} from '@faker-js/faker'

describe('Propriedades', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.wait(1000);
        cy.login(Cypress.env('username'), Cypress.env('password'), true);
    });
    
    it('Propriedades - Frases Rapidas - Preenchendo os campos', () => {
        cy.workCenterFlow('properties');
        cy.getByData('property-window-quick-phrases-textfield-phrase1').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase2').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase3').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase4').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase5').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase6').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase7').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase8').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase9').find('input').clear().type(faker.lorem.sentence(4));
        cy.getByData('property-window-quick-phrases-textfield-phrase10').find('input').clear().type(faker.lorem.sentence(4));
        const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/propertie\\?agentId=${Cypress.env('id')}&t=\\d+`);
        cy.intercept('PUT', urlRegex).as('propertieRequest');
        cy.getByData('property-window-btn-ok').click();
        cy.wait('@propertieRequest', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
        });
    });
            
    it('Propriedades - Frases Rapidas - Verificando os campos', () => {
        cy.workCenterFlow('properties');
        const messageShortcuts = Cypress.env('messageShortcuts');
        cy.getByData('property-window-quick-phrases-textfield-phrase1').find('input').should('have.value', messageShortcuts[0].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase2').find('input').should('have.value', messageShortcuts[1].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase3').find('input').should('have.value', messageShortcuts[2].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase4').find('input').should('have.value', messageShortcuts[3].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase5').find('input').should('have.value', messageShortcuts[4].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase6').find('input').should('have.value', messageShortcuts[5].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase7').find('input').should('have.value', messageShortcuts[6].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase8').find('input').should('have.value', messageShortcuts[7].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase9').find('input').should('have.value', messageShortcuts[8].texto);
        cy.getByData('property-window-quick-phrases-textfield-phrase10').find('input').should('have.value', messageShortcuts[9].texto);
    });
    
    it('Propriedades - Atendimentos - Preenchendo os campos', () => {
        cy.workCenterFlow('properties.attendances');
        cy.getByData('property-window-attendance-combo-capacity-online').click();
        cy.selectComboItem('0');
        cy.getByData('property-window-btn-ok').click();
        cy.workCenterFlow('properties.attendances');
        cy.getByData('property-window-attendance-combo-capacity-offline').click();
        cy.selectComboItem('0');
        cy.getByData('property-window-btn-ok').click();
        cy.workCenterFlow('properties.attendances');
        cy.getByData('property-window-attendance-combo-capacity-online').click();
        cy.selectComboItem(faker.number.octal({ min: 1, max: 6 }))
        cy.getByData('property-window-btn-ok').click();
        cy.workCenterFlow('properties.attendances');
        cy.getByData('property-window-attendance-combo-capacity-offline').click();
        cy.selectComboItem(faker.number.octal({ min: 1, max: 6 }))
        cy.getByData('property-window-btn-ok').click();
    });
    
    it('Propriedades - Atendimentos - Verificando os campos', () => {
        cy.workCenterFlow('properties.attendances'); 
        const capacity =  Cypress.env('capacity');    
        cy.getByData('property-window-attendance-combo-capacity-online').find('input').should('have.value', capacity.online);
        cy.getByData('property-window-attendance-combo-capacity-offline').find('input').should('have.value', capacity.offline);
    });

    it('Propriedades - Atendimentos - Excedendo limite de atendimentos', () => {
        cy.workCenterFlow('properties.attendances');
        const maximumCapacity = Cypress.env('maximumCapacity');
        cy.getByData('property-window-attendance-combo-capacity-online').click();
        cy.selectComboItem('0');
        cy.getByData('property-window-btn-ok').click();
        cy.workCenterFlow('properties.attendances');
        cy.getByData('property-window-attendance-combo-capacity-offline').click();
        cy.selectComboItem(maximumCapacity);
        cy.getByData('property-window-btn-ok').click();
        cy.workCenterFlow('properties.attendances');
        cy.getByData('property-window-attendance-combo-capacity-online').click();
        cy.selectComboItem(maximumCapacity);
        const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/propertie\\?agentId=${Cypress.env('id')}&t=\\d+`);
        cy.intercept('PUT', urlRegex).as('propertieRequest');
        cy.getByData('property-window-btn-ok').click();
        cy.wait('@propertieRequest', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(500);
        });
            cy.alertWindow('{"error":500,"msg":"Internal Server Error"}');// UITEXT.PROPERTY_WINDOW_MAX_CAPACITY 
    });
});
