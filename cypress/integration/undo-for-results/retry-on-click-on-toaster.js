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

  specify("Test if Retrying happens when clicking on toaster", () => {
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
            .eq(2)
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

          // add Results button diappers after click
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .click()

          // 3 result types available
          cy.get("div[data-cy='result-selector'][type='negative']").click()

          // click Save button
          cy.get("[data-cy=detail-save]").click()

          cy.get("[data-cy=close-detail]").click({ force: true })

          cy.get(".Toastify__toast--success a").contains("Change Here").click()

          cy.get(".Toastify__toast--success a").should("not.exist")

          // add Results button diappers after click
          cy.get("[data-cy=detail-view]")
            .find("button")
            .contains("Add Results")
            .should("not.exist")

          // 3 result types available
          cy.get("div[data-cy='result-selector'][type='negative']")
          cy.get("div[data-cy='result-selector'][type='positive']")
          cy.get("div[data-cy='result-selector'][type='invalid']")

          // countdown
          cy.get("div[class*='style__PendingResultsEnteredCountDown']")

          // save button is in Disabled state
          cy.get("[data-cy=detail-save]")
            .invoke("attr", "disabled")
            .should("exist")

          // dismiss button is in Enabled state
          cy.get("button[class*='styles__DismissButton']").should("exist")

          cy.get("div[data-cy='result-selector'][type='positive']").click()
          cy.get("[data-cy=detail-save]").should("exist")

          cy.get("div[data-cy='result-selector'][type='negative']").click()
          cy.get("[data-cy=detail-save]")
            .invoke("attr", "disabled")
            .should("exist")
        }
      })
  })

  specify(
    "Test if API call happens 60s later when you don't change the result",
    () => {
      cy.wait(55000)

      // API
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

      cy.get("div[data-cy='result-selector'][type='negative']").should(
        "not.exist"
      )
      cy.get("div[data-cy='result-selector'][type='positive']").should(
        "not.exist"
      )
      cy.get("div[data-cy='result-selector'][type='invalid']").should(
        "not.exist"
      )

      cy.get("h5[class*='CapitalizedText']").contains("negative")

      // countdown absent
      cy.get("div[class*='style__PendingResultsEnteredCountDown']").should(
        "not.exist"
      )

      cy.get("[data-cy=detail-save]").should("not.exist")

      // dismiss button is in Enabled state
      cy.get("button[class*='styles__DismissButton']").should("not.exist")
    }
  )
})
