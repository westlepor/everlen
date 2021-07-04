import { useTestKitDetails } from "../../../hooks"

import { pretendToBeInUniversalTime } from "../../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

describe("When there is no data", () => {
  const data = {}

  it("isOrdered get set to FALSE", () => {
    const { isOrdered } = useTestKitDetails(data)

    expect(isOrdered).toBe(false)
  })

  it("orderedAt shows up as `-`", () => {
    const { orderedAt } = useTestKitDetails(data)

    expect(orderedAt).toBe("-")
  })
})

describe("When there is spree_order's completed_at value", () => {
  const data = {
    barcode: {
      spree_order: {
        completed_at: "2020-08-27T22:34:05.452538",
      },
    },
  }

  it("isOrdered get set to TRUE", () => {
    const { isOrdered } = useTestKitDetails(data)

    expect(isOrdered).toBe(true)
  })

  it("orderedAt shows up properly", () => {
    const { orderedAt } = useTestKitDetails(data)

    expect(orderedAt).toBe("08/27/2020 @ 10:34 PM")
  })
})
