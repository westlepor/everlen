import faker from "faker"
import dayjs from "dayjs"

describe("Kit Registration", () => {
  function register(data_merge) {
    const data = {
      ...{
        barcode: null,
        third_party_id: null,
        email: null,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birthday: dayjs(
          faker.date.between(
            dayjs().subtract(21, "year"),
            dayjs().subtract(4, "year")
          )
        ).format("MM/DD/YYYY"),
        sex: faker.random.arrayElement(["male", "female"]),
        pregnancy: faker.random.arrayElement(["not_pregnant", "pregnant"]),
        race: faker.random.arrayElement([
          "American Indian or Alaska Native",
          "Asian",
          "Black or African American",
          "Native Hawaiian or Other Pacific Islander",
          "Two or More Races",
          "White",
          "Other",
          "Prefer Not To Answer",
        ]),
        ethnicity: faker.random.arrayElement([
          "Latino or Hispanic",
          "Not Latino or Hispanic",
          "Prefer Not To Answer",
        ]),
        invalid_barcode: false,
        invalid_birthday: false,
        invalid_third_party_id: false,
        group: null,
        product: null,
      },
      ...data_merge,
    }

    cy.get("[data-cy=register]").click({ force: true })

    cy.createBarcode({ group: data.group, product: data.product }).then(
      barcode => {
        cy.get("[data-testid=kitId-input]").type(barcode)
      }
    )

    cy.get("[data-cy=barcode-enter]").click()
    cy.wait(500)

    if (data.invalid_barcode) {
      cy.contains(
        "Kit ID cannot be registered. Please contact enterprisehelp@everlywell.com for support."
      ).should("be.visible")
      return
    }

    if (data.group.enterprise_client_id) {
      cy.get("[data-testid=client-input]").should("have.value", data.group.name)
    }

    if (data.group.registration_type == "thirdPartyId") {
      cy.get("[data-testid=thirdPartyMemberId-label]").should(
        "have.text",
        data.group.third_party_id_label
      )
      cy.get("[data-testid=thirdPartyMemberId-input]").type(data.third_party_id)
    } else if (data.group.registration_type == "email") {
      if (data.email == null) data.email = cy.makeUniqueEmail()
      cy.get("[data-testid=thirdPartyMemberId-input]").type(data.email)
    }

    cy.get("[data-testid=firstName-input]").type(data.first_name)
    cy.get("[data-testid=lastName-input]").type(data.last_name)

    cy.get("[data-testid=undefined-input]").type(data.birthday)

    cy.get(`[data-testid=${data.sex}-label]`).click({ force: true })
    if (data.sex == "female") {
      cy.get(`[data-testid=${data.pregnancy}-label]`).click({ force: true })
    }

    cy.get("[data-testid=race]").select(data.race)
    cy.get("[data-testid=ethnicity]").select(data.ethnicity)

    if (data.invalid_third_party_id) {
      cy.contains(
        "Please enter a valid " + data.group.third_party_id_label
      ).should("be.visible")
    }

    if (data.invalid_birthday) {
      cy.contains("Minimum age is 4 years old").should("be.visible")
    }

    if (data.invalid_birthday || data.invalid_third_party_id) {
      cy.get("[data-cy=kit-info-next]").should("be.disabled")
      return
    }

    cy.get("[data-cy=kit-info-next]").click()

    answerQuestionare()

    cy.get("[data-cy=kit-info-next]").click()

    cy.contains("Kit registered").should("be.visible")

    function answerQuestionare() {
      cy.get("[data-testid=no_symptoms-label]").click()
      cy.get('[data-testid="not exposed-label"]').click()
      cy.get("[data-testid=first_test-label]").click()
      cy.get("[data-testid=congregate-label]").click()
      cy.get("[data-testid=additional_vars-label]").click()
      cy.get("[data-testid=additional_vars-label]").click()
      cy.get("[data-cy=kit-info-next]").click()
    }
  }

  context("kit cannot be registered with invalid input", function () {
    it("with kit associated to different client as client admin", function () {
      cy.login(this.testData.users.client_admin_register_kits)

      register({
        group: this.testData.groups.state_of_washington_sequoia_heights,
        invalid_barcode: true,
      })
    })

    it("with kit associated to parent partner as client admin", function () {
      cy.login(this.testData.users.client_admin_register_kits)

      register({
        group: this.testData.groups.state_of_washington_cascade_school_district,
        invalid_birthday: true,
        birthday: "01/01/2020",
      })
    })

    it("with invalid third party id format", function () {
      cy.login(this.testData.users.partner_admin_register_kits)

      register({
        group: this.testData.groups
          .state_of_washington_kittitas_county_public_health_department,
        third_party_id: "wtf wtf wtf wtf wtf wtf wtf wtf",
        invalid_third_party_id: true,
      })
    })
  })

  context("kit can be registered with email", function () {
    it("as single client admin", function () {
      cy.login(this.testData.users.client_admin_register_kits)

      register({
        group: this.testData.groups.state_of_washington_cascade_school_district,
      })
    })

    it("as multiple client admin", function () {
      cy.login(this.testData.users.multiple_client_admin_register_kits)

      register({
        group: this.testData.groups.state_of_washington_cascade_school_district,
      })
    })

    it("as partner admin", function () {
      cy.login(this.testData.users.partner_admin_register_kits)

      register({
        group: this.testData.groups.state_of_washington_cascade_school_district,
      })
    })
  })

  context("with third party id", function () {
    context("as partner admin", function () {
      it("register covid pcr", function () {
        cy.login(this.testData.users.partner_admin_register_kits)

        register({
          group: this.testData.groups
            .state_of_washington_kittitas_county_public_health_department,
          third_party_id: "0123456789",
        })
      })

      it("register covid rapid", function () {
        cy.login(this.testData.users.partner_admin_register_kits)

        register({
          group: this.testData.groups
            .state_of_washington_kittitas_county_public_health_department,
          third_party_id: "0123456789",
          product: this.testData.products.covid_rapid,
        })
      })

      it("register covid pcr with unknown pregnancy status", function () {
        cy.login(this.testData.users.partner_admin_register_kits)

        register({
          group: this.testData.groups
            .state_of_washington_kittitas_county_public_health_department,
          third_party_id: "0123456789",
          sex: "female",
          pregnancy: "unknown_pregnant",
        })
      })
    })

    xcontext("as client admin", function () {
      //TODO
    })
    xcontext("as multiple client admin", function () {
      //TODO
    })
  })
})
