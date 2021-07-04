import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("Email shows up as `-`", () => {
    const { email } = useTestKitDetails(data)

    expect(email).toBe("-")
  })
})

describe("When there are no completed_kit_registrations", () => {
  const data = {
    barcode: {
      completed_kit_registrations: [],
    },
  }

  it("Email shows up as `-`", () => {
    const { email } = useTestKitDetails(data)

    expect(email).toBe("-")
  })
})

describe("When there is registered_user's email value", () => {
  const data = {
    barcode: {
      completed_kit_registrations: [
        {
          spree_user: {
            email: "smanzano@gmail.com",
          },
        },
      ],
    },
  }

  it("Email shows up properly", () => {
    const { email } = useTestKitDetails(data)

    expect(email).toBe("smanzano@gmail.com")
  })
})
