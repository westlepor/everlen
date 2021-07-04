/*
 * This test is meant to verify user management page layout.
 */

var groupName = ""
var groupPartnerName = ""
var groupRole = ""
var groupClientNames = []
var groupUsers = ""
var index = -1

describe("Can open Groups page ", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify(" and see Groups table layout and data loaded", () => {
    cy.get("h5").contains("User Management").click()
    cy.get("a").contains("Groups").click()
    cy.get("h3").contains("Groups")
    cy.get("#search")
    cy.get("button").contains("Add Group")
    cy.get("div[class*='style__Pagination']")
    cy.get("table[role='table']")
      .should("contain", "Group Name")
      .and("contain", "Partner Name")
      .and("contain", "Users")
    while (cy.get("tbody tr[role='row']").length < 1) {
      cy.wait(1000)
    }
  })

  specify("and find index of a Group with all data available", () => {
    // TODO: make sure to exit form loop when first index is found
    cy.get('div[class*="style__Table"] tbody tr').each(($row, $index) => {
      cy.wrap($row)
        .invoke("text")
        .then(text => {
          if (
            text.search("-–0") <= 0 &&
            text.search("–0") <= 0 &&
            text.search(" - ") <= 0
          ) {
            index = $index
          }
        })
    })
  })

  specify(" and view selected Group data", () => {
    cy.log("Index is: " + index)
    cy.get('div[class*="style__Table"] tbody tr')
      .eq(index)
      .find("td")
      .eq(1)
      .invoke("text")
      .then(text => {
        groupPartnerName = text
        cy.log("Partmers " + groupPartnerName)
      })
    cy.get("tbody tr")
      .eq(index)
      .find("td")
      .eq(2)
      .find("[data-cy=badge]")
      .each($el => {
        cy.wrap($el)
          .invoke("text")
          .then(text => {
            groupClientNames = [...groupClientNames, text]
          })
      })

    cy.log("Clients " + groupClientNames)

    cy.get("tbody tr")
      .eq(index)
      .find("td")
      .eq(3)
      .invoke("text")
      .then(text => {
        groupUsers = text
        cy.log("Users " + groupUsers)
      })

    cy.get("tbody tr")
      .eq(index)
      .find("td")
      .eq(0)
      .invoke("text")
      .then(text => {
        groupName = text
        cy.log("Name " + groupName)
      })
    cy.get('div[class*="style__Table"] tbody tr')
      .eq(index)
      .find("td")
      .eq(0)
      .find("a")
      .click()
      .then(() => {
        cy.wait(3000)
        cy.get("button").contains("Edit Group")
        cy.get("span")
          .contains("Role:")
          .next("span")
          .invoke("text")
          .then(text => {
            text.length > 0
          })

        cy.get("div[class*='style__Details']").should("have.length", 3)
        cy.get("div[class*='style__Details']").contains("Partner Name:")
        cy.get("div[class*='style__Details']").contains(groupPartnerName)
        cy.get("div[class*='style__Details']").contains("Client Names:")
        cy.get("div[class*='style__Details']").contains(
          groupClientNames.join(", ")
        )

        cy.get("th").contains("Person")
        cy.get("th").contains("Email")
        cy.get("th").contains("Status")

        // TODO: make this dynamic
        // cy.get("a[href='/app/user-management/users/1']")
        // cy.get("td").contains("@email.com")
        // cy.get("td").contains("Active")
        // cy.get("td").contains("Suspended")
        // cy.get("td").contains("Pending")

        // cy.get("div[class*='style__Pagination']")
        cy.get("a").contains("< Back to Groups").click()
      })
  })

  specify(" and search for groups", () => {
    cy.get("#search").clear()
    cy.get("#search").type(groupName)
    cy.wait(500)
    cy.get("tbody[role='rowgroup']", { timeout: 5000 })
      .first()
      .find("tr")
      .should("have.length.of.at.least", 1)
      .find("td")
      .should("have.length.of.at.least", 3)
    cy.get("tbody[role='rowgroup']", { timeout: 5000 })
      .first()
      .find("td")
      .contains(groupClientNames[0])

    cy.get("#search").scrollIntoView()

    cy.get("#search").clear()
    cy.get("#search").type("Un")
    cy.get("tbody[role='rowgroup']")
      .first()
      .find("tr")
      .should("have.length.of.at.least", 2)
    cy.get("#search").type("{downarrow}{downarrow}{uparrow}{enter}")

    cy.get("h3")
    cy.get("a").contains("< Back to Groups").click()
  })
})
