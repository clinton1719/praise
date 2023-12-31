Cypress.on('uncaught:exception', (err, runnable) => {
  console.log(err);
  return false;
});

describe('Add Repo should work', () => {
  it('Should have 0 repos and all HTML rendered', () => {
    cy.visit('/add_repo');
    cy.url().should('include', '/add_repo');
    cy.contains('PRaise').should('be.visible');
    cy.contains('Add').should('be.visible');
    cy.contains('Clear Repos').should('be.visible');
    cy.contains('List of repos added: 0').should('be.visible');
  });

  it('Should take input and submit', () => {
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
  });
});
