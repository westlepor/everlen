/*
 * This test is meant to verify Super admin can/cannot see Active CLIA Waiver when masquerading.
 */

const USER_WITH_CLIA = "eli+hcp_with_active_clia_waiver@dhamira.com"
const USER_WITHOUT_CLIA = "eli+hcp_without_active_clia_waiver@dhamira.com"

describe("Verify Super Admin when masquerading sees", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    cy.get("div[data-cy=super-admin-banner]").should("be.visible")
  })

  specify(" details about Active CLIA Waiver of User with it", function () {
    {
      cy.get("div[data-cy=super-admin-banner]", { timeout: 5000, waitForAnimations: true })
        .find("input")
        .type(USER_WITH_CLIA)
      cy.get("div[data-cy=super-admin-banner]")
        .find('button:contains("View as User")')
        .click()

      cy.get("button[data-cy='change-clia-waiver']")
        .should("contain", "Change CLIA Waiver")
        .and("be.visible")

      cy.get("[data-cy='clia-waiver-banner']")
        .should("contain", "Current CLIA Waiver #:")
        .and("contain", "7777777777")
        .and("be.visible")

      while (cy.get('div[class*="kitStatus"]').length < 1) {
        cy.wait(1000)
      }
      cy.get("div#KitStatus")
        .click()

      cy.get(".popup-content")
        .contains("Sample Collected")
        .find("input[type=checkbox]")
        .click()
      cy.get(".popup-content")
        .find("button")
        .contains("Apply")
        .click({ force: true })

      cy.get("div[class*='tableRow__MenuWrapper'] [data-cy=popup-trigger]").eq(0).trigger("mouseover")
      cy.get(".popup-content").contains("Details").click()

      cy.get("div[class*='style__Wrapper'] div[class*='style__Content']")
        .should("not.exist")

      cy.get("button[class*='AddResultsButton__Button']")
        .should("contain", "Add Results")
        .should("be.enabled")
      cy.get("[data-cy=close-detail]").click({ force: true })

    }

    cy.get("div[data-cy=super-admin-banner]")
      .find('button:contains("Cancel")')
      .click()

    {
      cy.get("div[data-cy=super-admin-banner]")
        .find("input")
        .type(USER_WITHOUT_CLIA)
      cy.get("div[data-cy=super-admin-banner]")
        .find('button:contains("View as User")')
        .click()
      cy.get("button[data-cy='change-clia-waiver']")
        .should("be.visible")
        .and("contain", "Enter CLIA Waiver")

      cy.get("[data-cy='clia-waiver-banner']")
        .should("not.exist")

      while (cy.get('div[class*="kitStatus"]').length < 1) {
        cy.wait(1000)
      }

      cy.get("div[class*='tableRow__MenuWrapper'] [data-cy=popup-trigger]").eq(0).trigger("mouseover")
      cy.get(".popup-content").contains("Details").click()

      cy.get("div[class*='style__Wrapper'] div[class*='style__Content']")
        .should("be.visible")

      cy.get("button[class*='AddResultsButton__Button']")
        .should("contain", "Add Results")
        .should("have.attr", "disabled")
      cy.get("[data-cy=close-detail]").click({ force: true })

      cy.get("div[data-cy=super-admin-banner]").find('button:contains("Cancel")')
        .click()

    }
  })



})
