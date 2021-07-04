/*
 * This tests login in as a partner admin
 * and checks they are able to adjust which
 * columns are visible in the table using the
 * dynamic table column feature.
 */

import {
  ALL_COLUMN_HEADERS,
  MINIMAL_COLUMN_HEADERS,
} from "../../../src/utils/cypress-constants"

describe("dynamic columns for partner admin works properly", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_dynamic_columns)
    cy.checkTable()
  })

  specify("make sure all columns are set to visible", () => {
    cy.contains("Manage Columns").click({ force: true })
    cy.get(".popup-content").should("be.visible")
    cy.get(".popup-content")
      .children()
      .children()
      .its("length")
      .should("eq", ALL_COLUMN_HEADERS.length)
    // force all checkbox to be checked
    cy.get(".popup-content").find("[type=checkbox]").check({ force: true })
    cy.get("div").contains("Manage Columns").click({ force: true })
  })

  specify("all columns are visible in table", () => {
    cy.get("div[data-cy=table-header]").should("be.visible")
    cy.get("div[data-cy=table-header]")
      .find("div[data-cy=table-header-cell]")
      .find("span")
      .as("headers")

    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get("@headers").eq(index).invoke("text").should("eq", checkHeader)
    })
  })

  specify("manage columns dropdown shows correct column options", () => {
    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.get(".popup-content").should("be.visible")

    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get(".popup-content").children().children().eq(index).as("rowOption")
      cy.get("@rowOption")
        .find("label")
        .invoke("text")
        .should("eq", checkHeader)
      if (MINIMAL_COLUMN_HEADERS.includes(checkHeader)) {
        cy.get("@rowOption").find("input[type=checkbox]").should("be.disabled")
      } else {
        cy.get("@rowOption")
          .find("input[type=checkbox]")
          .should("not.be.disabled")
      }
    })
    cy.get("div").contains("Manage Columns").click({ force: true })
  })

  xspecify("user can adjust table colums, trying one at a time", () => {
    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      if (!MINIMAL_COLUMN_HEADERS.includes(checkHeader)) {
        cy.get("div").contains("Manage Columns").click({ force: true })
        cy.get(".popup-content").children().children().eq(index).as("rowOption")
        cy.get("@rowOption")
          .find("input[type=checkbox]")
          .uncheck({ force: true })
        cy.get("div").contains("Manage Columns").click({ force: true })
        var CHECK_SPECIFIC_HEADERS = [...ALL_COLUMN_HEADERS]
        CHECK_SPECIFIC_HEADERS.splice(
          ALL_COLUMN_HEADERS.indexOf(checkHeader),
          1
        )
        cy.checkSpecificHeaders(CHECK_SPECIFIC_HEADERS)
        cy.get("div").contains("Manage Columns").click({ force: true })
        cy.get("@rowOption").find("input[type=checkbox]").check({ force: true })
        cy.get("div").contains("Manage Columns").click({ force: true })
      }
    })
  })

  specify("unchecking all possible columns works as expected", () => {
    cy.get("div").contains("Manage Columns").click({ force: true })
    ALL_COLUMN_HEADERS.forEach((checkHeader, index) => {
      cy.get(".popup-content").children().children().eq(index).as("rowOption")
      if (!MINIMAL_COLUMN_HEADERS.includes(checkHeader)) {
        cy.get("@rowOption")
          .find("input[type=checkbox]")
          .uncheck({ force: true })
      }
    })
    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.checkSpecificHeaders(MINIMAL_COLUMN_HEADERS)
  })

  // needed to revert back to normal for other tests to pass
  specify("check all columns works for other tests", () => {
    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.get(".popup-content").find("[type=checkbox]").check({ force: true })
    cy.get("div").contains("Manage Columns").click({ force: true })
    cy.checkSpecificHeaders(ALL_COLUMN_HEADERS)
  })
})
