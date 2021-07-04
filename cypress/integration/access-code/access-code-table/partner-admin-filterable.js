/*
 * This tests login in as a partner admin
 * and checks the access code pages.
 */

const dayjs = require("dayjs")

describe("logging in as partner admin and check", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_access_codes)

    cy.get("[data-cy=admin]").should("be.visible")

    cy.get("[data-cy=admin]").click()
    cy.get("[data-cy=access-code-table]").should("be.visible")
  })

  xspecify("the column 'Start Date' is filterable", () => {
    // open filter popup by Start Date column
    cy.get("table").find("[data-cy=opens_at-table-filter]").as("trigger")
    cy.get("@trigger").click()

    // filter by Last 30 days
    cy.get(".popup-content").find("[data-cy=date-filter-option]").as("filter")
    cy.get("@filter").eq(3).click({ force: true }) // filter option for Last 30 days
    cy.get(".popup-content")
      .find("button")
      .contains("Apply")
      .click({ force: true })

    cy.get("tbody")
      .find("tr")
      .then($rows => {
        if ($rows.length > 0) {
          cy.wrap($rows)
            .eq(0) // first row
            .find("td")
            .eq(4) // Start Date column
            .invoke("text")
            .then($text => {
              const target = dayjs($text)
              const now = dayjs()
              const diff = now.diff(target)
              cy.wrap(diff).should("be.at.most", 30 * 24 * 3600 * 1000)
            })
        }
      })

    cy.get("@trigger").click()
    cy.get(".popup-content")
      .find("button")
      .contains("Reset")
      .click({ force: true })
  })

  xspecify("the column 'End Date' is filterable", () => {
    // open filter popup by End Date column
    cy.get("table").find("[data-cy=closes_at-table-filter]").as("trigger")
    cy.get("@trigger").click()

    // filter by Last 30 days
    cy.get(".popup-content").find("[data-cy=date-filter-option]").as("filter")
    cy.get("@filter").eq(3).click({ force: true }) // filter option for Last 30 days
    cy.get(".popup-content")
      .find("button")
      .contains("Apply")
      .click({ force: true })

    cy.get("tbody")
      .find("tr")
      .then($rows => {
        if ($rows.length > 0) {
          cy.wrap($rows)
            .eq(0) // first row
            .find("td")
            .eq(5) // End Date column
            .invoke("text")
            .then($text => {
              const target = dayjs($text)
              const now = dayjs()
              const diff = now.diff(target)
              cy.wrap(diff).should("be.at.most", 30 * 24 * 3600 * 1000)
            })
        }
      })
  })
})
