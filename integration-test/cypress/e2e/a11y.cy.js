function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task('table', violationData);
}

describe('Check Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });
  it('Should pass accessibility tests', () => {
    cy.checkA11y(null, null, terminalLog);
  });
});

describe('Check View PR page', () => {
  beforeEach(() => {
    cy.visit('/view_pr');
    cy.injectAxe();
  });
  it('Should pass accessibility tests', () => {
    cy.checkA11y(null, null, terminalLog);
  });
});
