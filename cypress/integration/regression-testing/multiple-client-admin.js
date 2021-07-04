/*
 * This test is meant to check a mutliple client admin logging in does not have
 * super admin features/access.
 */

describe("logging in as multiple client admin without access code permission", () => {
  before(function () {
    cy.login(this.testData.users.multiple_client_admin)
  })

  specify("super admin banner not visible", () => {
    cy.get("div[data-cy=super-admin-banner]").should("not.exist")
  })

  specify("select table headers are visible", () => {
    cy.checkTable()
    cy.checkHeaders()
  })

  specify("select table headers can filters", () => {
    cy.checkFilters()
  })

  specify("notifications are visible", () => {
    cy.get(".raf-icon-badge").eq(0).should("exist")
    cy.get(".raf-icon-badge").eq(0).click()
    cy.get(".raf-dropdown-panel__content").should("exist")
    cy.get(".raf-dropdown-panel__content")
      .children()
      .its("length")
      .should("be.gt", 0)
    cy.get(".raf-icon-badge").eq(0).click()
  })

  specify("Administration tab is not visible", () => {
    cy.get("header").should("not.contain", "Administration")
  })

  specify("profile has correct name and company", function () {
    cy.get("[data-cy=navbar-profile]").should("be.visible")
    cy.get("[data-cy=navbar-profile]").click()
    cy.get("[data-cy=navbar-profile-dropdown]").should("be.visible")
    cy.get("[data-cy=navbar-profile-dropdown]").contains("Setting").click()
    cy.get("div[data-cy=user-profile]").should("contain", "Name")
    cy.get("div[data-cy=user-profile]").should(
      "contain",
      this.testData.users.multiple_client_admin.name
    )
    cy.get("div[data-cy=user-profile]").should("contain", "Company")
    this.testData.users.multiple_client_admin.companies.forEach(company => {
      cy.get("div[data-cy=user-profile]").should("contain", company)
    })
  })
})
