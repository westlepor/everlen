/*
 * This tests login in as a partner admin
 * and checks the access code pages.
 */

describe("logging in as partner admin and check", () => {
  before(function () {
    cy.login(this.testData.users.partner_admin_access_codes)
  })

  specify("make sure that the Administration menu exists", () => {
    cy.get("[data-cy=admin]").should("be.visible")
  })

  specify("the access code table is visible", () => {
    cy.get("[data-cy=admin]").click()
    cy.get("[data-cy=access-code-table]").should("be.visible")
  })

  specify("the table has the proper headers", () => {
    cy.checkAccessCodeHeaders()
  })

  specify("the first entry in the table is visible", () => {
    cy.get("tbody").find("tr").eq(0).should("be.visible")
    cy.get("tbody").find("tr").eq(0).find("td").should("have.length", 11)
  })

  specify("the column 'Name' is sortable", () => {
    // sort by Name column
    cy.get("thead").find("th").eq(1).find("[data-cy=header-cell]").click()
    cy.get("tbody").find("tr").eq(0).as("row0")
    cy.get("tbody").find("tr").eq(1).as("row1")

    // check if Name columns are sorted
    cy.get("@row0")
      .find("td")
      .eq(1)
      .invoke("text")
      .then($text1 => {
        cy.get("@row1")
          .find("td")
          .eq(1)
          .invoke("text")
          .then($text2 => {
            const strings = [$text1, $text2]
            cy.wrap(strings).should(
              "equal",
              strings.sort(function (a, b) {
                return b - a
              })
            )
          })
      })
  })

  specify("the column 'Access Code' is sortable", () => {
    // sort by Access Code column
    cy.get("thead").find("th").eq(2).find("[data-cy=header-cell]").click()
    cy.get("tbody").find("tr").eq(0).as("row0")
    cy.get("tbody").find("tr").eq(1).as("row1")

    // check if Access Code columns are sorted
    cy.get("@row0")
      .find("td")
      .eq(2)
      .invoke("text")
      .then($text1 => {
        cy.get("@row1")
          .find("td")
          .eq(2)
          .invoke("text")
          .then($text2 => {
            const strings = [$text1, $text2]
            cy.wrap(strings).should(
              "equal",
              strings.sort(function (a, b) {
                return b - a
              })
            )
          })
      })
  })

  context("Confirm first entry in table is formatted correctly", () => {
    beforeEach(() => {
      cy.get("tbody").find("tr").eq(0).as("row")
    })

    specify("the client name is formatted correctly", () => {
      expect(cy.get("@row").find("td").eq(0)).include(/\S\w*\s\S\w*/)
    })

    specify("the name is formatted correctly", () => {
      expect(cy.get("@row").find("td").eq(1)).include(/\S\w*\s\S\w*/)
    })

    specify("the Access Code is formatted correctly", () => {
      expect(cy.get("@row").find("td").eq(2)).include(
        /^[A-Z0-9]{4}-[A-Z0-9]{6}/
      )
    })

    specify("the status is formatted correctly", () => {
      cy.get("@row")
        .find("td")
        .eq(3)
        .contains(/Active|Expired|Not active/g)
    })

    specify("the start date and time is formatted correctly", () => {
      expect(cy.get("@row").find("td").eq(4)).include(
        /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM)/
      )
    })

    specify("the end date and time is formatted correctly", () => {
      expect(cy.get("@row").find("td").eq(5)).include(
        /((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d\s\d{1,2}:\d{2} (AM|PM))|-/
      )
    })
  })
})
