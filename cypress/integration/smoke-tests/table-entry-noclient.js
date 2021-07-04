/*
  Confirms that the specified table entry (by default is 1st row)
  is displaying data in the correct format.
*/

describe("Confirm first entry in table is valid for user without clients", () => {
  before(function () {
    cy.login(this.testData.users.client_admin)
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

    cy.checkClientHeaders()
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
      .should("have.length", 8)
  })

  context("Confirm first entry in table is formatted correctly", () => {
    beforeEach(() => {
      cy.get("[data-cy=table-row]").eq(0).find("[data-cy=table-cell]").as("row")
    })

    specify("the kit ID is formatted correctly", () => {
      expect(cy.get("@row").eq(0)).include(
        /^[A-Z]{6}[0-9]{3}|^[A-Z]{3}-[A-Z]{3}-[0-9]{4}|^[A-Z]{3}-[A-Z]{4}-[0-9]{4}/
      )
    })

    specify("the kit status is formatted correctly", () => {
      cy.get("@row")
        .eq(1)
        .then($el => {
          expect($el.text()).to.be.oneOf([
            "Results Released",
            "Registered",
            "Received by Lab",
            "Canceled",
          ])
        })
    })

    specify("the participant name is formatted correctly", () => {
      expect(cy.get("@row").eq(2)).include(/\S\w*\s\S\w*/) // patient index is 3
    })

    specify("the registered date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(3)).include(
        /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM)/
      )
    })

    specify("the received by lab date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(4)).include(
        /((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM))|-/
      )
    })

    specify("the results released date and time is formatted correctly", () => {
      expect(cy.get("@row").eq(5)).include(
        /((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM))|-/
      )
    })

    specify("the test name is formatted correctly", () => {
      cy.get("@row")
        .eq(6)
        .then($el => {
          expect($el.text()).to.be.oneOf([
            "Cellex SARS-CoV-2 Antigen Rapid Test",
            "Syphilis Test",
            "Chlamydia and Gonorrhea Test",
            "COVID-19 Test Home Collection Kit",
            "Cellex SARS-CoV-2 Antigen Rapid Test",
          ])
        })
    })

    specify("the result is formatted correctly", () => {
      cy.get("@row")
        .eq(7)
        .then($el => {
          expect($el.text()).to.be.oneOf(["Normal", "Needs Review", "-"])
        })
    })
  })
})
