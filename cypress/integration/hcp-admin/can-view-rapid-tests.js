/*
 * This tests login in as a admin who can view Rapid Tests
 * and checks the HCP-related columns.
 */

import {
  HCP_COLUMN_HEADERS_FOR_NORMAL_USER,
  ALL_COLUMN_HEADERS_WITH_HCP,
  HCP_STATUS,
} from "../../../src/utils/cypress-constants"

describe("logging in as a admin who can view Rapid Tests and check", () => {
  before(function () {
    cy.login(this.testData.users.can_view_rapid_tests)
    cy.checkTable()
  })

  specify("HCP related columns are visible in table", () => {
    cy.get("div[data-cy=table-header]").should("be.visible")
    cy.get("div[data-cy=table-header]")
      .find("div[data-cy=table-header-cell]")
      .find("span")
      .as("headers")

    HCP_COLUMN_HEADERS_FOR_NORMAL_USER.forEach(checkHeader => {
      cy.get("@headers").contains(checkHeader)
    })
  })

  specify("the Kit Status inline filter popup shows HCP related status", () => {
    // click Kit Status popup trigger
    cy.get("[data-cy=inlinefilter-popup-trigger][id=KitStatus]").as("trigger")
    cy.get("@trigger").click()

    // make sure that it includes HCP related status
    HCP_STATUS.forEach(checkHeader => {
      cy.get(".popup-content").contains(checkHeader)
    })

    // close Kit Status popup
    cy.get("@trigger").click()
  })

  specify("HCP related columns are all checked", () => {
    // open Manage Columns Selector popup
    cy.get("div").contains("Manage Columns").click({ force: true })

    // HCP related columns are all checked
    ALL_COLUMN_HEADERS_WITH_HCP.forEach((checkHeader, index) => {
      cy.get(".popup-content").children().children().eq(index).as("rowOption")
      if (HCP_COLUMN_HEADERS_FOR_NORMAL_USER.includes(checkHeader)) {
        cy.get("@rowOption")
          .find("input[type=checkbox]")
          .invoke("attr", "checked")
          .should("be.equal", "checked")
      }
    })

    // close Manage Columns Selector popup
    cy.get("div").contains("Manage Columns").click({ force: true })
  })

  specify(
    "the entries filtered by Sample Collected display a filled Collected At and an empty Results Entered/Results Entered At & the detail drawer shows HCP related information",
    () => {
      cy.get("[data-cy=inlinefilter-popup-trigger][id=KitStatus]").as("trigger")

      // remove filter
      cy.get("@trigger").click()
      cy.get(".popup-content").find("button").contains("Reset").click()

      //filter Kit by Sample Collected status
      cy.get("@trigger").click()
      cy.get(".popup-content")
        .contains("Sample Collected")
        .find("input[type=checkbox]")
        .click()
      cy.get(".popup-content").find("button").contains("Apply").click()

      cy.wait(1000)

      // entries filtered should exist
      cy.get("[data-cy=table-row]").eq(0).as("row")
      cy.get("@row").should("be.visible")

      // Kit Status column should include Sample Collected string
      cy.get("@row").find("[data-cy=table-cell]").as("cells")
      cy.get("@cells").eq(2).contains("Sample Collected")

      // Sample Collected column is not empty
      cy.get("@cells").eq(8).should("not.contain", "-")

      // Results Entered At column is empty
      cy.get("@cells").eq(12).contains("-")

      // Results Entered column is empty
      cy.get("@cells").eq(13).contains("-")

      // open Detail Drawer
      cy.get("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
      cy.get(".popup-content").contains("Details").click()
      cy.get("[data-cy=detail-view]").should("be.visible")
      cy.get("[data-cy=detail-view]").should("contain", "Sample Collected")

      // close Detail Drawer
      cy.get("[data-cy=close-detail]").click({ force: true })
    }
  )

  specify(
    "the entries filtered by Results Entered display a filled Collected At/Results Entered/Results Entered At & the detail drawer shows HCP related information",
    () => {
      cy.get("[data-cy=inlinefilter-popup-trigger][id=KitStatus]").as("trigger")

      // remove filter
      cy.get("@trigger").click()
      cy.get(".popup-content").find("button").contains("Reset").click()

      // filter kits by Results Entered status
      cy.get("@trigger").click()
      cy.get(".popup-content")
        .contains("Results Entered")
        .find("input[type=checkbox]")
        .click()
      cy.get(".popup-content").find("button").contains("Apply").click()

      cy.wait(1000)

      // entries filtered should exist
      cy.get("[data-cy=table-row]").eq(0).as("row")
      cy.get("@row").should("be.visible")

      // Kit Status column should include Results Entered string
      cy.get("@row").find("[data-cy=table-cell]").as("cells")
      cy.get("@cells").eq(2).contains("Results Entered")

      // Sample Collected column is not empty
      cy.get("@cells").eq(8).should("not.contain", "-")

      // Results Entered At column is not empty
      cy.get("@cells").eq(10).should("not.contain", "-")

      // Results Entered column is not empty
      cy.get("@cells").eq(11).should("not.contain", "-")

      // open Detail Drawer
      cy.get("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
      cy.get(".popup-content").contains("Details").click()
      cy.get("[data-cy=detail-view]").should("be.visible")
      cy.get("[data-cy=detail-view]").should("contain", "Sample Collected")
      cy.get("[data-cy=detail-view]").should("contain", "Results Entered")

      // close Detail Drawer
      cy.get("[data-cy=close-detail]").click({ force: true })
    }
  )
})
