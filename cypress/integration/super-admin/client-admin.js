/*
 * This test is meant to check a super admin logging in and then
 * masquerading with a client admin
 */

describe("logging in as super admin and masquerade with client admin", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
  })

  specify("it can masquerade client admin", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.client_admin.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").find('button:contains("Cancel")')
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "Role: enterprise client clinical admin"
    )
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "Client ID: 653"
    )
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "Can Manage Access Codes: No"
    )
  })

  specify("select table headers are visible", () => {
    cy.checkTable()
    cy.checkClientHeaders()
  })

  specify("select table headers can filters", () => {
    cy.checkClientFilters()
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
      this.testData.users.super_admin.name
    )
    cy.get("div[data-cy=user-profile]").should("contain", "Company")
    this.testData.users.super_admin.companies.forEach(company => {
      cy.get("div[data-cy=user-profile]").should("contain", company)
    })
  })
})
