import {
  getTimezoneOffset,
  getShortTimezoneDisplay,
  getActiveTimezones,
} from "./common"

const getLongTimezoneDisplay = () => {
  const offset = getTimezoneOffset()
  const commonTimezone = getActiveTimezones()[`${offset}`]

  const shortTimezone = getShortTimezoneDisplay()
  const localTime = `${shortTimezone} Local Time`

  return commonTimezone || localTime
}

export { getLongTimezoneDisplay }
