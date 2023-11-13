Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Add Repo should work', () => {
  it('Should have 0 repos and all HTML rendered', () => {
    cy.visit('/add_repo');
    cy.wait(5000);
    cy.url().should('include', '/add_repo');
    cy.contains('PRaise').should('be.visible');
    cy.contains('Add').should('be.visible');
    cy.contains('Clear Repos').should('be.visible');
    cy.contains('List of repos added: 0').should('be.visible');
  });
});
