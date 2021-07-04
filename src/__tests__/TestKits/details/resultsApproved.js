import { useTestKitDetails } from "../../../hooks"

import { pretendToBeInUniversalTime } from "../../helpers"

beforeEach(() => {
  pretendToBeInUniversalTime()
})

describe("When there is no data", () => {
  const data = {}

  it("isResultApproved get set to FALSE", () => {
    const { isResultApproved } = useTestKitDetails(data)

    expect(isResultApproved).toBe(false)
  })

  it("resultsApprovedAt shows up as `-`", () => {
    const { resultsApprovedAt } = useTestKitDetails(data)

    expect(resultsApprovedAt).toBe("-")
  })
})

describe("When there is kit_result_status_transitions with `to=results_approved`", () => {
  const data = {
    kit_result_status_transitions: [
      {
        to: "results_approved",
        created_at: "2020-08-27T22:34:05.452538",
      },
    ],
  }

  it("isResultApproved get set to TRUE", () => {
    const { isResultApproved } = useTestKitDetails(data)

    expect(isResultApproved).toBe(true)
  })

  it("resultsApprovedAt shows up properly", () => {
    const { resultsApprovedAt } = useTestKitDetails(data)

    expect(resultsApprovedAt).toBe("08/27/2020 @ 10:34 PM")
  })
})
