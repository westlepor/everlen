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

  specify("Test Undo limit", () => {
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

          // Add Results button diappers after click
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .click()

          // Select negative
          cy.get("div[data-cy='result-selector'][type='negative']").click()

          // click Save button
          cy.get("[data-cy=detail-save]").click()

          cy.get("[data-cy=close-detail]").click({ force: true })

          // Click on Change 1st time
          cy.get(".Toastify__toast--success a").contains("Change Here").click()

          // Add Results button diappers after click
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .should("not.exist")

          // Negative is selected
          cy.get("div[data-cy='result-selector'][type='negative']")
            .should("have.css", "border-top-color")
            .and("not.eq", "rgb(214, 235, 221)")

          // Save button is in Disabled state
          cy.get("[data-cy=detail-save]")
            .invoke("attr", "disabled")
            .should("exist")

          cy.wait(1500)

          // Change 2nd time
          cy.get("div[data-cy='result-selector'][type='positive']").click()
          cy.get("[data-cy=detail-save]").click()

          // Click on Change 2nd time
          cy.get(".Toastify__toast--success a")
            .contains("Change Here")
            .click({ force: true })

          // Add Results button diappers after click
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .should("not.exist")

          // Positive is selected
          cy.get("div[data-cy='result-selector'][type='positive']")
            .should("have.css", "border-top-color")
            .and("not.eq", "rgb(214, 235, 221)")

          // Change 3rd time
          cy.get("div[data-cy='result-selector'][type='invalid']").click()
          cy.get("[data-cy=detail-save]").click()

          // Click on Change 3rd time
          cy.get(".Toastify__toast--success a").contains("Change Here").click()

          // Invalid is selected
          cy.get("div[data-cy='result-selector'][type='invalid']")
            .should("have.css", "border-top-color")
            .and("not.eq", "rgb(214, 235, 221)")

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

          // Change 4th time
          cy.get("div[data-cy='result-selector'][type='positive']").click()
          cy.get("[data-cy=detail-save]").click()

          // Save button does not exist anymore
          cy.get("[data-cy=detail-save]").should("not.exist")

          cy.get(".Toastify__toast--success").should("not.exist")
        }
      })
  })
})
