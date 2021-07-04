/*
 * This test is meant to verify Undo feature for results enetered.
 */

describe("Verify Results entered", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_hcp)

    cy.get("body").then($body => {
      if (!$body.find("[data-cy=clia-waiver-form]").length) {
        cy.get("[data-cy=change-clia-waiver]").click({ force: true })
      }
    })

    cy.get("[data-testid=clia-input]").should("not.have.value", "")
    cy.get("[data-cy=clia-waiver-submit]").click()
    cy.contains("Successfully entered CLIA Waiver Number")

    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify(
    "Test if other timer expiration doesn't affect the current timer running",
    () => {
      cy.wait(1500)
      cy.get("[data-cy=table-header-cell]")
        .eq(2)
        .find("div[data-cy=inlinefilter-popup-trigger]", { timeout: 15000 })
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
            cy.get("[data-cy=popup-trigger]").eq(1).trigger("mouseover")
            cy.get(".popup-content").contains("Details").click()
            cy.get("[data-cy=detail-view]").should("be.visible")

            // click Add Results button
            cy.get("[data-cy=detail-view]")
              .find("button")
              .contains("Add Results")
              .click()

            cy.get("div[data-cy='result-selector'][type='negative']").click()

            // Save button click
            cy.get("[data-cy=detail-save]").click()

            cy.get("[data-cy=close-detail]").click({ force: true })

            //  invalid
            // open Detail Drawer
            cy.get("[data-cy=popup-trigger]").last().trigger("mouseover")
            cy.get(".popup-content").contains("Details").click()
            cy.get("[data-cy=detail-view]").should("be.visible")

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

            //close toaster
            cy.get(".Toastify__toast--success")
              .find("button[class*='Toastify__close-button']")
              .click()

            // Kit ID
            cy.get("div[class*='style__KitIDValue']").then(div => {
              const kitId = div.text()
              cy.log(kitId)

              cy.wait(1500)

              // click Add Results button
              cy.get("[data-cy=detail-view]")
                .find("button")
                .contains("Add Results")
                .click()

              cy.get("div[data-cy='result-selector'][type='invalid']").click()

              // Save button click
              cy.get("[data-cy=detail-save]").click()

              cy.get("[data-cy=close-detail]").click({ force: true })

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
                .contains(kitId)
                .parent()
                .find("a[class*='styles__ToastLink']")
                .contains("Change Here")
                .click()

              cy.get("div[data-cy='result-selector'][type='negative']")
              cy.get("div[data-cy='result-selector'][type='positive']")
              cy.get("div[data-cy='result-selector'][type='invalid']")

              // countdown absent
              cy.get("div[class*='style__PendingResultsEnteredCountDown']")

              cy.get("[data-cy=detail-save]")
                .invoke("attr", "disabled")
                .should("exist")

              // Dismiss button should not exist
              cy.get("button[class*='styles__DismissButton']").should("exist")

              // Add Results button diappers after click
              cy.get("[data-cy=detail-view]")
                .find("button")
                .contains("Add Results")
                .should("not.exist")

              cy.wait(50000)

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

              cy.get("div[data-cy='result-selector'][type='negative']").should(
                "not.exist"
              )
              cy.get("div[data-cy='result-selector'][type='positive']").should(
                "not.exist"
              )
              cy.get("div[data-cy='result-selector'][type='invalid']").should(
                "not.exist"
              )

              // countdown absent
              cy.get(
                "div[class*='style__PendingResultsEnteredCountDown']"
              ).should("not.exist")

              cy.get("[data-cy=detail-save]").should("not.exist")

              // Dismiss button should not exist
              cy.get("button[class*='styles__DismissButton']").should(
                "not.exist"
              )
            })
          }
        })
    }
  )
})
