import { hcpFormatTimeToUTC } from "utils/datetime/hcp"

import { pretendToBeInCentralTime, pretendToBeInHawaiianTime } from "../helpers"

describe("hcpFormatTimeToUTC", () => {
  it("shows proper time for Central Time", () => {
    pretendToBeInCentralTime()

    const localTime = hcpFormatTimeToUTC({ time: "2020-12-22T02:09:11-06:00" })

    expect(localTime).toEqual("2020-12-22 08:09:11Z")
  })

  it("shows proper time for Hawaiian Time", () => {
    pretendToBeInHawaiianTime()

    const localTime = hcpFormatTimeToUTC({ time: "2020-12-21T22:09:11-10:00" })

    expect(localTime).toEqual("2020-12-22 08:09:11Z")
  })
})
