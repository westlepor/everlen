import { dayjs, formatSimpleDate } from "./common"

const DATE_FORMATTER = "YYYY-MM-DD"
const DATE_TIME_FORMATTER = "MM/DD/YYYY hh:mm A"

const getCurrentLocalDate = () => {
  return formatSimpleDate(dayjs())
}

const getDateObject = date => {
  if (!date) return null

  const members = date.split("-")

  return {
    year: parseInt(members[0]),
    month: parseInt(members[1] - 1),
    date: parseInt(members[2]),
  }
}

const formatDate = (
  dateVal,
  format = DATE_TIME_FORMATTER,
  returnMinus = true
) => {
  if (dateVal) {
    return dayjs(dateVal).format(format)
  }

  return returnMinus ? "-" : ""
}

const getFilterTimestamp = value => {
  const today = dayjs()

  let from = today
  let to = today

  // from, to based on timeframe
  if (value === 2) {
    from = today.subtract(6, "day")
  } else if (value === 3) {
    from = today.subtract(30, "day")
  }

  return {
    from: from.format(DATE_FORMATTER),
    to: to.format(DATE_FORMATTER),
  }
}

export { getCurrentLocalDate, getDateObject, formatDate, getFilterTimestamp }
