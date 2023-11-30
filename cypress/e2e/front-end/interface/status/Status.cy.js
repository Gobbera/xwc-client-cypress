describe('Change Operator status', () => {
    beforeEach(() => {
        cy.wait(3000);
        cy.viewport(1600, 900);
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    
    it('Should change operator status to Lanche',() => {
        cy.intercept('PUT', /\/xgen_desenv6.dll\/v1\/agent\/status\/24\/agent\/\w+\?t=\d+/).as('changeLancheStatusRequest');
        cy.get('#container-1049').click().type('{downarrow}{enter}');
        cy.wait('@changeLancheStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait(3000);
    });

    it('Should change operator status to Janta',() => {
        cy.intercept('PUT', /\/xgen_desenv6.dll\/v1\/agent\/status\/26\/agent\/\w+\?t=\d+/).as('changeAvailableStatusRequest');
        cy.get('#container-1049').click().type('{downarrow}{downarrow}{enter}');
        cy.wait('@changeAvailableStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait(3000);
    });

    it('Should change operator status to Available',() => {
        cy.intercept('PUT', /\/xgen_desenv6.dll\/v1\/agent\/status\/-5\/agent\/\w+\?t=\d+/).as('changeAvailableStatusRequest');
        cy.get('#container-1049').click().type('{downarrow}{downarrow}{downarrow}{enter}');
        cy.wait('@changeAvailableStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait(3000);
    });

    it('Should change operator status to Online',() => {
        cy.intercept('PUT', /\/xgen_desenv6.dll\/v1\/agent\/status\/-4\/agent\/\w+\?t=\d+/).as('changeOnlineStatusRequest');
        cy.get('#container-1049').click().type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}');
        cy.wait('@changeOnlineStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait(3000);
    });

    it('Should change operator status to Offline',() => {
        cy.intercept('PUT', /\/xgen_desenv6.dll\/v1\/agent\/status\/-3\/agent\/\w+\?t=\d+/).as('changeOfflineStatusRequest');
        cy.get('#container-1049').click().type('{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}{enter}');
        cy.wait('@changeOfflineStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait(3000);
    });
});