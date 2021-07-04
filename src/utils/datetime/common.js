import moment from "moment"
import dayjs from "dayjs"

import { DATE_FORMATTER, DOB_FORMATTER } from "./"

const utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

const STANDARD_TIMEZONES = {
  "0": "(GMT+00:00) Coordinated Universal Time",
  "-5": "(GMT-05:00) Eastern Standard Time - New York",
  "-6": "(GMT-06:00) Central Standard Time - Chicago",
  "-7": "(GMT-07:00) Mountain Standard Time - Salt Lake City",
  "-8": "(GMT-08:00) Pacific Standard Time - Los Angeles",
  "-9": "(GMT-09:00) Alaska Standard Time - Anchorage",
  "-10": "(GMT-10:00) Hawaii Standard Time - Honolulu",
}

const DAYLIGHT_SAVING_TIMEZONES = {
  "0": "(GMT+00:00) Coordinated Universal Time",
  "-4": "(GMT-04:00) Eastern Daylight Time - New York",
  "-5": "(GMT-05:00) Central Daylight Time - Chicago",
  "-6": "(GMT-06:00) Mountain Daylight Time - Salt Lake City",
  "-7": "(GMT-07:00) Pacific Daylight Time - Los Angeles",
  "-8": "(GMT-08:00) Alaska Daylight Time - Anchorage",
  "-9": "(GMT-09:00) Hawaii-Aleutian Daylight Time - Honolulu",
}

const STANDARD_TIMEZONE_SHORTS = {
  "0": "UTC",
  "-5": "EST",
  "-6": "CST",
  "-7": "MST",
  "-8": "PST",
  "-9": "AKST",
  "-10": "HST",
}

const DST_SHORTS = {
  "0": "UTC",
  "-4": "EDT",
  "-5": "CDT",
  "-6": "MDT",
  "-7": "PDT",
  "-8": "AKDT",
  "-9": "HDT",
}

const getActiveTimezones = () => {
  return isDST() ? DAYLIGHT_SAVING_TIMEZONES : STANDARD_TIMEZONES
}

const getNotActiveTimezones = () => {
  return isDST() ? STANDARD_TIMEZONES : DAYLIGHT_SAVING_TIMEZONES
}

const getActiveTimezoneShorts = () => {
  return isDST() ? DST_SHORTS : STANDARD_TIMEZONE_SHORTS
}

const getNotActiveTimezoneShorts = () => {
  return isDST() ? STANDARD_TIMEZONE_SHORTS : DST_SHORTS
}

const getTimezoneOffsetByShort = short => {
  for (const property in STANDARD_TIMEZONE_SHORTS) {
    if (STANDARD_TIMEZONE_SHORTS[property] === short) {
      return parseInt(property)
    }
  }
  for (const property in DST_SHORTS) {
    if (DST_SHORTS[property] === short) {
      return parseInt(property)
    }
  }
  return 0
}

const DEFAULT_TIMEZONE = -5
const DEFAULT_DST_TIMEZONE = -4

const formatLocalDate = ({
  date,
  formatter = DATE_FORMATTER,
  showTimezone = false,
}) => {
  if (!date) {
    return "-"
  }

  if (date.includes("T") && !date.includes("Z")) {
    date += "Z" // prevent auto timezone setting
  }

  const offset = getTimezoneOffset()

  return (
    moment(date).utcOffset(offset).format(formatter) +
    (showTimezone ? ` ${getShortTimezoneDisplay()}` : "")
  )
}

const isDST = () => moment().isDST()

const getDefaultTimezone = () => {
  return isDST() ? DEFAULT_DST_TIMEZONE : DEFAULT_TIMEZONE
}

const getTimezoneOffset = () => {
  return (-1 * new Date().getTimezoneOffset()) / 60
}

const getShortTimezoneDisplay = () => {
  const offset = getTimezoneOffset()

  const sign = offset >= 0 ? "+" : "-"
  const offsetInHours = Math.abs(offset).toString().padStart(2, "0")

  return `(GMT${sign}${offsetInHours}:00)`
}

const formatSimpleDate = d => {
  let month = "" + (d.month() + 1),
    day = "" + d.date(),
    year = d.year()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [year, month, day].join("-")
}

const formatDatePickerTime = (date, adjustDay = 0) => {
  if (!date) return null

  let d = dayjs(date)

  if (adjustDay < 0) {
    d = d.subtract(1, "day")
  } else if (adjustDay > 0) {
    d = d.add(1, "day")
  }

  return formatSimpleDate(d)
}

const formatDateOfBirth = dateOfBirth => {
  if (!dateOfBirth) {
    return "-"
  }

  return dayjs(dateOfBirth).format(DOB_FORMATTER)
}

const formatTimezoneDate = ({ date, isEnd, timezone }) => {
  if (!timezone) {
    timezone = getTimezoneOffset()
  }

  // date: 01-15 ~ 01-23

  // timezone = +4
  // 01-14 20:00:00
  // timezone = -4
  // 01-15 04:00:00
  let time = "00"
  if (timezone > 0) {
    time = `${24 - timezone}`
  } else if (timezone < 0) {
    time = `${Math.abs(timezone)}`
  }
  if (time.length < 2) {
    time = "0" + time
  }

  let utc = `${formatDatePickerTime(date, timezone > 0 ? -1 : 0)}T${time}:00:00`

  if (isEnd) {
    time = "23"
    // timezone = +4
    // 01-23 19:59:59
    // timezone = -4
    // 01-24 03:59:59
    if (timezone > 0) {
      time = `${23 - timezone}`
    } else if (timezone < 0) {
      time = `${Math.abs(parseInt(timezone) + 1)}`
    }
    if (time.length < 2) {
      time = "0" + time
    }

    utc = `${formatDatePickerTime(date, timezone < 0 ? 1 : 0)}T${time}:59:59`
  }

  return utc
}

const getUnixTimestamp = (date) => dayjs(date).unix()

export {
  dayjs,
  moment,
  formatLocalDate,
  getTimezoneOffset,
  getShortTimezoneDisplay,
  formatDatePickerTime,
  formatSimpleDate,
  formatDateOfBirth,
  formatTimezoneDate,
  getActiveTimezones,
  getNotActiveTimezones,
  getActiveTimezoneShorts,
  getNotActiveTimezoneShorts,
  getDefaultTimezone,
  isDST,
  getTimezoneOffsetByShort,
  getUnixTimestamp,
}
