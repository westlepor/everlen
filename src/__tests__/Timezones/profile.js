import { getLongTimezoneDisplay } from "utils/datetime/profile"

import { pretendToBeInCentralTime, pretendToBeInHawaiianTime } from "../helpers"

describe("getLongTimezoneDisplay", () => {
  it("shows proper time for Central Time", () => {
    pretendToBeInCentralTime()

    const timezone = getLongTimezoneDisplay()

    expect(timezone).toEqual("(GMT-06:00) Central Standard Time - Chicago")
  })

  it("shows proper time for Hawaiian Time", () => {
    pretendToBeInHawaiianTime()

    const timezone = getLongTimezoneDisplay()

    expect(timezone).toEqual("(GMT-10:00) Hawaii Standard Time - Honolulu")
  })
})
