import { ACCESS_CODE_COLUMN_HEADERS } from "../../src/utils/cypress-constants"

Cypress.Commands.add("checkAccessCodeHeaders", () => {
  cy.get("thead").should("be.visible")
  ACCESS_CODE_COLUMN_HEADERS.forEach((checkHeader, index) => {
    cy.get("th").eq(index).contains(checkHeader, { matchCase: false })
  })
})

Cypress.Commands.add("checkAccessCodeHeadersInClientAdmin", () => {
  cy.get("thead").should("be.visible")
  ACCESS_CODE_COLUMN_HEADERS.shift()
  ACCESS_CODE_COLUMN_HEADERS.forEach((checkHeader, index) => {
    cy.get("th").eq(index).contains(checkHeader, { matchCase: false })
  })
})
