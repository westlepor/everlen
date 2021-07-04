import { getFieldValue } from "../../utils/parseTableData"
import Field from "../../utils/fields"

import { pretendToBeInUniversalTime } from "../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

// Registered timestamp
describe("Has one `barcode_state_transitions` to `registered`", () => {
  const data = {
    barcode: {
      barcode_state_transitions: [
        {
          to: "registered",
          created_at: "2020-08-07T02:03:35.872431",
        },
        {
          to: "processed",
          created_at: "2020-08-09T12:03:35.872431",
        },
      ],
    },
  }

  it("shows the timestamp", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.registerTime.name,
    })
    expect(timestamp).toBe("08/07/2020 02:03 AM")
  })
})

describe("Has multiple `barcode_state_transitions` to `registered`", () => {
  const data = {
    barcode: {
      barcode_state_transitions: [
        {
          to: "registered",
          created_at: "2020-08-07T02:03:35.872431",
        },
        {
          to: "registered",
          created_at: "2020-10-07T13:03:35.872431",
        },
      ],
    },
  }

  it("shows the most recent timestamp", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.registerTime.name,
    })
    expect(timestamp).toBe("10/07/2020 01:03 PM")
  })
})

describe("Has no `barcode_state_transitions`", () => {
  const data = {
    created_at: "2020-11-07T05:03:35.872431",
    barcode: {
      created_at: "2020-08-07T02:03:35.872431",
    },
  }

  it("shows the default created_at timestamp", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.registerTime.name,
    })
    expect(timestamp).toBe("11/07/2020 05:03 AM")
  })
})


describe("Has no `barcode_state_transitions` to `registered`", () => {
  const data = {
    created_at: "2020-11-07T05:03:35.872431",
    barcode: {
      barcode_state_transitions: [
        {
          to: "processed",
          created_at: "2020-08-09T12:03:35.872431",
        },
      ],
    },
  }

  it("shows the default created_at timestamp", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.registerTime.name,
    })
    expect(timestamp).toBe("11/07/2020 05:03 AM")
  })
})

describe("Has no data", () => {
  const data = {}

  it("shows the default empty timestamp", () => {
    const timestamp = getFieldValue({
      elem: data,
      field: Field.registerTime.name,
    })
    expect(timestamp).toBe("-")
  })
})
