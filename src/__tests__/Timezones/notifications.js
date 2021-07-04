import { diffTime } from "utils/datetime/notification"

import { pretendToBeInCentralTime, pretendToBeInHawaiianTime } from "../helpers"

describe("diffTime", () => {
  it("shows proper time for Central Time", () => {
    pretendToBeInCentralTime()

    const timezone = diffTime("2020-12-22T08:09:11")

    expect(timezone).toEqual("12/22/20")
  })

  it("shows proper time for Hawaiian Time", () => {
    pretendToBeInHawaiianTime()

    const timezone = diffTime("2020-12-22T08:09:11")

    expect(timezone).toEqual("12/21/20")
  })
})
