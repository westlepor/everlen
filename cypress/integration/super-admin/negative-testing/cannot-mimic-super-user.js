/*
 * This test is meant to verify that the super admin feature can
 * handle certain edge cases for email input.
 */

describe("that you cannot masquerade another super admin", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
  })

  specify("super admin banner is visible", () => {
    cy.get("div[data-cy=super-admin-banner]").should("be.visible")
  })

  specify("try inputting another super user email", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.super_admin2.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "Can't mimic another super admin."
    )
  })

  specify("no notification icon", () => {
    cy.get(".raf-icon-badge").should("not.exist")
  })

  specify("no test kits", () => {
    cy.get("h4").should("contain", "No Test Kits")
  })

  specify("has administration tab", () => {
    cy.get("header").should("contain", "Administration")
  })

  specify("administration page does have access codes", () => {
    cy.get("header").contains("Administration").click()
    cy.get('button:contains("Create Access Code")').should("be.visible")
  })

  specify("profile has correct name and company", function () {
    cy.get("[data-cy=navbar-profile]").should("be.visible")
    cy.get("[data-cy=navbar-profile]").click()
    cy.get("[data-cy=navbar-profile-dropdown]").should("be.visible")
    cy.get("[data-cy=navbar-profile-dropdown]").contains("Setting").click()
    cy.get("div[data-cy=user-profile]").should("contain", "Name")
    cy.get("div[data-cy=user-profile]").should(
      "contain",
      this.testData.users.super_admin.name
    )
    cy.get("div[data-cy=user-profile]").should("contain", "Company")
    this.testData.users.super_admin.companies.forEach(company => {
      cy.get("div[data-cy=user-profile]").should("contain", company)
    })
  })
})
