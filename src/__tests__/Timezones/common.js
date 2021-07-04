import {
  formatLocalDate,
  getTimezoneOffset,
  getShortTimezoneDisplay,
  getActiveTimezones,
  getNotActiveTimezones,
  getDefaultTimezone,
} from "utils/datetime"

import { pretendToBeInCentralTime, pretendToBeInHawaiianTime } from "../helpers"

describe("formatLocalDate", () => {
  it("shows proper time for Central Time", () => {
    pretendToBeInCentralTime()

    const localTimeDuringStandardTime = formatLocalDate({
      date: "2020-11-22T19:09:11",
      showTimezone: true,
    })

    const localTimeDuringDaylightSavingTime = formatLocalDate({
      date: "2020-06-22T19:09:11",
      showTimezone: true,
    })

    expect(localTimeDuringStandardTime).toEqual(
      "11/22/2020 01:09 PM (GMT-06:00)"
    )
    expect(localTimeDuringDaylightSavingTime).toEqual(
      "06/22/2020 01:09 PM (GMT-06:00)"
    )
  })

  it("shows proper time for Hawaian Time", () => {
    pretendToBeInHawaiianTime()

    const localTimeDuringStandardTime = formatLocalDate({
      date: "2020-11-22T19:09:11",
      showTimezone: true,
    })

    const localTimeDuringDaylightSavingTime = formatLocalDate({
      date: "2020-06-22T19:09:11",
      showTimezone: true,
    })

    expect(localTimeDuringStandardTime).toEqual(
      "11/22/2020 09:09 AM (GMT-10:00)"
    )
    expect(localTimeDuringDaylightSavingTime).toEqual(
      "06/22/2020 09:09 AM (GMT-10:00)"
    )
  })
})

describe("getTimezoneOffset", () => {
  it("shows proper time for Central Time", () => {
    pretendToBeInCentralTime()

    const localTime = getTimezoneOffset()

    expect(localTime).toEqual(-6)
  })

  it("shows proper time for Hawaiian Time", () => {
    pretendToBeInHawaiianTime()

    const localTime = getTimezoneOffset()

    expect(localTime).toEqual(-10)
  })
})

describe("getShortTimezoneDisplay", () => {
  it("shows proper time for Central Time", () => {
    pretendToBeInCentralTime()

    const localTime = getShortTimezoneDisplay()

    expect(localTime).toEqual("(GMT-06:00)")
  })

  it("shows proper time for Hawaiian Time", () => {
    pretendToBeInHawaiianTime()

    const localTime = getShortTimezoneDisplay()

    expect(localTime).toEqual("(GMT-10:00)")
  })
})

describe("getActiveTimezones", () => {
  it("shows proper default timezone at active timezones", () => {
    const activeTimezones = getActiveTimezones()
    expect(activeTimezones[getDefaultTimezone()]).toMatch(/New York/)
  })

  it("shows proper default timezone at non-active timezones", () => {
    const notActiveTimezones = getNotActiveTimezones()
    expect(notActiveTimezones[getDefaultTimezone()]).not.toMatch(/New York/)
  })
})
