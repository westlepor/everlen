/*
 * This test is meant to check a super admin logging in and then
 * masquerading with a multiple client admin access codes
 */

describe("logging in as super admin and masquerade with multiple client admin access codes", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
  })

  specify(
    "it can masquerade multiple client admin with access codes",
    function () {
      cy.get("div[data-cy=super-admin-banner]")
        .find("input")
        .type(this.testData.users.multiple_client_admin_access_codes.username)
      cy.get("div[data-cy=super-admin-banner]")
        .find('button:contains("View as User")')
        .click()
      cy.get("div[data-cy=super-admin-banner]").find(
        'button:contains("Cancel")'
      )
      cy.get("div[data-cy=super-admin-banner]").should(
        "contain",
        "Role: enterprise client clinical admin"
      )
      cy.get("div[data-cy=super-admin-banner]").should(
        "contain",
        "Client IDs: 148, 188"
      )
      cy.get("div[data-cy=super-admin-banner]").should(
        "contain",
        "Can Manage Access Codes: Yes"
      )
    }
  )

  specify("select table headers are visible", () => {
    cy.checkTable()
    cy.checkHeaders()
  })

  specify("select table headers can filters", () => {
    cy.checkFilters()
  })

  specify("notifications are visible", () => {
    cy.get(".raf-icon-badge").eq(0).should("exist")
    cy.get(".raf-icon-badge").eq(0).click()
    cy.get(".raf-dropdown-panel__content").should("exist")
    cy.get(".raf-dropdown-panel__content")
      .children()
      .its("length")
      .should("be.gt", 0)
    cy.get(".raf-icon-badge").eq(0).click()
  })

  specify("administration tab is accessible", () => {
    cy.get("header").should("contain", "Administration")
    cy.get("header").contains("Administration").click()
    cy.get("h3:contains(Access Codes)").should("be.visible")
    cy.get("button:contains(Create Access Code)").should("be.visible")
    cy.get("tbody").children().its("length").should("be.gt", 0)
  })

  specify("the edit access code page is visible", () => {
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

    // check that the Save button is disabled
    cy.get("button[type=submit]").should("be.disabled")
  })

  specify("the save access code button is never enabled by inputing", () => {
    // input name
    cy.get("#name").clear()
    cy.get("button[type=submit]").should("be.disabled")
    cy.get("#name").type("name")
    cy.get("button[type=submit]").should("be.disabled")
  })

  specify("the create access code page is visible", () => {
    cy.get("[data-cy=admin]").click()
    cy.get("button[data-cy=create-access-code").click()
    cy.get("h3").should("have.text", "Create Access Code")
  })

  specify("the create access code page has the proper default states", () => {
    // confirm that the Start Date is Today
    cy.get("#date-picker-startDate").should(
      "have.value",
      cy.accessCode.getToday()
    )

    // confirm that the End Date is empty
    cy.get("#date-picker-endDate").should("be.empty")

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

  specify("the create access code button is never enabled by inputing", () => {
    // input name
    cy.get("#name").type("name")
    cy.get("[data-cy=create-access-code]").should("be.disabled")

    // input access code
    cy.get("#code").type("123")
    cy.get("[data-cy=create-access-code]").should("be.disabled")

    // test that the Delivery Options are unchecked
    cy.get("[data-cy=delivery-option]")
      .find("input")
      .uncheck({ multiple: true })
    cy.get("[data-cy=create-access-code]").should("be.disabled")
  })

  specify("profile has correct name and company", function () {
    cy.get("[data-cy=navbar-profile]").should("be.visible")
    cy.get("[data-cy=navbar-profile]").click()
    cy.get("[data-cy=navbar-profile-dropdown]").should("be.visible")
    cy.get("[data-cy=navbar-profile-dropdown]").contains("Setting").click()
    cy.get("div[data-cy=user-profile]").should("contain", "Name")
    cy.get("div[data-cy=user-profile]").should(
      "contain",
      this.testData.users.super_admin.name
    )
    cy.get("div[data-cy=user-profile]").should("contain", "Company")
    this.testData.users.super_admin.companies.forEach(company => {
      cy.get("div[data-cy=user-profile]").should("contain", company)
    })
  })
})
