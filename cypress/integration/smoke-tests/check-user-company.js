/*
 * Checks that the user profile has some text for the company section.
 */

describe("Confirm user has proper access to company in user profile", () => {
  before(function () {
    cy.login(this.testData.users.multiple_client_admin)
  })

  specify("the profile dropdown is visible", () => {
    cy.get("[data-cy=navbar-profile]").click()
    cy.get("[data-cy=navbar-profile-dropdown]").should("be.visible")
  })

  specify("the profile dropdown displays the correct information", function () {
    cy.get("[data-cy=navbar-profile-dropdown]").should("contain", "Settings")
    cy.get("li").should("contain", "Log Out")
    cy.get("[data-cy=navbar-profile-dropdown]").should(
      "contain",
      this.testData.users.multiple_client_admin.name,
    )
    cy.get("[data-cy=navbar-profile-dropdown]").should(
      "contain",
      this.testData.users.multiple_client_admin.username,
    )
  })

  specify("user has correct company", () => {
    cy.get("[data-cy=navbar-profile-dropdown]").contains("Setting").click()
    cy.contains("Company").should("be.visible")
    cy.contains("Company").next().should("be.visible")
    cy.contains("Company").next().children().its("length").should("be.gt", 0)
  })
})
