import { moment, getTimezoneOffset } from "./common"

const FORMAT = "M/D/YY"

const diffTime = time => {
  const offset = getTimezoneOffset()

  const old = moment(time + "Z").utcOffset(offset) // prevent auto timezone setting
  const now = moment().utcOffset(offset)

  const diffHour = now.diff(old, "hour")
  if (diffHour >= 24) {
    return old.format(FORMAT)
  }

  const diffMin = now.diff(old, "minute")
  if (diffMin >= 60) {
    return diffHour + "h"
  }

  const diffSec = now.diff(old, "second")
  if (diffSec >= 60) {
    return diffMin + "m"
  }

  return diffSec + "s"
}

export { diffTime }
