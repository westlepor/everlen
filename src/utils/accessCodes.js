import dayjs from "dayjs"

import {
  getActiveTimezoneShorts,
  getNotActiveTimezoneShorts,
  getTimezoneFromCodeDate,
} from "utils/datetime"

const formatAmount = value => {
  return isNaN(value)
    ? 0
    : value?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

const calculateRemaining = ({ max_orders, spree_orders_aggregate }) => {
  const remaining = max_orders - spree_orders_aggregate.aggregate.count

  const isAnythingRemaining = !isNaN(remaining) && remaining > 0

  return isAnythingRemaining ? remaining : null
}

const calculateMaxOrder = ({ max_orders }) => {
  const isUnlimited = !max_orders || isNaN(max_orders)

  return isUnlimited ? Number.MAX_SAFE_INTEGER : max_orders
}

const calculateStatus = ({ closes_at, active }) => {
  const isExpired = !!closes_at && dayjs(closes_at).isBefore(dayjs())

  return isExpired ? "Expired" : !!active ? "Active" : "Not active"
}

const calculateTimezone = ({ opens_at }) => {
  const timezone = getTimezoneFromCodeDate(opens_at)
  const AT_SHORTS = getActiveTimezoneShorts()
  const NAT_SHORTS = getNotActiveTimezoneShorts()

  const label = AT_SHORTS[timezone] || NAT_SHORTS[timezone]
  return label
}

const findUniqueOptInPortalUrls = data => {
  return (
    data?.reduce((urls, details) => {
      if (
        !!details.portal.url &&
        (!urls[details.portal.url] ||
          urls[details.portal.url] !== details?.partner?.name)
      ) {
        urls[details.portal.url] =
          details?.client?.name || details?.partner?.name
      }

      return urls
    }, {}) || {}
  )
}

export {
  formatAmount,
  calculateRemaining,
  calculateMaxOrder,
  calculateStatus,
  calculateTimezone,
  findUniqueOptInPortalUrls,
}
