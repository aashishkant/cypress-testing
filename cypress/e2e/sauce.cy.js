describe('Sauce Demo Login Tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  // VALID LOGIN TESTS
  it('should login successfully with standard_user credentials', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('should login successfully with problem_user credentials', () => {
    cy.login('problem_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('should login successfully with performance_glitch_user credentials', () => {
    cy.login('performance_glitch_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  // INVALID LOGIN TESTS
  it('should not login with invalid username', () => {
    cy.login('invalid_user', 'secret_sauce');
    cy.get('[data-test="error"]').should('be.visible');
  });

  it('should not login with invalid password', () => {
    cy.login('standard_user', 'wrong_password');
    cy.get('[data-test="error"]').should('be.visible');
  });

  it('should not login with locked_out_user credentials', () => {
    cy.login('locked_out_user', 'secret_sauce');
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
  });

  it('should not login with empty username', () => {
    cy.login('', 'secret_sauce');
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  it('should not login with empty password', () => {
    cy.login('standard_user', '');
    cy.get('[data-test="error"]').should('contain', 'Password is required');
  });

});
