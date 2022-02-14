require('cypress-plugin-tab');


context('login', () => {

  const errorMessage = 'Leider konnten wir Sie nicht einloggen, da Sie falsche Daten eingegeben haben. Bitte überprüfen Sie Ihre Angaben noch einmal.'

  beforeEach(() => {
    cy.visit('localhost:4200');
  });

  it('renders', () => {
    cy.contains('LINK');
  });

  it('should not show header on mobile', () => {
    cy.viewport('iphone-5');
    cy.get('#header-background').should('not.be.visible');
  });

  it('should show header on desktop', () => {
    cy.viewport(1920, 1080);
    cy.get('#header-background').should('be.visible');
  });

  it('logs in', () => {
    cy.get('#email').type('ada.lovelace@nix.io');
    cy.get('#password').type('Test12345_');
    cy.get('#login_button').click();

    cy.location('pathname').should('include', 'home');
  });

  it('logs not in with wrong password', () => {
    cy.get('#login_error').should('not.exist')
    cy.get('#email').type('ada.lovelace@nix.io')
    cy.get('#password').type('Test145_')
    cy.get('#login_button').click()
    cy.location('pathname').should('not.include', 'home')
    cy.get('#login_error').should('be.visible')
    cy.get('#login_error').should('exist')
    cy.contains(errorMessage)
  })

  it('logs not in with wrong username', () => {
    cy.get('#login_error').should('not.exist')
    cy.get('#email').type('ada.ace@nix.io')
    cy.get('#password').type('Test12345_')
    cy.get('#login_button').click()
    cy.location('pathname').should('not.include', 'home')
    cy.get('#login_error').should('be.visible')
    cy.get('#login_error').should('exist')
    cy.contains(errorMessage)
  })

  it('cant click button with no inputs', () => {
    cy.get('#login_button')
      .should('be.disabled')
  })

  it('cant click button with only email', () => {
    cy.get("#email").type('ada.lovelace@nix.io')
    cy.get('#login_button')
      .should('be.disabled')
  })

  it('cant click button with only password', () => {
    cy.get('#password').type('Test12345_')
    cy.get('#login_button')
      .should('be.disabled')
  })

  it('stays logged in', () => {
    cy.get('#email').type('ada.lovelace@nix.io')
    cy.get('#password').type('Test12345_')
    cy.get('#login_button').click()

    cy.location('pathname').should('include', 'home')
    //cy.wait(500)
    cy.visit('localhost:4200')
    cy.get('#email').should('not.exist')
    cy.location('pathname').should('include', 'home')
  })

  it('testing tab pressing in', () => {
    cy.get('#email').type('ada.lovelace@nix.io').tab().type('Test12345_')
    cy.get('#login_button').click()

    cy.location('pathname').should('include', 'home')
  })
});
