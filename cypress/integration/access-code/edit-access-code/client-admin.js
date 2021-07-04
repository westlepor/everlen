/*
 * This tests login in as a client admin
 * and checks the edit access code page.
 */

describe("logging in as client admin and check", () => {
  before(function () {
    cy.login(this.testData.users.client_admin_access_codes)
  })

  specify("the edit access code page is visible", () => {
    cy.get("[data-cy=admin]").click()
    cy.get("tbody").find("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
    cy.get(".popup-content").contains("Edit Access Code").click()
    cy.get("h3").should("have.text", "Edit Access Code")
  })

  specify("the edit access code page has the proper default states", () => {
    // confirm the selected value of Select Client
    cy.get("#name").invoke("val").should("be.not.empty")

    // confirm that the Code is disabled
    cy.get("#code").should("be.disabled")

    // confirm that the Timezone Selector is disabled when the Start Date is disabled
    cy.get("#startDate").then($startDate => {
      if ($startDate.prop("disabled")) {
        cy.get("[data-cy=timezone-selector-label-disabled]").should(
          "be.visible"
        )
      }
    })

    // confirm that the length of the Delivery Options is at least 1
    cy.get("[data-cy=delivery-option]").should("have.length.of.at.least", 1)

    // confirm that the length of the checked Delivery Options is at least 1
    cy.get("[data-cy=delivery-option]")
      .find("input:checked")
      .should("have.length.of.at.least", 1)

    // check that the Save button is not disabled
    cy.get("button[type=submit]").should("be.not.disabled")
  })

  specify("the save access code button is enabled by inputing", () => {
    // input name
    cy.get("#name").clear()
    cy.get("button[type=submit]").should("be.disabled")
    cy.get("#name").type("name")
    cy.get("button[type=submit]").should("be.not.disabled")

    // test that the Delivery Options are unchecked
    cy.get("[data-cy=delivery-option]")
      .find("input")
      .uncheck({ multiple: true })
    cy.get("button[type=submit]").should("be.disabled")
  })
})
