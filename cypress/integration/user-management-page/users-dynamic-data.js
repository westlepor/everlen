/*
 * This test is meant to verify User subpage of user management page layout.
 */

var userName = ""
var userEmail = ""
var userGroup = ""
var userStatus = ""

describe("Can open Users page ", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify(" and see Users table layout and data loaded", () => {
    cy.get("h5").contains("User Management").click()
    cy.get("a").contains("Users").click()
    cy.get("h3").contains("Users")
    cy.get("#search")
    cy.get("button").contains("Add User")
    cy.get("button").contains("Import Users from CSV")
    cy.get("div[class*='style__Pagination']")
    cy.get("table[role='table']")
      .should("contain", "Person")
      .and("contain", "Email")
      .and("contain", "Group")
      .and("contain", "Status")
    while (cy.get("tbody tr[role='row']").length < 1) {
      cy.wait(1000)
    }
  })

  specify(" and get data of the first user", () => {
    cy.get('tbody tr').first().find("td").eq(0).invoke('text').then((text) => {
      cy.log(text)
      userName = text
    })
    cy.get('tbody tr').first().find("td").eq(1).invoke('text').then((text) => {
      cy.log(text)
      userEmail = text
    })
    cy.get('tbody tr').first().find("td").eq(2).invoke('text').then((text) => {
      cy.log(text)
      userGroup = text
    })
    cy.get('tbody tr').first().find("td").eq(3).invoke('text').then((text) => {
      cy.log(text)
      userStatus = text
    })
  })
  specify(" and search for the first user data", () => {
    //search by Name
    cy.get("#search").clear()
    cy.get("#search").type(userName)
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
      .contains(userName)

    //search by Email
    cy.get("#search").clear()
    cy.get("#search").type(userEmail)
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
      .contains(userEmail)

    //search by Status
    cy.get("#search").clear()
    cy.get("#search").type(userStatus)
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
      .contains(userStatus)

    cy.get("#search").scrollIntoView()

    cy.get("#search").clear()
    cy.get("#search").type(userName)
    cy.get("tbody[role='rowgroup']")
      .first()
      .find("tr")
      .should("have.length.of.at.least", 3)
    cy.get("#search").type("{downarrow}{downarrow}{uparrow}{enter}")

    cy.get("h3")
    cy.get("a").contains("< Back to Users").click()
  })

  specify(" and view selected Users data", () => {
    cy.get('div[class*="style__Table"] tbody tr')
      .first()
      .find("td")
      .first()
      .find("a")
      .click()
      .then(() => {
        cy.get("button").contains("User Actions")
        cy.get("h3")
          .contains(userName)
        cy.get("span")
          .contains("Email:")
          .next("span")
          .invoke("text")
          .then(text => {
            expect(text).equal(userEmail);
          })

        cy.get("span")
          .contains("Status:")
          .next("span")
          .invoke("text")
          .then(text => {
            expect(text).equal(userStatus);
          })

        cy.get("th").contains("Group Name")
        cy.get("th").contains("Partner Name")
        cy.get("th").contains("Client Name(s)")

        cy.get("tbody tr[role='row']").first()
          .find("td").eq(0).contains(userGroup)

      })
  })

  specify(" and layout of User page is correct", () => {
    cy.get('a[class*="style__Link"]')
      .contains("Groups")
    cy.get('a[class*="style__Link"]')
      .contains("Profile")
    cy.get('a[class*="style__Link"]')
      .contains("User Logs")

    cy.get("a").contains("< Back to Users").click()
  })

})
