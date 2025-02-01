describe('Testa política de privacidade', () => {
    beforeEach(()=>{
    
        cy.visit('../src/privacy.html')
      })
      
    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.get('h1').should('have.text','CAC TAT - Política de Privacidade')
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
        cy.contains('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.').should('be.visible')
        cy.contains('No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.').should('be.visible')
        cy.contains('Talking About Testing').should('be.visible')
    })
})
