describe('Crm - Pessoas e Contatos', () => {
    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'), true);
    });
    
    it('Crm', () => {
        cy.workCenterFlow('crm');
    });

    it('Crm - Nova Pessoa', () => {
        cy.workCenterFlow('crm.new-person');
    });

    it.only('Crm - Automação de tarefas', () => {
        cy.workCenterFlow('crm.automation-tasks');
    });
   
  });