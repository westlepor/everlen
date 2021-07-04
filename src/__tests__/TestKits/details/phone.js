import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("Phone shows up as `-`", () => {
    const { phone } = useTestKitDetails(data)

    expect(phone).toBe("-")
  })
})

describe("When there are no completed_kit_registrations", () => {
  const data = {
    barcode: {
      completed_kit_registrations: [],
    },
  }

  it("Phone shows up as `-`", () => {
    const { phone } = useTestKitDetails(data)

    expect(phone).toBe("-")
  })
})

describe("When there is registered_user's phone_number value", () => {
  const data = {
    barcode: {
      completed_kit_registrations: [
        {
          spree_user: {
            phone_number: "521-344-1234",
          },
        },
      ],
    },
  }

  it("Phone shows up properly", () => {
    const { phone } = useTestKitDetails(data)

    expect(phone).toBe("521-344-1234")
  })
})
