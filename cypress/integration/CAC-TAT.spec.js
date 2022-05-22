///<reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it ('preenche os campos obrigatórios e envia o formulário', function() {
   const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste,teste, teste, teste, teste, teste, teste,'
        cy.get('#firstName').type('Mirella')
        cy.get('#lastName').type('Favaretto')
        cy.get('#email').type('mirellafavaretto@outlook.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {   
        cy.get('#firstName').type('Mirella')
        cy.get('#lastName').type('Favaretto')
        cy.get('#email').type('mirellafavaretto@outlook,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {   
       cy.get('#phone')
       .type('abcdefghij')
       .should('have.value','')

    })

    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Mirella')
        cy.get('#lastName').type('Favaretto')
        cy.get('#email').type('mirellafavaretto@outlook.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
  
        cy.get('.error').should('be.visible')

    })

    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
        .type('Mirella')
        .should('have.value', 'Mirella')
        .clear()
        .should('have.value','')

        cy.get('#lastName')
        .type('Favaretto')
        .should('have.value', 'Favaretto')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('mirellafavaretto@outlook.com')
        .should('have.value', 'mirellafavaretto@outlook.com')
        .clear()
        .should('have.value','')
   
        cy.get('#phone')
        .type('19998987710')
        .should('have.value', '19998987710')
        .clear()
        .should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })
    it ('seleciona um produto por seu texto', function(){
        cy.get('#product') .select('YouTube')
        .should('have.value', 'youtube') // com letra minuscula pois agora é verificado o valor e não o texto

    })

    it ('seleciona um produto (Mentoria) por seu valor', function (){
        cy.get('#product').select('mentoria')
        .should('have.value','mentoria')



    })

    it('Seleciona um produto (Blog) por seu índice', function (){
        cy.get('#product').select (1)
        .should('have.value', 'blog')

    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function (){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')


        })
    })

    it ('marca ambos checkboxes, depois desmarca o último', function (){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')



    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
        .should ('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
        .should ('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })


    })

    it ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

        
    })        

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){ 
        cy.get('#privacy a').should('have.attr','target', '_blank')

    })

})


   

  








