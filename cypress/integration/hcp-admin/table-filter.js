/*
 * Check filter popup for HCP partner admin work as expected
 */

import {
  HCP_COLUMN_HEADERS,
  HCP_RESULTS_ENTERED_VALUE,
} from "../../../src/utils/cypress-constants"

describe("Verify if the filter content for HCP partner admin is correct", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_hcp)

    cy.get("body").then($body => {
      if (!$body.find("[data-cy=clia-waiver-form]").length) {
        cy.get("[data-cy=change-clia-waiver]").click({ force: true })
      }
    })

    cy.get("[data-testid=clia-input]").should("not.have.value", "")
    cy.get("body").then($body => {
      if ($body.find("[data-cy=modal-close]").length) {
        cy.get("[data-cy=modal-close]").click({ force: true })
      }
    })

    cy.checkTable()
  })

  specify(
    "selecting the Kit Status filter shows all HCP related status",
    () => {
      cy.get("[data-cy=table-header-cell]")
        .eq(2)
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
        .eq(6)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()

      HCP_RESULTS_ENTERED_VALUE.forEach(checkHeader => {
        cy.get(".popup-content").contains(checkHeader).should("be.visible")
      })

      // close popup
      cy.get("[data-cy=table-header-cell]")
        .eq(6)
        .find("div[data-cy=inlinefilter-popup-trigger]")
        .click()
    }
  )
})
