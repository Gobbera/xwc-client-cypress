describe('General', () => {
    beforeEach(() => {
      cy.wait(1000);
      cy.viewport(1600, 900);
      cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it.only('Checks the integrity of the client web', () => {
        cy.getByData('workcenter-screen-btn-disconnect').checkContent(UITEXT.WORKCENTER_ITEM_DISCONNECT);
        cy.getByData('workcenter-screen-btn-properties').checkContent(UITEXT.WORKCENTER_ITEM_PROPERTIES);
        cy.getByData('workcenter-screen-btn-search').checkContent(UITEXT.WORKCENTER_ITEM_SEARCH);
        cy.getByData('workcenter-screen-btn-chat').checkContent(UITEXT.WORKCENTER_ITEM_NEW_IM_CHAT);
        cy.getByData('workcenter-screen-btn-persons-and-contacts').checkContent(UITEXT.WORKCENTER_ITEM_PERSONS);
        cy.getByData('workcenter-screen-btn-email').checkContent(UITEXT.WORKCENTER_ITEM_NEW_EMAIL);
        cy.getByData('workcenter-screen-btn-activity').checkContent(UITEXT.WORKCENTER_ITEM_ACTIVITIE);
        cy.getByData('workcenter-screen-btn-warning').checkContent(UITEXT.WORKCENTER_ITEM_NOTIFICATIONS);
        cy.getByData('asset-tab-features-btn-tab-attendance').checkContent(UITEXT.WORKCENTER_ITEM_ATTENDANCE);
        cy.getByData('asset-tab-features-btn-tab-portal').checkContent(UITEXT.WORKCENTER_ITEM_PORTAL);
        cy.get('#main-select-attendance-1106').checkContent(UITEXT.WORKCENTER_ITEM_SELECT_SERVICES);
        cy.get('#asset-bottom-container-1112-innerCt').checkContent(Cypress.env('URL_DLL'));
        //cy.get('#asset-bottom-container-1112-innerCt').checkContent(`&nbsp;${'bsource dois'}&nbsp;|`);
        //cy.get('#asset-bottom-container-1112-innerCt').checkContent(`${'6.24.03.134'}&nbsp;|`);
        //cy.get('#asset-bottom-container-1112-innerCt').checkContent('&nbsp;Conectado');
    });
});
