import {
  dayjs,
  formatLocalDate,
  getShortTimezoneDisplay,
  formatDatePickerTime,
  formatDateOfBirth,
  formatTimezoneDate,
  getActiveTimezones,
  getDefaultTimezone,
  getTimezoneOffset,
  isDST,
  getNotActiveTimezones,
  getActiveTimezoneShorts,
  getNotActiveTimezoneShorts,
  getTimezoneOffsetByShort,
  getUnixTimestamp,
} from "./common"

import { getLongTimezoneDisplay } from "./profile"

import { diffTime } from "./notification"

import {
  getDateObject,
  formatDate,
  getFilterTimestamp,
  getCurrentLocalDate,
} from "./filters"

import {
  formatLocalTime,
  hcpFormatTimeToUTC,
  currentTimeWithIncrement,
  nextOneHourTimeOptionsWithIncrement,
  twoHourWindowTimeOptionsWithIncrement,
  anyTimeOfDayTimeOptionsWithIncrement,
  age,
  HOUR_MIN_FORMATTER,
  isValidCollectionTime,
} from "./hcp"

import { getTimezoneFromCodeDate, formatDateByTimezone } from "./accessCode"

export const TIME_FORMATTER = "hh:mm A"
export const DATE_FORMATTER = "MM/DD/YYYY hh:mm A"
export const DATE2_FORMATTER = "MM/DD/YYYY @ hh:mm A"
export const DATE3_FORMATTER = "MM/DD/YYYY HH:mm:ss"
export const DOB_FORMATTER = "MM/DD/YYYY"

export {
  dayjs,
  formatLocalTime,
  formatLocalDate,
  diffTime,
  hcpFormatTimeToUTC,
  currentTimeWithIncrement,
  formatDate,
  formatTimezoneDate,
  formatDateByTimezone,
  getFilterTimestamp,
  formatDatePickerTime,
  getCurrentLocalDate,
  getDateObject,
  getShortTimezoneDisplay,
  getLongTimezoneDisplay,
  nextOneHourTimeOptionsWithIncrement,
  twoHourWindowTimeOptionsWithIncrement,
  anyTimeOfDayTimeOptionsWithIncrement,
  age,
  formatDateOfBirth,
  HOUR_MIN_FORMATTER,
  isValidCollectionTime,
  getTimezoneFromCodeDate,
  getActiveTimezones,
  getDefaultTimezone,
  getTimezoneOffset,
  isDST,
  getNotActiveTimezones,
  getActiveTimezoneShorts,
  getNotActiveTimezoneShorts,
  getTimezoneOffsetByShort,
  getUnixTimestamp,
}
