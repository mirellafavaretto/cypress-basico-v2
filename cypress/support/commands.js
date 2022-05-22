Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Mirella')
    cy.get('#lastName').type('Favaretto')
    cy.get('#email').type('mirellafavaretto@outlook.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()


})