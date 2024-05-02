import {faker} from '@faker-js/faker'

    const person = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      nickname: '',
      title: 'Teste',
      classification: '',
      gender: 'Masculino',
      maritalState: 'Solteiro',
      dateOfBirth: '04/11/1992',
      phone: faker.phone.number(),
      email: '',
      note: 'Teste'
    } 

describe('Crm - Pessoas e Contatos - Nova Pessoa', () => {
    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'), true);
      cy.workCenterFlow('crm.new-person');
    });

    it('Crm - Nova Pessoa - Contato de email', () => {
        cy.xCreatePerson(person, 'Email');
    });

    it('Crm - Nova Pessoa - Contato de Telefone', () => {
        cy.xCreatePerson(person, 'Telefone');
    });

    it('Crm - Nova Pessoa - Associar um contato', () => {
        cy.xCreatePerson(person, 'Associar');
    });

    it('Crm - Nova Pessoa - Sem associar um contato', () => {
        cy.xCreatePerson(person);
    });  
});