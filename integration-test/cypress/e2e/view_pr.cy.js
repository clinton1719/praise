Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('View Repo should work', () => {
  it('Should load and render HTML properly', () => {
    cy.visit('/add_repo');
    cy.wait(5000);
    cy.get('.inputPr').type('aws/aws-cdk');
    cy.get('.inputPr').should('have.value', 'aws/aws-cdk');

    cy.get('#addPrButton').click({ force: true });
    cy.wait(10000);
    cy.reload();
    cy.wait(10000);
    cy.contains('aws/aws-cdk').should('be.visible');
    cy.contains('List of repos added: 1').should('be.visible');
    cy.visit('/view_pr');
    cy.wait(10000);
    cy.contains('Repo Name').should('be.visible');
    cy.contains('Title').should('be.visible');
    cy.contains('URL').should('be.visible');
    cy.contains('Requester').should('be.visible');
    cy.contains("View PR's").should('be.visible');
    cy.contains('aws/aws-cdk').should('be.visible');
  });
});
