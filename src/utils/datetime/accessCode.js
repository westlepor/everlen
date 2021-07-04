import { getDefaultTimezone } from "./common"
import moment from "moment"
import { DATE_FORMATTER } from "./"

const getTimezoneFromCodeDate = date => {
  if (date) {
    // 2021-03-10T05:00:00
    let dates = date.split("T")

    // [2021-03-10, 05:00:00]
    if (dates.length >= 2) {
      dates = dates[1].split(":")

      // [05, 00, 00]
      let timezone = parseInt(dates[0])

      if (timezone >= 12) {
        timezone = 24 - timezone
      } else {
        timezone = -timezone
      }

      // 2021-03-21T04:59:59
      // [04, 59, 59]
      if (dates[1] > 0) {
        timezone--
      }

      return timezone
    }
  }

  return getDefaultTimezone()
}

/*
  If date is string, it's from API
  2021-03-10T05:00:00, it means GMT-5, 03/10/2021 12:00 AM
  2021-03-21T04:59:59, it means GMT-5, 03/20/2021 11:59 PM

  If date object, it means that user gets date object by picking a date at DatePicker
  we don't need to handle timezone
*/
const formatDateByTimezone = ({ date, formatter = DATE_FORMATTER }) => {
  if (typeof date !== "string") {
    return date
  }

  const timezone = getTimezoneFromCodeDate(date)

  if (date.includes("T") && !date.includes("Z")) {
    date += "Z" // prevent auto timezone setting
  }

  return moment(date).utcOffset(timezone).format(formatter)
}

export { getTimezoneFromCodeDate, formatDateByTimezone }
