/*
  Tests that the current user profile is displaying 
  correctly formatted information.
*/

describe("Confirm user profile diplays information correctly", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin)
  })

  specify("the profile button is visible", () => {
    cy.get("[data-cy=navbar-profile]").should("be.visible")
  })

  specify("the profile button has the correct name", function () {
    let name = this.testData.users.partner_admin.name
    name = name.split(" ")
    cy.get("[data-cy=navbar-profile]").should("contain", name[0])
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
      this.testData.users.partner_admin.name
    )
    cy.get("[data-cy=navbar-profile-dropdown]").should(
      "contain",
      this.testData.users.partner_admin.username
    )
  })

  context("Verify user settings", function () {
    before(() => {
      cy.get("[data-cy=navbar-profile-dropdown]").contains("Setting").click()
    })

    specify("that the user profile tab displays the correct information", function () {
      cy.contains("Settings")
      cy.contains("User Profile")
      cy.contains(this.testData.users.partner_admin.name)
      cy.contains("Log In Credentials")
      cy.contains(this.testData.users.partner_admin.username)
    }
    )

    specify("company section is correct", () => {
      cy.contains("Company").should("be.visible")
      cy.contains("Company").next().should("be.visible")
    })

    specify(
      "that the notifications tab displays the correct information",
      () => {
        cy.contains("Notifications").click()
        cy.contains("In App Notifications")
        cy.contains("Immediately notify me of results needing review")
        cy.contains("Immediately notify me of sample issues")
        cy.contains("Test Kit Overview")
        cy.contains(
          "Email me a summary of the prior day’s results, sample issues and kit status"
        )
        cy.wait(1500) // Third checkbox takes some time to load
        cy.get("input[type=checkbox]").its("length").should("eq", 3)
      }
    )
  })
})
