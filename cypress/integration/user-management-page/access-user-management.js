/*
 * This test is meant to verify that only super admin user can
 * access to user management tab.
 */

describe("Verify super admin can access User Management", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify("and has User Management tab", () => {
    cy.get("header").should("contain", "User Management")
  })

  specify("and can switch to User Management tab", () => {
    cy.get("header").contains("User Management").click()
    while (cy.get("h4").contains("User Management").length < 1) {
      cy.wait(1000)
    }
  })
})

describe("Verify client admin can't access User Management", () => {
  before(function () {
    cy.login(this.testData.users.client_admin_access_codes)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify("and does not have User Management tab", () => {
    cy.get("header").should("not.contain", "User Management")
  })

  specify("and cannot access User Management tab via url", () => {
    cy.visit("app/user-management")
    cy.url().should("eq", Cypress.config().baseUrl + "app/kit_status")
    cy.get("header").should("not.contain", "User Management")
    cy.get("header").should("contain", "Test Kits")
  })
})

describe("Verify partner admin can't access User Management", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_access_codes)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify("and does not have User Management tab", () => {
    cy.get("header").should("not.contain", "User Management")
  })

  specify("and cannot access User Management tab via url", () => {
    cy.visit("app/user-management")
    cy.url().should("eq", Cypress.config().baseUrl + "app/kit_status")
    cy.get("header").should("not.contain", "User Management")
    cy.get("header").should("contain", "Test Kits")
  })
})
