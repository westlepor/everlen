import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("Test Name shows up as `undefined`", () => {
    const { testName } = useTestKitDetails(data)

    expect(testName).toBe(undefined)
  })
})

describe("When there is test's display_name value", () => {
  const data = {
    test: {
      display_name: "COVID-19 Test Home Collection Kit",
    },
  }

  it("Test Name shows up properly", () => {
    const { testName } = useTestKitDetails(data)

    expect(testName).toBe("COVID-19 Test Home Collection Kit")
  })
})
