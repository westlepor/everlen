import { useTestKitDetails } from "../../../hooks"

import { pretendToBeInUniversalTime } from "../../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

describe("When there is no data", () => {
  const data = {}

  it("isRegistered get set to FALSE", () => {
    const { isRegistered } = useTestKitDetails(data)

    expect(isRegistered).toBe(false)
  })

  it("registeredAt shows up as `-`", () => {
    const { registeredAt } = useTestKitDetails(data)

    expect(registeredAt).toBe("-")
  })
})

describe("When there is barcode_state_transitions with `to=registered`", () => {
  const data = {
    barcode: {
      barcode_state_transitions: [
        {
          to: "registered",
          created_at: "2020-08-27T22:34:05.452538",
        },
      ],
    },
  }

  it("isRegistered get set to TRUE", () => {
    const { isRegistered } = useTestKitDetails(data)

    expect(isRegistered).toBe(true)
  })

  it("registeredAt shows up properly", () => {
    const { registeredAt } = useTestKitDetails(data)

    expect(registeredAt).toBe("08/27/2020 @ 10:34 PM")
  })
})

describe("When there are multiple barcode_state_transitions with `to=registered`", () => {
  const data = {
    barcode: {
      barcode_state_transitions: [
        {
          to: "registered",
          created_at: "2020-08-27T22:34:05.452538",
        },
        {
          to: "registered",
          created_at: "2020-10-27T22:34:05.452538",
        },
      ],
    },
  }

  it("isRegistered get set to TRUE", () => {
    const { isRegistered } = useTestKitDetails(data)

    expect(isRegistered).toBe(true)
  })

  it("registeredAt shows up properly as the latest date", () => {
    const { registeredAt } = useTestKitDetails(data)

    expect(registeredAt).toBe("10/27/2020 @ 10:34 PM")
  })
})
