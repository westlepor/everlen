describe("My home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  /*
   * TODO: Add additional real tests
   */
  it("contains the text Log In", () => {
    expect(cy.contains("Log in"))
  })
})
