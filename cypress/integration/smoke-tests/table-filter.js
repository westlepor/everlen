/*
 * Check filtering functionality for Vitamin-D tests work as expected
 * Needs to have a user with vitamin-d tests in order to work
 */

describe("Verify vitamin-d filtering is functioning properly", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_vitamin_d)

    cy.checkTable()

    cy.get("body").then($body => {
      if ($body.text().includes("No Results Found")) {
        cy.reload()
      }
    })

    cy.get("[data-cy=table-row]").its("length").should("be.gt", 1)
  })

  specify("filters have loaded", () => {
    cy.get("[data-cy=table-header]")
      .find("[data-cy=table-header-cell-value]")
      .eq(7)
      .should("contain", "Test Name")

    cy.get("[data-cy=table-header]")
      .find("[data-cy=table-header-cell-value]")
      .eq(8)
      .should("contain", "Result")
  })

  specify("selecting vitamin-d test shows all vitamin-d tests", () => {
    cy.get("[data-cy=table-header-cell]")
      .eq(7)
      .find("div[data-cy=inlinefilter-popup-trigger]")
      .click()
    cy.get(".popup-content ")
      .contains("Vitamin D Test")
      .find("input[type=checkbox]")
      .click({ force: true })
    cy.get(".popup-content ")
      .find("button")
      .contains("Apply")
      .click({ force: true })

    cy.checkTable()
    cy.get("[data-cy=table-row]").each($row => {
      cy.wrap($row)
        .find("[data-cy=table-cell]")
        .eq(7)
        .should("contain", "Vitamin D Test")
    })
  })

  specify("filter for 'normal' results", () => {
    cy.get("[data-cy=table-header-cell]")
      .eq(8)
      .find("div[data-cy=inlinefilter-popup-trigger]")
      .click()
    cy.get(".popup-content ")
      .contains("Normal")
      .find("input[type=checkbox]")
      .click({ force: true })
    cy.get(".popup-content ")
      .find("button")
      .contains("Apply")
      .click({ force: true })

    cy.checkTable()
    cy.get("[data-cy=table-row]").each($row => {
      cy.wrap($row)
        .find("[data-cy=table-cell]")
        .eq(8)
        .should("contain", "Normal")
    })
  })

  specify("filter for 'Needs Review' results", () => {
    cy.get("[data-cy=table-header-cell]")
      .eq(8)
      .find("div[data-cy=inlinefilter-popup-trigger]")
      .click()
    cy.get(".popup-content ")
      .contains("Normal")
      .find("input[type=checkbox]")
      .click({ force: true })
    cy.get(".popup-content ")
      .contains("Needs Review")
      .find("input[type=checkbox]")
      .click({ force: true })
    cy.get(".popup-content ")
      .find("button")
      .contains("Apply")
      .click({ force: true })

    cy.checkTable()
    cy.get("[data-cy=table-row]").each($row => {
      cy.wrap($row)
        .find("[data-cy=table-cell]")
        .eq(8)
        .should("contain", "Needs Review")
    })
  })
})
