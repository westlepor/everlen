/*
 * This tests login in as a HCP admin
 * and checks the CLIA Waiver related data.
 */

describe("logging in as a HCP admin and check", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_hcp)
  })

  specify("the CollectingSampleTodayModal is visible", () => {
    cy.get("body").then($body => {
      if ($body.find("[data-cy=clia-waiver-form]").length) {
        cy.get("[data-cy=clia-waiver-form]").should("be.visible")
      } else {
        cy.get("[data-cy=change-clia-waiver]").click()
        cy.get("[data-cy=clia-waiver-form]").should("be.visible")
      }
    })
  })

  specify("the CLIA Waiver number is formatted correctly", () => {
    expect(
      cy
        .get("#clia")
        .invoke("val")
        .should("match", /^[a-zA-Z0-9]{10}$/)
    )
  })

  specify("the ZIP code is formatted correctly", () => {
    expect(
      cy
        .get("#zip5")
        .invoke("val")
        .should("match", /^[0-9]{5}$/)
    )
  })

  specify(
    "Modal should not be closed if at least one field is not filled up",
    () => {
      cy.get("#zip5").clear()
      cy.get("[data-cy=clia-waiver-submit]").click()
      cy.get("[data-cy=clia-waiver-form]").should("be.visible")
      cy.get("#zip5").type("12345")
      cy.get("[data-cy=clia-waiver-submit]").click()
      cy.get("[data-cy=clia-waiver-form]").should("not.exist")
    }
  )

  specify("Clicking X icon closes Modal", () => {
    // open modal
    cy.get("[data-cy=change-clia-waiver]").click()
    cy.get("[data-cy=clia-waiver-form]").should("be.visible")

    // close modal
    cy.get("[data-cy=modal-close]").click()
    cy.get("[data-cy=clia-waiver-form]").should("not.exist")
  })

  specify(
    "Enter CLIA Number button should show up if the user is HCP admin",
    () => {
      // Enter CLIA Number button exists
      cy.get("[data-cy=change-clia-waiver]").should("be.visible")

      // open modal
      cy.get("[data-cy=change-clia-waiver]").click()
      cy.get("[data-cy=clia-waiver-form]").should("be.visible")

      // close modal
      cy.get("[data-cy=modal-close]").click()
      cy.get("[data-cy=clia-waiver-form]").should("not.exist")
    }
  )

  specify(
    "CLIA Waiver banner should include CLIA Waiver Number if banner appears",
    () => {
      cy.get("body").then($body => {
        if ($body.find("[data-cy=clia-waiver-banner]").length) {
          cy.get("[data-cy=clia-waiver-banner]").contains(/[a-zA-Z0-9]{10}/)
        }
      })
    }
  )

  specify("Clicking HERE opens Modal at CLIA Waiver warning", () => {
    cy.get("[data-cy=popup-trigger]").eq(0).trigger("mouseover")
    cy.get(".popup-content").contains("Details").click()
    cy.get("[data-cy=detail-view]").should("be.visible")
    cy.get("[data-cy=detail-view]").then($detailView => {
      if ($detailView.find("[data-cy=clia-waiver-warning-link]").length) {
        cy.get("[data-cy=clia-waiver-warning-link]").click()
        cy.get("[data-cy=clia-waiver-form]").should("be.visible")
      }
    })
  })
})
