/*
    Test confirms that user can search for kit (1st entry)
    and it contains the proper infomration formatted
    correctly.
*/

const KIT_ENTRY = 0
import Field from "../../../src/utils/fields"

describe("Confirm search input works correctly", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin)
  })

  specify("the table is visible", () => {
    cy.get("[data-cy=kit-status-table]").should("be.visible")
  })

  specify("the first entry in the table is visible", () => {
    cy.get("body").then($body => {
      if ($body.text().includes("No Results Found")) {
        cy.reload()
      }
    })

    cy.get("[data-cy=table-row]").eq(KIT_ENTRY).should("be.visible")
    cy.wait(4000)
    cy.get("[data-cy=table-row]")
      .eq(KIT_ENTRY)
      .find("[data-cy=table-cell]")
      .should("have.length", 9) // Table's col count
  })

  specify("the search bar is visible", () => {
    cy.get("input[type=text]").should("be.visible")
  })

  specify("the search allows input", () => {
    cy.get("[data-cy=table-row]")
      .eq(KIT_ENTRY)
      .find("[data-cy=table-cell]")
      .eq(Field.id.index)
      .then($el => {
        cy.get("input[type=text]")
          .type($el.text())
          .should("have.value", $el.text())
      })
  })

  context("Check search results dropdown", () => {
    beforeEach(() => {
      cy.get("[data-cy=table-row]")
        .eq(KIT_ENTRY)
        .find("[data-cy=table-cell]")
        .as("row")
    })

    specify("the search results kit ID is correct", () => {
      cy.get("@row")
        .eq(Field.id.index)
        .then($el => {
          cy.get("[data-cy=search-results-dropdown]").should(
            "contain",
            $el.text()
          )
        })
    })

    specify("the search results kit status is correct", () => {
      cy.get("@row")
        .eq(Field.status.index)
        .then($el => {
          cy.get("[data-cy=search-results-dropdown]").should(
            "contain",
            $el.text()
          )
        })
    })

    specify("the search results patient name is correct", () => {
      cy.get("@row")
        .eq(Field.name.index)
        .then($el => {
          cy.get("[data-cy=search-results-dropdown]").should(
            "contain",
            $el.text()
          )
        })
    })
  })

  context("Check user details from search results", () => {
    before(() => {
      cy.get("[data-cy=search-results-dropdown]").click()
    })

    beforeEach(() => {
      cy.get("[data-cy=table-row]")
        .eq(KIT_ENTRY)
        .find("[data-cy=table-cell]")
        .as("row")
    })

    specify("the kit ID in details is correct", () => {
      cy.get("[data-cy=detail-view]").should("contain", "KIT ID")
      cy.get("@row")
        .eq(Field.id.index)
        .then($el => {
          cy.get("[data-cy=detail-view]").should("contain", $el.text())
        })
    })

    specify("the patient name in details is correct", () => {
      cy.get("[data-cy=detail-view]").should("contain", "Name")
      cy.get("[data-cy=detail-view]").should("contain", "Participant")
      cy.get("@row")
        .eq(Field.name.index)
        .then($el => {
          cy.get("[data-cy=detail-view]").should("contain", $el.text())
        })
    })

    specify("the registered date and time in details is correct", () => {
      cy.get("[data-cy=detail-view]").should("contain", "Registered")
      cy.get("[data-cy=detail-view]").should("contain", "Tracking Details")
      cy.get("@row")
        .eq(Field.registerTime.index)
        .then($el => {
          let dateTime = $el.text().split(" ")
          cy.get("[data-cy=detail-view]").should("contain", dateTime[0])
          cy.get("[data-cy=detail-view]").should("contain", dateTime[1])
        })
    })

    specify("the received by lab date and time in details is correct", () => {
      cy.get("@row")
        .eq(Field.receiveTime.index)
        .then($el => {
          if ($el.text().localeCompare("-") !== 0) {
            cy.get("[data-cy=detail-view]").should("contain", "Received by Lab")
            let dateTime = $el.text().split(" ")
            cy.get("[data-cy=detail-view]").should("contain", dateTime[0])
            cy.get("[data-cy=detail-view]").should("contain", dateTime[1])
          }
        })
    })

    specify("the results released date and time in details is correct", () => {
      cy.get("@row")
        .eq(Field.approveTime.index)
        .then($el => {
          if ($el.text().localeCompare("-") !== 0) {
            cy.get("[data-cy=detail-view]").should(
              "contain",
              "Results Released"
            )
            let dateTime = $el.text().split(" ")
            cy.get("[data-cy=detail-view]").should("contain", dateTime[0])
            cy.get("[data-cy=detail-view]").should("contain", dateTime[1])
          }
        })
    })

    specify("the test name in details is correct", () => {
      cy.get("@row")
        .eq(7)
        .then($el => {
          cy.get("[data-cy=detail-view]").should("contain", "Test Name")
          cy.get("[data-cy=detail-view]").should("contain", $el.text())
        })
    })

    specify("the results in details is correct", () => {
      cy.get("@row")
        .eq(8)
        .then($el => {
          if ($el.text().localeCompare("") !== 0) {
            cy.get("[data-cy=detail-view]").should("contain", "Results")
            cy.get("[data-cy=detail-view]").should("contain", $el.text())
          }
        })
    })
  })
})
