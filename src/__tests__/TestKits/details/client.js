import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("Client shows up as `undefined`", () => {
    const { client } = useTestKitDetails(data)

    expect(client).toBe(undefined)
  })
})

describe("When there is enterprise_client's name value", () => {
  const data = {
    barcode: {
      spree_order: {
        enterprise_client: {
          name: "Company A",
        },
      },
    },
  }

  it("Client name shows up properly", () => {
    const { client } = useTestKitDetails(data)

    expect(client).toBe("Company A")
  })
})
