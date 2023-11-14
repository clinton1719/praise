Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Check Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Check general Home Page', () => {
    cy.contains('PRaise').should('be.visible');
    cy.contains('Add Repo').should('be.visible');
    cy.contains("View PR's").should('be.visible');
  });
});

describe('Check Add Repo Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Should load correct URL', () => {
    cy.get('[id=add_repo]').should('be.visible').click();
    cy.url().should('include', '/add_repo');
  });
});

describe('Check View PR Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Should load correct URL', () => {
    cy.get('[id=view_pr]').should('be.visible').click();
    cy.url().should('include', '/view_pr');
  });
});

describe('Should have footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Should contain footer text', () => {
    cy.contains('Made with Next.JS by Clinton Fernandes').should('be.visible');
  });
});
