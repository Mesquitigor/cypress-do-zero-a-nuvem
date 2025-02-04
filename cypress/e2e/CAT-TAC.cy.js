describe('Visita pagina TAC CAT', () => {
  beforeEach(()=>{
    
    cy.visit('../src/index.html')
  })

  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })
  
  
  it('Caminho feliz', () => {
    const longText = Cypress._.repeat('ABCDEFGIJKLMNOPQRSTUVWXYZ', 10)

    cy.clock()

    cy.get('#firstName').type('Higor', {delay: 0})
    cy.get('#lastName').type('Mesquita', {delay: 0})
    cy.get('#email').type('higor@email.com', {delay: 0})
    cy.get('#product').select('mentoria')
    cy.get('#support-type > :nth-child(2) > input').check()
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#file-upload').click()
    cy.contains('button', 'Enviar').click();
    
    cy.get('.success > strong').should('be.visible')
    cy.tick(3000)
    cy.get('.success > strong').should('not.be.visible')
  })

  
  it('mensagem de erro - email inválido', () => {
    const longText = Cypress._.repeat('ABCDEFGIJKLMNOPQRSTUVWXYZ', 10)

    cy.get('#firstName').type('Higor', {delay: 0})
    cy.get('#lastName').type('Mesquita', {delay: 0})
    cy.get('#email').type('email errado', {delay: 0})
    cy.get('#product').select('mentoria')
    cy.get('#support-type > :nth-child(2) > input').check()
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#file-upload').click()
    cy.contains('button', 'Enviar').click();
    cy.get('.error > strong').should('be.visible')
  })

  
  it('tipo de dado - telefone inválido', () => {
    cy.get('#phone').type('teste', {delay: 0}).should('have.value','') 
  })

  
  it('tipo de dado - telefone inválido', () => {
    const longText = Cypress._.repeat('ABCDEFGIJKLMNOPQRSTUVWXYZ', 10)

    cy.get('#firstName').type('Higor', {delay: 0})
    cy.get('#lastName').type('Mesquita', {delay: 0})
    cy.get('#email').type('higor@email.com', {delay: 0})
    cy.get('#product').select('mentoria')
    cy.get('#support-type > :nth-child(2) > input').check()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#file-upload').click()
    cy.contains('button', 'Enviar').click();
    cy.get('.error > strong').should('be.visible')
  })

  
  it('limpeza de campos', () => {
    const longText = Cypress._.repeat('ABCDEFGIJKLMNOPQRSTUVWXYZ', 10)
    
    cy.get('#firstName').type('Higor', {delay: 0}).should('have.value', 'Higor').clear().should('have.value', '')
    cy.get('#lastName').type('Mesquita', {delay: 0}).should('have.value', 'Mesquita').clear().should('have.value', '')
    cy.get('#email').type('higor@email.com', {delay: 0}).should('have.value', 'higor@email.com').clear().should('have.value', '')
    cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText).clear().should('have.value', '')
  })

  
  it('formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error > strong').should('be.visible')
  })

  
  it('caminho feliz usa comando customizado', () => {
    const data = {
      firstName: "Higor",
      lastName: "Mesquita",
      email: "higormesquita@email.com",
      openText: "ABCDEFGHIJKLMNOPQSTUVWXYZ"
    };
    
    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get('.success > strong').should('be.visible')
  })
  
  it('seleciona Feedback no Tipo de atendimento', () =>{
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })
  
  it('seleciona todos Tipos de atendimento', () =>{
    cy.get('input[type="radio"]').each(typeOfService =>{
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })
  
  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('input[type="checkbox"]').each(preferentialContact =>{
      cy.wrap(preferentialContact).check().should('be.checked').last().uncheck().should('not.be.checked')
    })
  })
  
  it('exibe mensagem de erro quando telefone é obrigatório e envio formulário', () => {
    cy.get('input[type="checkbox"][value="phone"]').check().should('be.checked')
    
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.error > strong').should('be.visible')
  })
  
  it('seleciona um arquivo na pasta features', () => {
    cy.get('#file-upload').click().selectFile('cypress/fixtures/example.json').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  
  it('arrasta um arquivo na pasta features para o site', () => {
    cy.get('#file-upload').click().selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload').click().selectFile('@sampleFile').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
  })

  it('verifica que a política de privacidade não abre em outra aba sem a necessidade de um clique', () => {
    cy.url().then((initialUrl) => {
      cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
      cy.url().should('not.eq', initialUrl)
    })
  })
  
  it('Digitar várias vezes a mesma informação usando .time()', () => {
    cy.fillMandatoryFieldsAndSubmit()
    const times = 3
    Cypress._.times(times, () => {
      cy.get('#open-text-area').type("teste")
    })
    cy.get('#open-text-area').should('have.value', 'teste'.repeat(times))
  })
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')
    cy.get('.error').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')
  })
  it('preenche o campo da área de texto usando o comando .invoke()', () => {
    const text = 'typing using invoke()'
    cy.get('#open-text-area').invoke('val', text)
    cy.get('#open-text-area').should('have.value', text)
  })
  it('faz uma requisição HTTP', () => {
    cy.request('/').as('getRequest').its('status').should('be.eq', 200)
    cy.get('@getRequest').its('statusText').should('be.eq', 'OK')
  })
  it.only('encontrando o gato', () => {
    cy.get('h1').invoke('text', '🐈')
    cy.get('#subtitle').invoke('text', 'Achei o gato, galerinha! ⬆️ mas existe outro')
    cy.get('#cat').invoke('show').should('be.visible')
  })
})