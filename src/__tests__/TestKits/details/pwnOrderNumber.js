import { useTestKitDetails } from "../../../hooks"

describe("When there is no data", () => {
  const data = {}

  it("pwnOrderNumber shows up as `undefined`", () => {
    const { pwnOrderNumber } = useTestKitDetails(data)

    expect(pwnOrderNumber).toBe(undefined)
  })
})

describe("When there is pwn_order_number value", () => {
  const data = {
    pwn_order_number: "236436343",
  }

  it("PWN no. shows up properly", () => {
    const { pwnOrderNumber } = useTestKitDetails(data)

    expect(pwnOrderNumber).toBe("236436343")
  })
})
