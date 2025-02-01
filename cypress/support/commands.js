Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    openText: "textJohnDoe"
}) => {
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.openText);
    cy.contains('button', 'Enviar').click();
  });