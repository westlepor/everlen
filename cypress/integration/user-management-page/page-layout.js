/*
 * This test is meant to verify user management page layout.
 */

describe("Verify User Management page layout", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify("has User management page content header", () => {
    cy.get("h5").contains("User Management").click()
    cy.get("h4").should("contain", "User Management")
  })

  specify("and has Groups and Users subtabs", () => {
    cy.get("a")
      .contains("Groups")
      .should("have.attr", "href", "/app/user-management/groups")
    cy.get("a")
      .contains("Users")
      .should("have.attr", "href", "/app/user-management/users")
  })

  specify("and Groups is selected by default", () => {
    cy.get("a").contains("Groups").should("have.attr", "isactive")
    cy.get("[data-cy=user-mgr-users]")
      .not("have.attr", "isactive")
      .contains("Users")
  })

  specify("and super admin can switch to Users", () => {
    cy.get("a").contains("Users").click()
    cy.get("a").contains("Users").should("have.attr", "isactive")
    cy.get("[data-cy=user-mgr-groups]")
      .not("have.attr", "isactive")
      .contains("Groups")
  })

  specify("and super admin can switch back to Groups", () => {
    cy.get("a").contains("Groups").click()
    cy.get("a").contains("Groups").should("have.attr", "isactive")
    cy.get("[data-cy=user-mgr-users]")
      .not("have.attr", "isactive")
      .contains("Users")
  })
})
