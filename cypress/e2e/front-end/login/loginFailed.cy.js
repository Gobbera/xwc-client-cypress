describe('Login credenciais inválidas', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.visit('/');
    });

    it('Login credenciais inválidas - Por Nome de usuário incorreto.', () => {
        cy.intercept('POST', /\/xgentest-desenv.xgen.com.br\/v1\/users\/auth\/token/).as('loginFailRequest');
        cy.login('nome incorreto', Cypress.env('password'));
        cy.wait('@loginFailRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
        cy.getToast(UITEXT.GENERAL_WARNING, 'The username or password does not match.');
    });

    it('Login credenciais inválidas - Por Nome de usuário incorreta.', () => {
        cy.intercept('POST', /\/xgentest-desenv.xgen.com.br\/v1\/users\/auth\/token/).as('loginFailRequest');
        cy.login(Cypress.env('username'), 'senha incorreta');
        cy.wait('@loginFailRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
        cy.getToast(UITEXT.GENERAL_WARNING, 'The username or password does not match.');
    });
});