import { getFieldValue } from "../../utils/parseTableData"
import Field from "../../utils/fields"

import { pretendToBeInUniversalTime } from "../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

// Received by Lab timestamp
describe("Has `delivered_to_lab_notifications_sent_at` set to null and empty `barcode_state_transitions`", () => {
  const data = {
    barcode: {
      delivered_to_lab_notifications_sent_at: null,
      barcode_state_transitions: [],
    },
  }

  it("shows the empty timestamp", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.receiveTime.name,
    })
    expect(timestamp).toBe("-")
  })
})

describe("Has `delivered_to_lab_notifications_sent_at` and has `barcode_state_transitions`", () => {
  const data = {
    barcode: {
      delivered_to_lab_notifications_sent_at: "2020-08-06T16:58:12.062014",
      barcode_state_transitions: [
        {
          to: "processed",
          created_at: "2020-08-07T02:03:35.872431",
        },
      ],
    },
  }

  it("shows the timestamp of `delivered_to_lab_notifications_sent_at`", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.receiveTime.name,
    })
    expect(timestamp).toBe("08/06/2020 04:58 PM")
  })
})

describe("Has `delivered_to_lab_notifications_sent_at` and empty `barcode_state_transitions`", () => {
  const data = {
    barcode: {
      delivered_to_lab_notifications_sent_at: "2020-08-06T16:58:12.062014",
      barcode_state_transitions: [],
    },
  }

  it("shows the timestamp of `delivered_to_lab_notifications_sent_at`", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.receiveTime.name,
    })
    expect(timestamp).toBe("08/06/2020 04:58 PM")
  })
})

describe("Has `delivered_to_lab_notifications_sent_at` set to null and has `barcode_state_transitions`", () => {
  const data = {
    barcode: {
      delivered_to_lab_notifications_sent_at: null,
      barcode_state_transitions: [
        {
          to: "processed",
          created_at: "2020-08-07T02:03:35.872431",
        },
      ],
    },
  }

  it("shows the timestamp of `barcode_state_transitions`", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.receiveTime.name,
    })
    expect(timestamp).toBe("08/07/2020 02:03 AM")
  })
})
