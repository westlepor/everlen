import { DEFAULT_COLUMN_HEADERS } from "../../src/utils/cypress-constants"

// Client admin do not have a 'Client' column
Cypress.Commands.add("checkClientHeaders", () => {
  cy.get("[data-cy=kit-status-table]").should("be.visible")
  cy.get("[data-cy=table-header]").should("be.visible")
  cy.get("[data-cy=table-header-cell]").find("span").as("headerCells")
  // Should not include "Client", so just remove
  DEFAULT_COLUMN_HEADERS.shift()
  DEFAULT_COLUMN_HEADERS.forEach((checkHeader, index) => {
    cy.get("@headerCells").eq(index).invoke("text").should("eq", checkHeader)
  })
})

// Partner admin and mutliple client admin have a 'Client'
// column, so we check for that header cell
Cypress.Commands.add("checkHeaders", () => {
  cy.get("[data-cy=kit-status-table]").should("be.visible")
  cy.get("[data-cy=table-header]").should("be.visible")
  cy.get("[data-cy=table-header-cell]").as("headerCells")
  DEFAULT_COLUMN_HEADERS.forEach((checkHeader, index) => {
    cy.get("@headerCells").eq(index).invoke("text").should("eq", checkHeader)
  })
})

// Partner admin and mutliple client admin have a 'Client'
// column, so we check for that header cell
Cypress.Commands.add("checkSpecificHeaders", SPECIFIC_HEADERS => {
  cy.get("[data-cy=kit-status-table]").should("be.visible")
  cy.get("[data-cy=table-header]").should("be.visible")
  cy.get("[data-cy=table-header-cell]").as("headerCells")
  SPECIFIC_HEADERS.forEach((checkHeader, index) => {
    cy.get("@headerCells").eq(index).invoke("text").should("eq", checkHeader)
  })
})

// Check filtering for client admins
Cypress.Commands.add("checkClientFilters", () => {
  cy.get("[data-cy=kit-status-table]").should("be.visible")
  cy.get("[data-cy=table-header]").should("be.visible")
  cy.get("[data-cy=table-header-cell]").as("headerCells")

  // check filtering for kit status
  cy.get("@headerCells")
    .eq(1)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(1)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })

  // check filtering for test name column
  cy.get("@headerCells")
    .eq(6)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(6)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })

  // check filtering for result column
  cy.get("@headerCells")
    .eq(7)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(7)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })
})

Cypress.Commands.add("filterByKitStatus", () => {
  cy.get("div#KitStatus").click()
  cy.get("#filter-popup").find("input[type=checkbox]").eq(0).click()
  cy.get("#filter-popup").find("button").contains("Apply").click()
})

// Check filters for partner and multiple client admin
Cypress.Commands.add("checkFilters", () => {
  cy.get("[data-cy=kit-status-table]").should("be.visible")
  cy.get("[data-cy=table-header]").should("be.visible")
  cy.get("[data-cy=table-header-cell]").as("headerCells")

  // check filtering for client
  cy.get("@headerCells")
    .eq(0)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(0)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })

  // check filtering for kit status
  cy.get("@headerCells")
    .eq(2)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(2)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })

  // check filtering for test name
  cy.get("@headerCells")
    .eq(7)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(7)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })

  // check filtering for results
  cy.get("@headerCells")
    .eq(8)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click()
  cy.get("div[data-cy=popup-content]").should("be.visible")
  cy.get("div[data-cy=popup-content]")
    .find("input[type=checkbox]")
    .its("length")
    .should("be.gt", 0)
  cy.get("@headerCells")
    .eq(8)
    .find("div[data-cy=inlinefilter-popup-trigger]")
    .click({ force: true })
})

Cypress.Commands.add("checkMasqueradeBanner", user => {
  //Check basic features (partner, client, & multiple client share)
  cy.get("div[data-cy=super-admin-banner]").find('button:contains("Cancel")')
  cy.get("div[data-cy=super-admin-banner]").should(
    "contain",
    `Role: ${user["role"]}`
  )
  cy.get("div[data-cy=super-admin-banner]").should(
    "contain",
    `Can Manage Access Codes: ${user["access_codes"]}`
  )
  cy.get("div[data-cy=super-admin-banner]").should(
    "contain",
    `Partner ID: ${user["partner_id"]}`
  )
  cy.get("div[data-cy=super-admin-banner]").should(
    "contain",
    `Partner Name: ${user["partner_name"]}`
  )

  // check specific features for client and mutliple client admin now
  if (user["role"].localeCompare("enterprise client clinical admin") == 0) {
    if ("client_name" in user) {
      // TODO: fix failure
      // cy.get("div[data-cy=super-admin-banner]").should(
      //   "contain",
      //   `Client Name: ${user["client_name"]}`
      // )
      cy.get("div[data-cy=super-admin-banner]").should(
        "contain",
        `Client ID: ${user["client_id"]}`
      )
    } else {
      // TODO: fix failure
      // cy.get("div[data-cy=super-admin-banner]").should(
      //   "contain",
      //   `Client Names: ${user["client_names"]}`
      // )
      cy.get("div[data-cy=super-admin-banner]").should(
        "contain",
        `Client IDs: ${user["client_ids"]}`
      )
    }
  }
})

Cypress.Commands.add("createBarcode", function (data_merge = {}) {
  data_merge = cy.removeNullValuesInObject(data_merge)
  const data = {
    ...{
      product: this.testData.products.covid_assurance,
      group: null,
    },
    ...data_merge,
  }

  return cy
    .request({
      method: "POST",
      url: Cypress.env("CREATE_BARCODE_URL"),
      body: {
        provider_name: data.product.provider_name,
        product_id: data.product.product_id,
        enterprise_client_id: data.group?.enterprise_client_id,
        enterprise_partner_id: data.group?.enterprise_partner_id,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      auth: {
        username: Cypress.env("CREATE_BARCODE_USERNAME"),
        password: Cypress.env("CREATE_BARCODE_PASSWORD"),
      },
    })
    .then(res => {
      return res.body.serial_number
    })
})

Cypress.Commands.add("logoutViaApi", function () {
  cy.request({
    method: "DELETE",
    failOnStatusCode: false,
  })
})

Cypress.Commands.add("login", function (user) {
  cy.request({
    method: "DELETE",
    failOnStatusCode: false,
  })

  cy.visit("")

  cy.wait(1500)

  cy.get("form", { timeout: 10000 }).within(() => {
    cy.get("input[id=okta-signin-username]").type(user.username)
    cy.get("input[id=okta-signin-password]").type(user.password)
    cy.root().submit()
  })
})

Cypress.Commands.add("checkTable", function () {
  cy.wait(10000)
  cy.get("[data-cy=kit-status-table]", { timeout: 80000 }).should("be.visible")
})
