/*
 * This test is meant to verify subtabs and actions on User subpage of user management page.
 */

var userName = ""
var userEmail = ""
var userGroup = ""
var userStatus = ""
var manageAccessCodes = ""
var viewRapidTests = ""
var registerKits = ""

describe("Can open Users page ", () => {
  before(function () {
    cy.login(this.testData.users.super_admin)
    while (cy.get('div[class*="kitStatus"]').length < 1) {
      cy.wait(1000)
    }
  })

  specify(" and see Users table subtabs loaded with Groups preselected", () => {
    cy.get("h5").contains("User Management").click()
    cy.get("a").contains("Users").click()
    cy.get("h3").contains("Users")
    cy.get("#search")
    cy.get("button").contains("Add User")
    cy.get("button").contains("Import Users from CSV")
    cy.get("div[class*='style__Pagination']")

    cy.get('tbody tr').contains("Active").parent().parent().find("td").eq(0).invoke('text').then((text) => {
      userName = text
    })
    cy.get('tbody tr').contains("Active").parent().parent().find("td").eq(1).invoke('text').then((text) => {
      userEmail = text
    })
    cy.get('tbody tr').contains("Active").parent().parent().find("td").eq(2).invoke('text').then((text) => {
      userGroup = text
    })
    cy.get('tbody tr').contains("Active").parent().parent().find("td").eq(3).invoke('text').then((text) => {
      userStatus = text
    })
  })

  specify(" and view Groups subpage data", () => {
    cy.get('tbody tr').contains("Active").parent().parent()
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
    cy.get('a[class*="style__Link"]')
      .contains("Groups")
    cy.get("a[aria-current='page']")
      .contains("Group")
    cy.get('a[class*="style__Link"]')
      .contains("Profile")
    cy.get('a[class*="style__Link"]')
      .contains("User Logs")
  })

  specify(" and view  Profile subpage data", () => {
    cy.get('a[class*="style__Link"]')
      .contains("Profile")
      .click()

    var names = userName.split(' ');

    var firstName = names[0];
    var lastName = names[1];

    cy.get("div[class*='style__Wrapper']").last()
      .should("contain", "First Name")
      .and("contain", "Last Name")
      .and("contain", "Email")
      .and("contain", "User can manage access codes")
      .and("contain", "User can view rapid tests")
      .and("contain", "User can register kits")
      .and("contain", firstName)
      .and("contain", lastName)
      .and("contain", userEmail)

    cy.get("div[class*='style__Value']").eq(3).invoke('text').then((text) => {
      manageAccessCodes = text
    })
    cy.get("div[class*='style__Value']").eq(4).invoke('text').then((text) => {
      viewRapidTests = text
    })
    cy.get("div[class*='style__Value']").eq(5).invoke('text').then((text) => {
      registerKits = text
    })
  })

  specify(" and can edit Profile data", () => {
    cy.get("button").contains("Edit Profile")
      .click()
    cy.get("input[name='firstName']")
    cy.get("input[name='lastName']")
    cy.get("input[name='email']")
    cy.get("input#canManageAccessCodes-Yes[type='radio']")
    cy.get("input#canManageAccessCodes-No[type='radio']")
    cy.log(manageAccessCodes)
    if (manageAccessCodes == "Yes")
      cy.get("input#canManageAccessCodes-Yes[type='radio']").should('have.attr', 'checked')
    else
      cy.get("input#canManageAccessCodes-No[type='radio']").should('have.attr', 'checked')

    cy.get("input#canViewRapidTests-Yes[type='radio']")
    cy.get("input#canViewRapidTests-No[type='radio']")
    if (viewRapidTests == "Yes")
      cy.get("input#canViewRapidTests-Yes[type='radio']").should('have.attr', 'checked')
    else
      cy.get("input#canViewRapidTests-No[type='radio']").should('have.attr', 'checked')

    cy.get("input#canRegisterKits-Yes[type='radio']")
    cy.get("input#canRegisterKits-No[type='radio']")
    if (registerKits == "Yes")
      cy.get("input#canRegisterKits-Yes[type='radio']").should('have.attr', 'checked')
    else
      cy.get("input#canRegisterKits-No[type='radio']").should('have.attr', 'checked')

    cy.get("button").contains("Save Profile")
    cy.get("button").contains("Cancel")
      .scrollIntoView()
      .click({ force: true })
  })

  specify(" and view User Logs subpage data", () => {
    cy.get('a[class*="style__Link"]')
      .contains("User Logs")
      .click()
    cy.get("th").contains("Time")
    cy.get("th").contains("Actor")
    cy.get("th").contains("Event Info")
    cy.get("th").contains("Target")
    expect(cy.get("div[class*='style__TableOuterWrapper'] tbody tr").length + 0);
  })

  specify(" and Reset Password user action present and behaves", () => {
    cy.get("button[class*='style__DropdownTrigger']")
      .click()
    cy.get("div.popup-content button")
      .contains("Reset Password")
      .click()

    cy.get("div[role='dialog']").within(($dialog) => {
      cy.get("h4").contains("Reset Password")
      cy.get("button[aria-label='Close']")
      cy.get("div[class*='style__Description']")
        .contains("Are you sure you want to reset Aaron Campos’ password?")
      cy.get("input[data-testid='reset-password-link-radio-button']").should('have.attr', 'checked')
      cy.get("input[data-testid='temporary-password-radio-button']")
      cy.get("button").contains("Send")
      cy.get("button").contains("Cancel")
        .click()
    })
  })

  //skipped since it is Super Admin only. Kept the code to use in future
  xspecify(" and Reset Multifactor user action present and behaves", () => {
    cy.get("button[class*='style__DropdownTrigger']")
      .click()
    cy.get("div.popup-content button")
      .contains("Reset Multifactor")
      .click()
    cy.get("div[role='dialog']").within(($dialog) => {
      cy.get("h4").contains("Reset Multifactor Authentication")
      cy.get("button[aria-label='Close']")
      cy.get("div[class*='style__Description']")
        .contains("Select authentication factor(s) to reset. This will wipe away the credentials for all configured factors and allow users to set up their factors again.")
      cy.get("input[type='checkbox'][label='Okta Verify']")
      cy.get("button").contains("Reset Factors")
      cy.get("button").contains("Cancel")
        .click()
    })
  })

  specify(" and Suspend User user action present and behaves", () => {
    cy.get("button[class*='style__DropdownTrigger']")
      .click()
    cy.get("div.popup-content button")
      .contains("Suspend User")
      .click()
    cy.get("div[role='dialog']").within(($dialog) => {
      cy.get("h4").contains("Suspend User")
      cy.get("button[aria-label='Close']")
      cy.get("div[class*='style__BodyText']")
        .contains("Are you sure you want to suspend the user Aaron Campos?")
      cy.get("button").contains("Suspend")
      cy.get("button").contains("Cancel")
        .click()
    })

  })

})
