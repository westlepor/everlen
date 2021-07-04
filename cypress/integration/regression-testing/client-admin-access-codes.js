/*
 * This test is meant to check a client admin with access codes logging in does not have
 * super admin features/access.
 */

describe("logging in as client admin with access codes permission", () => {
  before(function () {
    cy.login(this.testData.users.client_admin_access_codes)
  })

  specify("super admin banner not visible", () => {
    cy.get("div[data-cy=super-admin-banner]").should("not.exist")
  })

  specify("select table headers are visible", () => {
    cy.checkTable()
    cy.checkClientHeaders()
  })

  specify("select table headers can filters", () => {
    cy.checkClientFilters()
  })

  specify("administration tab is accessible", () => {
    cy.get("header").should("contain", "Administration")
    cy.get("header").contains("Administration").click()
    cy.get("h3:contains(Access Codes)").should("be.visible")
    cy.get("button:contains(Create Access Code)").should("be.visible")
    cy.get("tbody").children().its("length").should("be.gt", 0)
    cy.get("tbody")
      .children()
      .eq(0)
      .find("div[data-cy=popup-trigger]")
      .trigger("mouseover")
    cy.get(".popup-content").should("contain", "Edit Access Code")
  })

  specify("profile has correct name and company", function () {
    cy.get("[data-cy=navbar-profile]").should("be.visible")
    cy.get("[data-cy=navbar-profile]").click()
    cy.get("[data-cy=navbar-profile-dropdown]").should("be.visible")
    cy.get("[data-cy=navbar-profile-dropdown]").contains("Setting").click()
    cy.get("div[data-cy=user-profile]").should("contain", "Name")
    cy.get("div[data-cy=user-profile]").should(
      "contain",
      this.testData.users.client_admin_access_codes.name
    )
    cy.get("div[data-cy=user-profile]").should("contain", "Company")
    this.testData.users.client_admin_access_codes.companies.forEach(company => {
      cy.get("div[data-cy=user-profile]").should("contain", company)
    })
  })
})
