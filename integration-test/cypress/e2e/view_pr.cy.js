Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('View Repo should work', () => {
  beforeEach(() => {
    cy.visit('/add_repo');
    cy.get('.inputPr', { timeout: 15000 }).type('aws/aws-cdk');
    cy.get('.inputPr', { timeout: 15000 }).should('have.value', 'aws/aws-cdk');
    cy.get('#addPrButton', { timeout: 15000 }).click();
    cy.wait(20000);
    cy.visit('/view_pr');
    cy.wait(20000);
  });

  it('Should load and render HTML properly', () => {
    cy.contains('Repo Name').should('be.visible');
    cy.contains('Title').should('be.visible');
    cy.contains('URL').should('be.visible');
    cy.contains('Requester').should('be.visible');
    cy.contains("View PR's").should('be.visible');
    cy.contains('aws/aws-cdk').should('be.visible');
  });
});
