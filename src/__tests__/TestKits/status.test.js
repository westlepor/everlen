import { getStatus } from "../../utils/parseTableData"
import { KitStatusDesc } from "../../utils/constants"

// Registered
describe("has been `registered` and has status non `results_approved`", () => {
  const data = {
    barcode: {
      state: "registered",
    },
    status: "non_results_approved",
  }

  it("shows Registered", () => {
    const kitStatus = KitStatusDesc[getStatus({ elem: data })].label

    expect(kitStatus).toBe("Registered")
  })
})

// Received by Lab
describe("has been `processed` and has status non `results_approved`", () => {
  const data = {
    barcode: {
      state: "processed",
    },
    status: "non_results_approved",
  }

  it("shows Received by Lab", () => {
    const kitStatus = KitStatusDesc[getStatus({ elem: data })].label

    expect(kitStatus).toBe("Received by Lab")
  })
})

// Results Released
describe("has status `results_approved`", () => {
  const data = {
    status: "results_approved",
  }

  it("shows Results Released", () => {
    const kitStatus = KitStatusDesc[getStatus({ elem: data })].label

    expect(kitStatus).toBe("Results Released")
  })
})

// Canceled
describe("has status `archived`", () => {
  const data = {
    status: "archived",
  }

  it("shows Canceled", () => {
    const kitStatus = KitStatusDesc[getStatus({ elem: data })].label

    expect(kitStatus).toBe("Canceled")
  })
})
