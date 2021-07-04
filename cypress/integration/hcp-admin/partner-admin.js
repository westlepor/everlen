/*
 * This tests login in as a HCP partner admin
 * and checks the HCP-related columns.
 */

import { HCP_COLUMN_HEADERS } from "../../../src/utils/cypress-constants"

describe("logging in as HCP partner admin and check", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_hcp)

    cy.get("body").then($body => {
      if (!$body.find("[data-cy=clia-waiver-form]").length) {
        cy.get("[data-cy=change-clia-waiver]").click()
      }
    })

    cy.get("[data-testid=clia-input]").should("not.have.value", "")
    cy.get("[data-cy=clia-waiver-submit]").click()
    cy.contains("Successfully entered CLIA Waiver Number")

    cy.checkTable()
  })

  specify("make sure that the Manage Columns Selector doesn't exist", () => {
    cy.get("div").contains("Manage Columns").should("not.exist")
  })

  specify("the table has HCP related header", () => {
    cy.get("[data-cy=table-header]").should("be.visible")
    cy.get("[data-cy=table-header-cell]").as("headerCells")
    HCP_COLUMN_HEADERS.forEach(checkHeader => {
      cy.get("@headerCells").contains(checkHeader)
    })
  })

  specify("the detail drawer shows HCP related information", () => {
    cy.get("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
    cy.get(".popup-content").contains("Details").click()
    cy.get("[data-cy=detail-view]").should("be.visible")
    cy.get("[data-cy=detail-view]").contains("Results Entered")
    cy.get("[data-cy=detail-view]").contains("Sample Collected")
    // close Detail Drawer
    cy.get("[data-cy=close-detail]").click({ force: true })
  })

  specify(
    "the entry with the empty collectedAt displays CollectedAt popup at detail drawer",
    () => {
      cy.get("[data-cy=kit-status-table]").should("be.visible")

      // click Kit Status Registered popup trigger
      cy.get("[data-cy=table-header-cell]")
        .eq(2)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()

      // clear other filters
      cy.get(".popup-content").find("input[type=checkbox]").uncheck()
      cy.wait(2000)

      cy.get(".popup-content")
        .contains("Registered")
        .find("input[type=checkbox]")
        .then($input => {
          // close Filter popup if Registered checkbox is disabled by zero count
          if ($input.attr("disabled")) {
            cy.get("[data-cy=table-header-cell]")
              .eq(1)
              .find("div[data-cy=inlinefilter-popup-trigger]")
              .click()
          } else {
            // filter by Kit Status Registered
            cy.get(".popup-content")
              .contains("Registered")
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

            // Add Results button is in Disabled state
            cy.get("[data-cy=detail-view]")
              .find("button")
              .contains("Add Results")
              .invoke("attr", "data-cy")
              .should("have.string", "true")

            // Save button is in Disabled state
            cy.get("[data-cy=detail-save]")
              .invoke("attr", "disabled")
              .should("exist")

            // check if Collect Sample button is enabled
            cy.get("[data-cy=detail-view]")
              .find("button")
              .contains("Collect Sample")
              .then($input => {
                // Collect Sample button would be disabled because of the empty clia-waiver-number
                if (!$input.attr("disabled")) {
                  cy.wrap($input).click({ force: true })

                  // Collect Sample button disappears
                  cy.get("[data-cy=detail-view]").should(
                    "not.contain",
                    "Collect Sample"
                  )

                  // Save button becomes Enable state
                  cy.get("[data-cy=detail-save]")
                    .invoke("attr", "disabled")
                    .should("not.exist")
                }
              })

            // close Detail Drawer
            cy.get("[data-cy=close-detail]").click({ force: true })
          }
        })
    }
  )

  specify(
    "the entry with the empty Results Entered displays Add Results popup at detail drawer",
    () => {
      cy.get("[data-cy=kit-status-table]").should("be.visible")

      // click Kit Status Sample Collected popup trigger
      cy.get("[data-cy=table-header-cell]")
        .eq(2)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()

      // clear other filters
      cy.get(".popup-content").find("input[type=checkbox]").uncheck()
      cy.wait(2000)

      cy.get(".popup-content")
        .contains("Sample Collected")
        .find("input[type=checkbox]")
        .then($input => {
          // close Filter popup if Sample Collected checkbox is disabled by zero count
          if ($input.attr("disabled")) {
            cy.get("[data-cy=table-header-cell]")
              .eq(1)
              .find("div[data-cy=inlinefilter-popup-trigger]")
              .click()
          } else {
            // filter by Kit Status Sample Collected
            cy.get(".popup-content")
              .contains("Sample Collected")
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

            // Collect Sample button doesn't exist
            cy.get("[data-cy=detail-view]").should(
              "not.contain",
              "Collect Sample"
            )

            // Save button is in Disabled state
            cy.get("[data-cy=detail-save]")
              .invoke("attr", "disabled")
              .should("exist")

            // check if Add Results button is enabled
            cy.get("[data-cy=detail-view]")
              .find("button")
              .contains("Add Results")
              .then($input => {
                if (!$input.attr("disabled")) {
                  // click Add Results button
                  cy.wrap($input).click({ force: true })

                  // Collect Sample button disappears
                  cy.get("[data-cy=detail-view]").should(
                    "not.contain",
                    "Collect Sample"
                  )

                  // select one result
                  cy.get("[data-cy=result-selector]")
                    .contains("Invalid")
                    .click({ force: true })

                  // Save button becomes Enable state
                  cy.get("[data-cy=detail-save]")
                    .invoke("attr", "disabled")
                    .should("not.exist")
                }
              })

            // close Detail Drawer
            cy.get("[data-cy=close-detail]").click({ force: true })
          }
        })
    }
  )
})
