/*
 * This test is meant to verify user management page being hidden when super admin masquerading.
 */

describe("Verify Super Admin when mamasquerading", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
    cy.get("h5").contains("User Management").click()
    cy.get("h4").should("contain", "User Management")
  })

  specify("can't see User Management tab", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.client_admin.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").find('button:contains("Cancel")')
    cy.get("div[data-cy=super-admin-banner]")
      .should("contain", "Role: enterprise client clinical admin")
      .and("contain", "Can Manage Access Codes: No")
      .and("contain", "Can Register Kits: No")
    cy.get("h5").contains("User Management").should("not.exist")
  })

  specify("and cant access User management via url", function () {
    cy.get("div[data-cy=super-admin-banner]").find('button:contains("Cancel")')
    cy.visit("app/user-management")
    cy.url().should("eq", Cypress.config().baseUrl + "app/kit_status")
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.client_admin.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.get("header").should("not.contain", "User Management")
    cy.get("header").should("contain", "Test Kits")
  })

  specify("and see User Management tab back when ", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("Cancel")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "You are currently a Super Admin."
    )
    cy.get("h5").contains("User Management").click()
    cy.get("h4").contains("User Management")
  })
})
