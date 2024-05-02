import {faker} from '@faker-js/faker'

describe('Crm - Pessoas e Contatos', () => {
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

    beforeEach(() => {
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'), true);
      cy.workCenterFlow('crm');
    });

    it('Crm - Pessoa existente - Contato de email', () => {
      cy.pag('activity-new-window-persons', 52);
      cy.getByData('activity-new-window-persons-grid').dblclick();
      cy.xCreateContact('Email', person);
      cy.wait(6000);
      cy.attPersonRequest();
      cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_SUCCESSFULLY_UPDATED);
    });

    it('Crm - Pessoa existente - Contato de Telefone', () => {
      cy.pag('activity-new-window-persons', 52);
      cy.getByData('activity-new-window-persons-grid').dblclick();
      cy.xCreateContact('Telefone', person);
      cy.wait(6000);
      cy.attPersonRequest();
      cy.xToastNotification(UITEXT.TOAST_NOTIFICATIONS_SUCCESSFULLY_UPDATED);
    });  

    it('Crm - Pessoa existente - Deletar contato', () => {
      const name = faker.person.firstName(); 
      const contact = {
        name: name,
        email: `${name}.contact@willbedeleted.com`
      }
      cy.pag('activity-new-window-persons', 52);
      cy.getByData('activity-new-window-persons-grid').dblclick();
      cy.wait(3000);
      cy.xCreateContact('Email', contact);
      cy.xDeleteContact(contact); 
    }); 
});