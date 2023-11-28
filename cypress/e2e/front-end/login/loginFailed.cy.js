describe('Trying to make login on client web, but the username or password are wrong', () => {
    beforeEach(() => {
        cy.viewport(1600, 900);
        cy.visit('/');
    });
    function getCurrentDateTime() {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 2);
        currentDate.setMinutes(currentDate.getMinutes());
        currentDate.setSeconds(currentDate.getSeconds());
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        const formattedDay = `${month}-${day}-${year}`;
        return { time: formattedTime, day: formattedDay };
    }

    it('Should test login on client web and the username or password does not match', () => {
        cy.getByData('txtUsername').type('usuario');
        cy.getByData('txtPassword').type('senha');
        cy.getByData('btnEnter').click();
        cy.get('.toast-message').should('exist').and('have.text', 'The username or password does not match.');
    });

    it('Should test login on client web and credentials are invalid', () => {
        cy.getByData('txtUsername').type('bsource');
        cy.getByData('txtPassword').type('senha');
        cy.getByData('btnEnter').click();
        cy.get('.toast-message').should('exist').and('have.text', 'Credenciais Inválidas. Você tem mais 2 tentativa(s) antes que sua conta seja bloqueada temporariamente.');
    });

    it('Should test login on client web and credentials are invalid for the second time', () => {
        cy.getByData('txtUsername').type('bsource');
        cy.getByData('txtPassword').type('senha');
        cy.getByData('btnEnter').click();
        cy.get('.toast-message').should('exist').and('have.text', 'Credenciais Inválidas. Você tem mais 1 tentativa(s) antes que sua conta seja bloqueada temporariamente.');
    });

    it('Should test login on client web and you have reached the limit of attempts', () => {
        cy.getByData('txtUsername').type('bsource');
        cy.getByData('txtPassword').type('senha');
        cy.getByData('btnEnter').click();
        cy.get('.toast-message').should('exist').and('have.text', 'Credenciais Inválidas. Você atingiu o limite de 3 tentativa(s) e sua conta foi bloqueada temporariamente.');
    });
    
    it('Should test login on client web but you account has been blocked', () => {
        const dateTimeObject = getCurrentDateTime();
        const time = dateTimeObject.time;
        const day = dateTimeObject.day;
        cy.getByData('txtUsername').type('bsource');
        cy.getByData('txtPassword').type('senha');
        cy.getByData('btnEnter').click();
        cy.get('.toast-message').should('exist').and('have.text', `Sua conta foi bloqueada até às ${time} PM do dia ${day} devido a várias tentativas de login com falha.`);
    });
});