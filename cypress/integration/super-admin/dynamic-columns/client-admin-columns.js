/*
 * This tests when logging in as a super user
 * the dynamic columns feature still works as
 * expected for client admin.
 */

import {
  ALL_COLUMN_HEADERS,
  MINIMAL_COLUMN_HEADERS,
} from "../../../../src/utils/cypress-constants"
// remove first element, "Cliet", should not be visible at all
ALL_COLUMN_HEADERS.shift()

describe("dynamic columns for super admin as client admin works properly", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
  })

  // Verify all columns for client admin
  specify("masquerading as client admin with all columns visible", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.client_admin_all_columns.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.checkMasqueradeBanner(this.testData.users.client_admin_all_columns)
  })

  specify("all columns are visible", () => {
    cy.checkTable()
    cy.get("div[data-cy=table-header]").should("be.visible")
    cy.get("div[data-cy=table-header]")
      .find("div[data-cy=table-header-cell]")
      .find("span")
      .as("headers")

    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get("@headers").eq(index).invoke("text").should("eq", checkHeader)
    })
    cy.get("@headers").should("not.contain", "Client")
  })

  specify("manage columns dropdown shows correct column options", () => {
    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.get(".popup-content").should("be.visible")
    cy.get(".popup-content")
      .children()
      .children()
      .its("length")
      .should("eq", ALL_COLUMN_HEADERS.length)

    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get(".popup-content").children().children().eq(index).as("rowOption")
      cy.get("@rowOption")
        .find("label")
        .invoke("text")
        .should("eq", checkHeader)
      cy.get("@rowOption").find("input[type=checkbox]").should("be.checked")
    })

    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("Cancel")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").find(
      'button:contains("View as User")'
    )
  })

  // Verify minimal columns for client admin
  specify("masquerading as client admin with minimal columns visible", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.client_admin_minimal_columns.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.checkMasqueradeBanner(this.testData.users.client_admin_minimal_columns)
  })

  specify("only minimal columns are visible", () => {
    cy.checkTable()
    cy.get("div[data-cy=table-header]").should("be.visible")
    cy.get("div[data-cy=table-header]")
      .find("div[data-cy=table-header-cell]")
      .find("span")
      .as("headers")

    MINIMAL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get("@headers").eq(index).invoke("text").should("eq", checkHeader)
    })
  })

  specify("manage columns dropdown shows correct column options", () => {
    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.get(".popup-content").should("be.visible")
    cy.get(".popup-content")
      .children()
      .children()
      .its("length")
      .should("eq", ALL_COLUMN_HEADERS.length)

    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get(".popup-content").children().children().eq(index).as("rowOption")
      cy.get("@rowOption")
        .find("label")
        .invoke("text")
        .should("eq", checkHeader)
      if (MINIMAL_COLUMN_HEADERS.includes(checkHeader)) {
        cy.get("@rowOption").find("input[type=checkbox]").should("be.checked")
      } else {
        cy.get("@rowOption")
          .find("input[type=checkbox]")
          .should("not.be.checked")
      }
    })

    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("Cancel")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").find(
      'button:contains("View as User")'
    )
  })
})
