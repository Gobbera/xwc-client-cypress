import {faker} from '@faker-js/faker'

describe('Create a new person on CRM', () => {
  const user = {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  } 
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.login(Cypress.env('username'), Cypress.env('password'), true);
  });

  it('Should open CRM and create a new contact person', () => {
    cy.getByData('workcenter-screen-btn-persons-and-contacts').click();
    const name = getRandomName();
    const phoneNumber = getRandomPhoneNumber();
    const dateOfBirth = getRandomBirthDate();
    cy.getByData('person-window-btn-new-grid-person').click();
    cy.getByData('contact-window-client-contact-name').type(`${user.name} ${user.lastName}`);
    cy.getByData('contact-window-client-contact-nick').type(formatString('nickname', user.name));
    cy.getByData('contact-window-client-contact-gender').within(() => {
      cy.get('.x-form-arrow-trigger').click();
    });
    cy.get('.x-boundlist').first().within(() => {
      cy.get('.x-boundlist-item').contains('Masculino').click();
    });
    cy.getByData('contact-window-client-contact-title').type(Cypress.env('baseFieldTest'));
    cy.getByData('contact-window-contact-marital-status').within(() => {
      cy.get('.x-form-arrow-trigger').click().type('{downarrow}{downarrow}{enter}');
    });
    cy.getByData('contact-window-date-field').type(dateOfBirth);
    cy.getByData('container-targetEl-textfield-textfield--inputel').type(Cypress.env('baseFieldTest'));
    cy.getByData('contact-window-client-contact-note').type(Cypress.env('baseFieldTest'));
    cy.getByData('contact-tab-btn-new').click();
    cy.getByData('new-contact-container-combobox-contact-type').within(() => {
      cy.get('.x-form-arrow-trigger').click().type('{downarrow}{enter}');
    });
    cy.getByData('new-contact-container-textfield-contact-name').type(`${user.name} ${user.lastName}`);
    cy.getByData('new-contact-container-textfield-conversation-identification-email').type(`${formatString('email', user.name)}@gmail.com`);
    cy.addContactRequest();

    cy.getByData('contact-tab-btn-new').click();
    cy.getByData('new-contact-container-combobox-contact-type').within(() => {
      cy.get('.x-form-arrow-trigger').click().type('{downarrow}{downarrow}{enter}');
    });
    cy.getByData('new-contact-container-textfield-contact-name').type(user.name);
    cy.getByData('new-contact-container-textfield-conversation-identification-phone').type(phoneNumber);
    cy.addContactRequest();

    cy.wait(3000);

    cy.intercept('POST', 'https://xgentest6-desenv.xgen.com.br/v1/users/persons/').as('addPersonRequest');
    cy.getByData('contact-window-btn-save').click();
    cy.wait('@addPersonRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });

    cy.wait(3000);
    cy.getByData('contact-window-btn-save').click();
    cy.xToastNotification('Atualizado com sucesso');

    cy.getByData('contact-window-btn-save').click();

    cy.isDisabled('contact-tab-btn-phone');
    cy.isDisabled('contact-tab-btn-email');
    cy.isDisabled('contact-tab-btn-chat');
    cy.isDisabled('contact-tab-btn-new-activity');
    cy.isDisabled('contact-tab-btn-open-edit');
    cy.isDisabled('contact-tab-btn-delete');

    cy.get('.x-grid-cell:contains("Email")').first().click();
    cy.isEnabled('contact-tab-btn-email');
    cy.isEnabled('contact-tab-btn-new-activity');
    cy.isEnabled('contact-tab-btn-open-edit');
    cy.isEnabled('contact-tab-btn-delete');
    cy.wait(5000);
    cy.get('.x-grid-cell:contains("Telefone")').first().click();
    cy.isEnabled('contact-tab-btn-phone');
    cy.isEnabled('contact-tab-btn-chat');
    cy.isEnabled('contact-tab-btn-new-activity');
    cy.isEnabled('contact-tab-btn-open-edit');
    cy.isEnabled('contact-tab-btn-delete');

  });
  /* const selectRandomContactType = () => {
    let contactType = '';
    const email = '{downarrow}';
    const phone = '{downarrow}{downarrow}';
    const contacts = [email, phone];
    const randomContactTypeIndex = Math.floor(Math.random() * contacts.length);
    const randomContactType = contacts[randomContactTypeIndex];
    cy.getByData('new-contact-container-combobox-contact-type').within(() => {
      cy.get('.x-form-arrow-trigger').click().type(`${randomContactType}{enter}`);
    });
    switch (randomContactType) {
      case email:
        contactType = 'Email';
        cy.getByData('new-contact-container-textfield-contact-name').type(name);
        cy.getByData('new-contact-container-textfield-conversation-identification-email').type(`${formatString('email', name)}@gmail.com`);
        break;
      case phone:
        contactType = 'Phone';
        cy.getByData('new-contact-container-textfield-contact-name').type(name);
        cy.getByData('new-contact-container-textfield-conversation-identification-phone').type(phoneNumber);
        break;
    }
  }
  selectRandomContactType(); */

  function getRandomName() {
    const firstName = ['Renato', 'Marcos', 'Antonio', 'Emerson', 'Carlos', 'Thiago', 'Anderson', 'Gustavo', 'John', 'Kirk', 'James', 'Lars', 'Dave'];
    const secondName = ['Silva', 'Vieira', 'Almenida', 'Campos', 'Gomes', 'Costa', 'Lima', 'Urich', 'Hetfield', 'Frusciante', 'Hammet'];
    const randomFirstNameIndex = Math.floor(Math.random() * firstName.length);
    const randomSecondNameIndex = Math.floor(Math.random() * secondName.length);
    const randomFirstName = firstName[randomFirstNameIndex];
    const randomSecondName = secondName[randomSecondNameIndex];
    const name = `${randomFirstName} ${randomSecondName}`;
    return name;
  }

  function getRandomPhoneNumber() {
    const dddList = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28',
      '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47',
      '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68',
      '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87',
      '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
    const getRandomElement = array => array[Math.floor(Math.random() * array.length)];
    const randomDdd = getRandomElement(dddList);
    const randomPhoneNumber = `${randomDdd} 9${Math.floor(Math.random() * 900000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`;
    return randomPhoneNumber;
  }

  function getRandomBirthDate() {
    const minYear = 1971;
    const maxYear = 1999;
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(randomYear, randomMonth, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

    const formattedMonth = String(randomMonth).padStart(2, '0');
    const formattedDay = String(randomDay).padStart(2, '0');

    const randomBirthDate = `${formattedDay}/${formattedMonth}/${randomYear}`;
    return randomBirthDate;
  }

  function formatString(type, string) {
    switch (type) {
      case 'email':
        string = string.replace(' ', '.').toLowerCase(string);
        return string;
      case 'nickname':
        return string.slice(0, 3);
    }
    //inputString = inputString.replace(/-\d+_?/g, '-');
  }
});