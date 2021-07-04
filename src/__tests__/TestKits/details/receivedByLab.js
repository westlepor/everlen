import { useTestKitDetails } from "../../../hooks"

import { pretendToBeInUniversalTime } from "../../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

describe("When there is no data", () => {
  const data = {}

  it("isReceivedByLab get set to FALSE", () => {
    const { isReceivedByLab } = useTestKitDetails(data)

    expect(isReceivedByLab).toBe(false)
  })

  it("receivedByLabAt shows up as `-`", () => {
    const { receivedByLabAt } = useTestKitDetails(data)

    expect(receivedByLabAt).toBe("-")
  })
})

describe("When there is only delivered_to_lab_notifications_sent_at value set", () => {
  const data = {
    barcode: {
      delivered_to_lab_notifications_sent_at: "2020-09-27T22:34:05.452538",
    },
  }

  it("isReceivedByLab get set to TRUE", () => {
    const { isReceivedByLab } = useTestKitDetails(data)

    expect(isReceivedByLab).toBe(true)
  })

  it("receivedByLabAt shows up proper delivered_to_lab_notifications_sent_at's value", () => {
    const { receivedByLabAt } = useTestKitDetails(data)

    expect(receivedByLabAt).toBe("09/27/2020 @ 10:34 PM")
  })
})

describe("When there is no delivered_to_lab_notifications_sent_at BUT there is barcode_state_transition with `to=processed`", () => {
  const data = {
    barcode: {
      barcode_state_transitions: [
        {
          to: "processed",
          created_at: "2020-08-27T22:34:05.452538",
        },
      ],
    },
  }

  it("isReceivedByLab get set to TRUE", () => {
    const { isReceivedByLab } = useTestKitDetails(data)

    expect(isReceivedByLab).toBe(true)
  })

  it("receivedByLabAt shows up proper transactions's created_at value", () => {
    const { receivedByLabAt } = useTestKitDetails(data)

    expect(receivedByLabAt).toBe("08/27/2020 @ 10:34 PM")
  })
})

describe("When there are both: delivered_to_lab_notifications_sent_at AND barcode_state_transition with `to=processed`", () => {
  const data = {
    barcode: {
      delivered_to_lab_notifications_sent_at: "2020-09-27T22:34:05.452538",
      barcode_state_transitions: [
        {
          to: "processed",
          created_at: "2020-08-27T22:34:05.452538",
        },
      ],
    },
  }

  it("isReceivedByLab get set to TRUE", () => {
    const { isReceivedByLab } = useTestKitDetails(data)

    expect(isReceivedByLab).toBe(true)
  })

  it("receivedByLabAt shows up delivered_to_lab_notifications_sent_at's value", () => {
    const { receivedByLabAt } = useTestKitDetails(data)

    expect(receivedByLabAt).toBe("09/27/2020 @ 10:34 PM")
  })
})
