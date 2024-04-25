Cypress.Commands.add('loginRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6.dll\\?WSMMakeLogin\\?t=\\d+`);
    cy.intercept('POST', urlRegex).as('loginRequest');
    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const response = interception.response.body;
        Cypress.env('response', response);
        Cypress.env('messageShortcuts', response.config.messageShortcuts);
        Cypress.env('id', response.agent.id);
        Cypress.env('maximumCapacity', response.config.capacity.maximum);
        Cypress.env('capacity', response.config.capacity);
        Cypress.env('isapi', response.config.url.isapi);
    });
});

Cypress.Commands.add('changeStatusRequest', (statusCode, status, code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/status\\/${statusCode}\\/agent\\/\\w+\\?t=\\d+`);
    cy.intercept('PUT', urlRegex).as('changeStatusRequest');
        cy.get('#container-1049').click().type(status);
        cy.wait('@changeStatusRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('propertiesRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/propertie\\?agentId=${Cypress.env('id')}&t=\\d+`);
    cy.intercept('PUT', urlRegex).as('propertiesRequest');
    cy.getByData('property-window-btn-ok').click();
    cy.wait('@propertiesRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(code);
    });
});

Cypress.Commands.add('searchRequest', (tabContext, code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6cs.dll\\/v1\\/interaction\\/search\\?agentId=${Cypress.env('id')}&filter=${Cypress.env(tabContext)}`);
    cy.intercept('GET', urlRegex).as('searchRequest');
    if (tabContext === 'search') {
        cy.getByData('workcenter-screen-splitbtn-search').click();
    } else {
        cy.splitbtn('workcenter-screen', 'search', tabContext);
    }
    cy.wait('@searchRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('viewerRequest', (item, code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6cs\\.dll\\/v1\\/interaction\\/viewer\\?agentid=${Cypress.env('id')}`);
    cy.intercept('GET', urlRegex).as('viewerRequest');
    if(item) {
        cy.selectGridItem(item);
    }
    cy.wait('@viewerRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const interaction = interception.response.body.interaction;
        const email = interception.response.body.email;
        const callType = interception.response.body.calltype;
        cy.getByData('interaction-search-header-attendance-details-protocol').checkContent(interaction.protocol);
        cy.getByData('interaction-search-header-attendance-details-identification').checkContent(`(${email.from})`);
        //cy.getByData('interaction-search-header-seg-info-segment').checkContent(callType.name);
        cy.getByData('interaction-search-header-attendance-status-status').checkContent(interaction.statusText);
    });
});

Cypress.Commands.add('newEmailRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\/xgen_desenv6\\.dll\\?WSNewEmailMessage\\?agentid=${Cypress.env('id')}`);
    cy.intercept('GET', urlRegex).as('newEmailRequest');
    cy.wait('@newEmailRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const response = interception.response.body.interaction
      Cypress.env('wid', response.wid);  
      Cypress.env('rid', response.rid);  
    });
});

Cypress.Commands.add('emailRetrievedQueuedRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\?WSEmailRetrievedQueued\\?`);
    cy.intercept('GET', urlRegex).as('emailRetrievedQueuedRequest');
    cy.getByData('interaction-search-header-attendance-summary-interaction-open').click();
    cy.wait('@emailRetrievedQueuedRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const protocol = interception.response.body.interaction.protocol;
        cy.xAttendanceCard('email');
        cy.getByData('asset-bottom-container-current-attendance-protocol').should('exist').and('have.text', protocol);
    });
});

Cypress.Commands.add('newActivityRequest', (code) => {
    const urlRegex = new RegExp('\\/xgen_desenv6\\.dll\\?OnActivity\\?\\w+');
    cy.intercept('GET', urlRegex).as('newActivityRequest');
    cy.getByData('activity-new-window-btn-create').click();
    cy.wait('@newActivityRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const response = interception.request.query;
        Cypress.env('wid', response.p2);
    });
});

Cypress.Commands.add('getCardRequest', (code) => {
    const urlRegex = new RegExp(`\\/xgen_desenv6cs\\.dll\\/v1\\/interaction\\/viewer\\?agentid=${Cypress.env('id')}&mediaType=128&${Cypress.env('wid')}&rid=&t=\\d+`);
    cy.intercept('GET', urlRegex).as('getCardRequest');
    cy.wait('@getCardRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('classificationRequest', () => {
    cy.intercept('POST', 'https://xgentest6-desenv.xgen.com.br/v1/users/classifications/6/classification_response').as('onClassificationRequest');
    cy.getByData('classification-panel-btn-general-classification').click();
    cy.wait('@onClassificationRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('transferRequest', () => {
    const urlRegex = new RegExp(`\\/xgen_desenv6\\.dll\\/v1\\/agent\\/transfer\\?mediaType=16&agentId=${Cypress.env('id')}`);
    cy.intercept('POST', urlRegex).as('transferRequest');
    cy.getByData('attendance-transfer-btn-transfer-attendance').click();
        cy.wait('@transferRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('contactDetailsRequest', (tabContext) => {
    const urlRegex = new RegExp(`\\/v1\\/users\\/contactsDetails\\?offset=0&limit=20`);
    cy.intercept('GET', urlRegex).as('contactDetailsRequest');
    cy.getByData('workcenter-screen-splitbtn-persons-and-contacts').click();
    cy.wait('@contactDetailsRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('newPersonRequest', () => {
    const urlRegex = new RegExp(`\\/v1\\/users\\/contacts\\?personId=0&offset=0&limit=20`)
    cy.intercept('GET', urlRegex).as('newPersonRequest');
    cy.getByData('person-window-btn-new-grid-person').click();
        cy.wait('@newPersonRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('taskAutomationRequest', () => {
    const urlRegex = new RegExp(`\\/v1\\/users\\/task_automation\\?offset=0&limit=20`);
    cy.intercept('GET', urlRegex).as('taskAutomationRequest');
    cy.splitbtn('workcenter-screen', 'persons-and-contacts', 'automation-tasks');
        cy.wait('@taskAutomationRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
});



