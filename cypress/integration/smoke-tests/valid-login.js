/*
  Confirms that a verified user with proper login credentails can log in.
*/

describe("Confirm registered user can correctly log in", () => {
  before(() => {
    cy.logoutViaApi()
    cy.visit('/')
  })

  beforeEach(() => {
    cy.get("form").find("input[id=okta-signin-username]").as("usernameInput")
    cy.get("form").find("input[id=okta-signin-password]").as("passwordInput")
    cy.get("form").find("input[type=submit]").as("submit")
  })

  specify("that username input accepts text", function () {
    cy.get("@usernameInput")
      .type(this.testData.users.partner_admin.username)
      .should("have.value", this.testData.users.partner_admin.username)
    cy.get("@usernameInput").clear()
  })

  specify("that password input accepts text", function () {
    cy.get("@passwordInput")
      .type(this.testData.users.partner_admin.password)
      .should("have.value", this.testData.users.partner_admin.password)
    cy.get("@passwordInput").clear()
  })

  specify("that user can access forgot password page", () => {
    cy.get(".auth-content").should("contain", "Need help logging in?")
    cy.get(".auth-content").contains("Need help logging in?").click()

    cy.get(".auth-content").should("contain", "Forgot password?")
    cy.get(".auth-content").should("contain", "Help")
    cy.get(".auth-content").contains("Forgot password?").click()

    cy.get("form").should("contain", "Reset Password")
    cy.get("input[id=account-recovery-username]").should("be.visible")
    cy.get("form").should("contain", "Reset via Email")
    cy.get(".auth-content").should("contain", "Back to Sign In")
    cy.get(".auth-content").contains("Back to Sign In").click()
  })

  specify("that user can successfully log in with valid credentials", function () {
    cy.get("@usernameInput").type(this.testData.users.partner_admin.username)
    cy.get("@passwordInput").type(this.testData.users.partner_admin.password)
    cy.get("@submit").click()
    cy.url().should("eq", "http://localhost:8000/app/kit_status")
    cy.checkTable()
    cy.get("h3").should("contain", "Test Kits")
  })
})
