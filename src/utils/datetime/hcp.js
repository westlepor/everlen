import { dayjs, getTimezoneOffset } from "./common"

const INCREMENT = 5
const TIME_FORMATTER = "hh:mm A"
const HOUR_MIN_FORMATTER = "hh:mm"
const UTC_FORMAT = "YYYY-MM-DD HH:mm:ss"

const formatLocalTime = ({ time, formatter = TIME_FORMATTER }) => {
  const offset = getTimezoneOffset()

  return dayjs(time).utcOffset(offset).format(formatter)
}

const hcpFormatTimeToUTC = ({ time } = {}) => {
  if (!time) {
    return dayjs().utc().format(UTC_FORMAT) + "Z"
  }

  return dayjs(time).utc().format(UTC_FORMAT) + "Z"
}

const currentTimeWithIncrement = (increment = INCREMENT) => {
  return dayjs().minute(Math.ceil(dayjs().minute() / increment) * increment)
}

const nextOneHourTimeOptionsWithIncrement = (increment = INCREMENT) => {
  const now = currentTimeWithIncrement()

  const options = []

  for (let i = 0; i < 12; i++) {
    options.push(now.add(increment * i, "minute"))
  }

  return options
}

const twoHourWindowTimeOptionsWithIncrement = (increment = INCREMENT) => {
  const now = currentTimeWithIncrement(increment)

  const options = []
  const start = Math.ceil(60 / increment)

  // Previous hour
  for (let i = start; i > 0; i--) {
    options.push(now.subtract(increment * i, "minute"))
  }
  // Next hour
  for (let i = 0; i < start; i++) {
    options.push(now.add(increment * i, "minute"))
  }

  return options
}

const anyTimeOfDayTimeOptionsWithIncrement = (increment = INCREMENT) => {
  const now = dayjs().startOf('day')
  const options = []
  const startDate = now.date();

  for (let i = 0; now.add(increment * i, "minute").date() === startDate; i++) {
    options.push(now.add(increment * i, "minute"))
  }

  return options
}

const age = birthday => {
  const diff_ms = Date.now() - new Date(birthday).getTime()
  const age_dt = new Date(diff_ms)
  return age_dt.getUTCFullYear() - 1970
}

const isValidCollectionTime = collectedAt => {
  if (collectedAt === "Invalid Date") {
    return "false"
  }

  const diffSeconds = dayjs(collectedAt).diff(dayjs()) / 1000
  if (diffSeconds < -12 * 3600) {
    return "past"
  } else if (diffSeconds > 0) {
    return "future"
  }
  return "true"
}

export {
  formatLocalTime,
  hcpFormatTimeToUTC,
  currentTimeWithIncrement,
  nextOneHourTimeOptionsWithIncrement,
  twoHourWindowTimeOptionsWithIncrement,
  anyTimeOfDayTimeOptionsWithIncrement,
  age,
  HOUR_MIN_FORMATTER,
  isValidCollectionTime,
}
