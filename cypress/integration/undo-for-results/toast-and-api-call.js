/*
 * This test is meant to verify Undo feature for results enetered.
 */

describe("Verify Results entered", () => {
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

    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify("Check if Toast appears when entering a result", () => {
    cy.get("[data-cy=kit-status-table]").should("be.visible")

    // click Kit Status Sample collected popup trigger
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

          // Save button is in Disabled state
          cy.get("[data-cy=detail-save]")
            .invoke("attr", "disabled")
            .should("exist")

          // Dismiss button is in Enabled state
          cy.get("button[class*='styles__DismissButton']").should("exist")

          // Add Results button is in Enabled state
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .click()

          // Add Results button diappers after click
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .should("not.exist")
          // Save button still Disabled
          cy.get("[data-cy=detail-save]")
            .invoke("attr", "disabled")
            .should("exist")

          // 3 result types available
          cy.get("div[data-cy='result-selector'][type='negative']")
          cy.get("div[data-cy='result-selector'][type='positive']")
          cy.get("div[data-cy='result-selector'][type='invalid']")

          cy.get("div[data-cy='result-selector'][type='negative']").click()

          // Save button becomes Enable state
          cy.get("[data-cy=detail-save]").click()

          // API call
          cy.intercept(
            "POST",
            req => {
              if (req.body.operationName.includes("enterRapidTestResult")) {
                req.alias = "enterRapidTestResult"
              }
              req.reply({
                data: {
                  enterRapidTestResult: {
                    id: 649,
                    errors: { value: "" },
                    __typename: "RapidTestResultOutput",
                  },
                },
              })
            }
          )

          cy.get(".Toastify__toast--success")

          // Save button should not exist
          cy.get("[data-cy=detail-save]").should("not.exist")

          // Dismiss button should not exist
          cy.get("button[class*='styles__DismissButton']").should("not.exist")

          // close Detail Drawer
          cy.get("[data-cy=close-detail]").click({ force: true })

          cy.clock()
          cy.tick(15000)

          //Toast is absent
          cy.get(".Toastify__toast--success").should("not.be.visible")
        }
      })
  })
})
