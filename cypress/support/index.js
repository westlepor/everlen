import "gatsby-cypress"
import "./commands"
import "./access-code-commands"
import "./functions"

before(function () {
  cy.fixture('data').as('testData');
});