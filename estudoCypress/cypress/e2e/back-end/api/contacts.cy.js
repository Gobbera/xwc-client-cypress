describe('Teste contacts api', () => {

    it('Teste contact API', () => {
        cy.request('GET', 'https://xgentest-desenv.xgen.com.br/v1/users/auth/connections').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).lenght.to.be.greaterThan(1);
        })
    })
});