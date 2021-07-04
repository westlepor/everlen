/*
 * This tests login in as a partner admin
 * and checks the create access code page.
 */
import {
  getTimezoneOffset,
  getActiveTimezones,
  isDST,
} from "../../../../src/utils/datetime"

describe("logging in as partner admin and check", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_access_codes)
  })

  specify("the create access code page is visible", () => {
    cy.get("[data-cy=admin]").click()
    cy.get("button[data-cy=create-access-code").click()
    cy.get("h3").should("have.text", "Create Access Code")
  })

  specify("the create access code page has the proper default states", () => {
    // confirm the selected value of Select Client
    cy.get("#client").should("have.value", "Select Client")

    // confirm that the Start Date is Today
    cy.get("#date-picker-startDate").should(
      "have.value",
      cy.accessCode.getToday()
    )

    // confirm that the End Date is empty
    cy.get("#date-picker-endDate").should("be.empty")

    if (!getActiveTimezones()[getTimezoneOffset()]) {
      // confirm that the Timezone is GMT-5 as default (if DST, GMT-4)
      cy.get("[data-cy=timezone-selector-label]").should(
        "include.text",
        isDST() ? "GMT-04" : "GMT-05"
      )
    }

    // confirm that the length of the Delivery Options is at least 1
    cy.get("[data-cy=delivery-option]").should("have.length.of.at.least", 1)

    // confirm that the 1st option of the Delivery Options is checked as default
    cy.get("[data-cy=delivery-option]").find("input").eq(0).should("be.checked")

    // check Code Usage
    cy.get("#once").should("be.checked")
    cy.get("#multiple").should("be.not.checked")

    // check that the Create button is disabled
    cy.get("[data-cy=create-access-code]").should("be.disabled")
  })

  specify("the create access code button is enabled by inputing", () => {
    // input name
    cy.get("#name").type("name")
    cy.get("[data-cy=create-access-code]").should("be.disabled")

    // input access code
    cy.get("#code").type("123")
    cy.get("[data-cy=create-access-code]").should("be.disabled")

    // check tests
    cy.get("[data-cy=tests]").then($tests => {
      if ($tests.find("input").length > 0) {
        cy.wrap($tests).find("input").eq(0).check()
      }
    })

    // test that the Delivery Options are unchecked
    cy.get("[data-cy=delivery-option]")
      .find("input")
      .uncheck({ multiple: true })
    cy.get("[data-cy=create-access-code]").should("be.disabled")

    // code usage
    cy.get("#multiple").check({ force: true })
    cy.get("[data-cy=frequency-amount]").should("be.visible")
    cy.get("[data-cy=occurrence]")
      .find("[data-cy=true]")
      .should("have.text", "Monthly")
    cy.get("[data-cy=occurrence]").find("button").eq(0).click()
    cy.get("[data-cy=occurrence]")
      .find("[data-cy=true]")
      .should("have.text", "Weekly")
  })
})
