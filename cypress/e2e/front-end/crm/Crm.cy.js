import {faker} from '@faker-js/faker'

    const person = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      nickname: 'Teste',
      title: 'Teste',
      classification: '',
      gender: 'Masculino',
      maritalState: 'Solteiro',
      dateOfBirth: '04/11/1992',
      phone: faker.phone.number(),
      email: '',
      note: 'Tetess'
    } 

describe('Crm - Pessoas e Contatos', () => {
    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'), true);
    });
    
    it('Crm', () => {
        cy.workCenterFlow('crm');
    });

    it.only('Crm - Nova Pessoa - Contato de email', () => {
        cy.workCenterFlow('crm.new-person');
        cy.xCreatePerson(person, 'Email');
    });

    it('Crm - Nova Pessoa - Contato de Telefone', () => {
        cy.workCenterFlow('crm.new-person');
        cy.xCreatePerson(person, 'Telefone');
    });

    it('Crm - Automação de tarefas', () => {
        cy.workCenterFlow('crm.automation-tasks');
    });
   
    
    
});