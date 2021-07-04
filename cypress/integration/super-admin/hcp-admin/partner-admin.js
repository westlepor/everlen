/*
 * This test is meant to check a super admin logging in and then
 * masquerading with a HCP partner admin
 */
import {
  HCP_COLUMN_HEADERS,
  HCP_RESULTS_ENTERED_VALUE,
} from "../../../../src/utils/cypress-constants"

describe("logging in as super admin and masquerade with HCP partner admin", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
  })

  specify("it can masquerade HCP partner admin", function () {
    cy.get("div[data-cy=super-admin-banner]")
      .find("input")
      .type(this.testData.users.partner_admin_hcp.username)
    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("View as User")')
      .click()
    cy.get("div[data-cy=super-admin-banner]").find('button:contains("Cancel")')
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "Role: enterprise partner hcp"
    )
    cy.get("div[data-cy=super-admin-banner]").should("contain", "Partner ID: ")
    cy.get("div[data-cy=super-admin-banner]").should(
      "contain",
      "Can Manage Access Codes: No"
    )
  })

  specify("make sure that the support PDF icon exists", () => {
    cy.get("[data-cy=support-pdf-icon]").should("be.visible")
  })

  specify("the table has HCP related header", () => {
    cy.checkTable()
    cy.get("[data-cy=table-header]").should("be.visible")
    cy.get("[data-cy=table-header-cell]").as("headerCells")
    HCP_COLUMN_HEADERS.forEach(checkHeader => {
      cy.get("@headerCells").contains(checkHeader).should("be.visible")
    })
  })

  specify("Administration tab is not visible", () => {
    cy.get("header").should("not.contain", "Administration")
  })

  specify(
    "selecting the Kit Status filter shows all HCP related status",
    () => {
      cy.get("[data-cy=table-header-cell]")
        .eq(1)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()

      HCP_COLUMN_HEADERS.forEach(checkHeader => {
        cy.get(".popup-content").contains(checkHeader).should("be.visible")
      })
    }
  )

  specify(
    "selecting the Results Entered filter shows all HCP related status",
    () => {
      cy.get("[data-cy=table-header-cell]")
        .eq(5)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()

      HCP_RESULTS_ENTERED_VALUE.forEach(checkHeader => {
        cy.get(".popup-content").contains(checkHeader).should("be.visible")
      })

      // close popup
      cy.get("[data-cy=table-header-cell]")
        .eq(5)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click({ force: true })
    }
  )

  specify("the detail drawer shows HCP related information", () => {
    cy.get("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
    cy.get(".popup-content").contains("Details").click()
    cy.get("[data-cy=detail-view]").should("be.visible")
    cy.get("[data-cy=detail-view]").contains("Results Entered")
    cy.get("[data-cy=detail-view]").contains("Sample Collected")
  })

  specify(
    "make sure that Kit Status inline filter filters Result Entered",
    () => {
      cy.checkTable()

      // click Kit Status Registered popup trigger
      cy.get("[data-cy=table-header-cell]")
        .eq(1)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()

      // clear other filters
      cy.get(".popup-content").find("input[type=checkbox]").uncheck()

      cy.get(".popup-content")
        .contains("Results Entered")
        .find("input[type=checkbox]")
        .then($input => {
          // close Filter popup if Results Entered checkbox is disabled by zero count
          if ($input.attr("disabled")) {
            cy.get("[data-cy=table-header-cell]")
              .eq(1)
              .find("div[data-cy=inlinefilter-popup-trigger]")
              .click()
          } else {
            // filter by Kit Status Results Entered
            cy.get(".popup-content")
              .contains("Results Entered")
              .find("input[type=checkbox]")
              .click({ force: true })
            cy.get(".popup-content")
              .find("button")
              .contains("Apply")
              .click({ force: true })

            // open Detail Drawer
            cy.get("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
            cy.get(".popup-content").contains("Details").click()
            cy.get("[data-cy=detail-view]").should("be.visible")
            cy.get("[data-cy=detail-view]").should("contain", "Results Entered")
            cy.get("[data-cy=detail-view]").should(
              "contain",
              "Sample Collected"
            )

            // close Detail Drawer
            cy.get("[data-cy=close-detail]").click({ force: true })
          }
        })
    }
  )
})
