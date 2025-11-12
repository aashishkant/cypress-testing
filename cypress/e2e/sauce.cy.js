describe('Sauce Demo Login Tests', () => {

  // Run before every test case
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  // VALID LOGIN TESTS
  it('should login successfully with standard_user credentials', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });

  it('should login successfully with problem_user credentials', () => {
    cy.get('#user-name').type('problem_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });

  it('should login successfully with performance_glitch_user credentials', () => {
    cy.get('#user-name').type('performance_glitch_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });


  //  INVALID LOGIN TESTS
  it('should not login with invalid username', () => {
    cy.get('#user-name').type('invalid_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('be.visible');
  });

  it('should not login with invalid password', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('wrong_password');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('be.visible');
  });

  it('should not login with locked_out_user credentials', () => {
    cy.get('#user-name').type('locked_out_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
  });

  it('should not login with empty username', () => {
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  it('should not login with empty password', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Password is required');
  });

  it('should not login with both username and password empty', () => {
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

});
