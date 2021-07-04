/*
  Confirms that the specified table entry (by default is 1st row)
  is displaying data in the correct format.
*/

import Field from "../../../src/utils/fields"

describe("Confirm first entry in table is valid for user with clients", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin)
  })

  specify("the table is visible", () => {
    cy.get("[data-cy=kit-status-table]").should("be.visible")
  })

  specify("the table has proper header", () => {
    cy.get("body").then($body => {
      if ($body.text().includes("No Results Found")) {
        cy.reload()
      }
    })

    cy.checkHeaders()
  })

  specify("the first entry in the table is visible", () => {
    cy.get("body").then($body => {
      if ($body.text().includes("No Results Found")) {
        cy.reload()
      }
    })

    cy.get("[data-cy=table-row]").first().should("be.visible")
    cy.get("[data-cy=table-row]")
      .first()
      .find("[data-cy=table-cell]")
      .should("have.length", 9)
  })

  context("Confirm first entry in table is formatted correctly", () => {
    beforeEach(() => {
      cy.get("[data-cy=table-row]").eq(0).find("[data-cy=table-cell]").as("row")
    })

    specify("the client name is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.client.index)).include(/\S\w*\s\S\w*/)
    })

    specify("the kit ID is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.id.index)).include(
        /^[A-Z]{6}[0-9]{3}|^[A-Z]{3}-[A-Z]{3}-[0-9]{4}|^[A-Z]{3}-[A-Z]{4}-[0-9]{4}/
      )
    })

    specify("the kit status is formatted correctly", () => {
      cy.get("@row")
        .eq(Field.status.index)
        .then($el => {
          expect($el.text()).to.be.oneOf([
            "Results Released",
            "Registered",
            "Received by Lab",
            "Canceled",
          ])
        })
    })

    specify("the patient name is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.name.index)).include(/\S\w*\s\S\w*/) // patient index is 3
    })

    specify("the registered date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.registerTime.index)).include(
        /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM)/
      )
    })

    specify("the arrival at lab date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.receiveTime.index)).include(
        /((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM))|-/
      )
    })

    specify("the sample issue date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.issue.index)).include(
        /((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM))|-/
      )
    })

    specify("the results released date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(Field.approveTime.index)).include(
        /((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM))|-/
      )
    })

    specify("the test name is formatted correctly", () => {
      cy.get("@row")
        .eq(7)
        .then($el => {
          expect($el.text()).to.be.oneOf([
            "COVID-19 Test (DTC)",
            "COVID-19 Test Home Collection Kit",
            "Cellex SARS-CoV-2 Antigen Rapid Test",
          ])
        })
    })

    specify("the result is formatted correctly", () => {
      cy.get("@row")
        .eq(8)
        .then($el => {
          expect($el.text()).to.be.oneOf(["Normal", "Needs Review", "-"])
        })
    })
  })
})
